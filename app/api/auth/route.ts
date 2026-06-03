import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";

/**
 * Cookie options for secure token storage.
 * - httpOnly: true ensures client-side JS cannot access the token (prevents XSS theft)
 * - secure: true ensures cookie is sent only over HTTPS in production
 * - sameSite: "lax" prevents CSRF attacks
 * - path: "/" ensures cookie is available across the entire site
 */
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * POST /api/auth
 * Server-side proxy for login to avoid exposing credentials and tokens to JS.
 * Sets the refreshToken in a secure HttpOnly cookie and returns the user and accessToken.
 */
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Call DummyJSON login endpoint directly from server side
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Invalid username or password" },
        { status: response.status }
      );
    }

    const authData = await response.json();
    const cookieStore = await cookies();

    // Store the refresh token in a secure HttpOnly cookie
    cookieStore.set("refreshToken", authData.refreshToken, COOKIE_OPTIONS);

    // Return only public user details and the short-lived accessToken.
    // The refreshToken is NEVER returned in the JSON response body.
    return NextResponse.json({
      accessToken: authData.accessToken,
      user: {
        id: authData.id,
        username: authData.username,
        email: authData.email,
        firstName: authData.firstName,
        lastName: authData.lastName,
        gender: authData.gender,
        image: authData.image,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth
 * Refactored to return only isAuthenticated and user details (if available).
 * Verifies validity of the refresh token and fetches user details server-side.
 * Never returns tokens.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ isAuthenticated: false, user: null });
    }

    // Refresh token server-side to check validity and get a temp access token
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 1, // short-lived token just for validation
      }),
    });

    if (!refreshRes.ok) {
      throw new Error("Invalid refresh token");
    }

    const refreshData = await refreshRes.json();
    const tempAccessToken = refreshData.accessToken || refreshData.token;

    // Fetch user details server-side using the temporary access token
    const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tempAccessToken}` },
    });

    if (!meRes.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const userData = await meRes.json();

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        image: userData.image,
      },
    });
  } catch {
    // Clear invalid cookies on validation failure
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");

    return NextResponse.json({
      isAuthenticated: false,
      user: null,
    });
  }
}

/**
 * DELETE /api/auth
 * Clear the refresh token HttpOnly cookie on logout.
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to clear authentication cookies" },
      { status: 500 }
    );
  }
}
