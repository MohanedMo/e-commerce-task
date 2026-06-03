import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * POST /api/auth/refresh
 * Handles silent token refresh. Reads HttpOnly refreshToken cookie,
 * queries DummyJSON to get a fresh accessToken, updates the HttpOnly refreshToken cookie,
 * and returns the new accessToken in the JSON response body.
 * The refreshToken is NEVER returned in the JSON response body.
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 }
      );
    }

    // Call DummyJSON auth refresh endpoint
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 60,
      }),
    });

    if (!response.ok) {
      // If refresh failed, delete the cookie
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { error: "Session expired. Please log in again." },
        { status: 401 }
      );
    }

    const refreshData = await response.json();

    // Set the updated refresh token in the secure HttpOnly cookie
    cookieStore.set("refreshToken", refreshData.refreshToken, COOKIE_OPTIONS);

    // Return ONLY the short-lived accessToken in the response body
    return NextResponse.json({
      accessToken: refreshData.accessToken || refreshData.token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Token refresh failed" },
      { status: 500 }
    );
  }
}
