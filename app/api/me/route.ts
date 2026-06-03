import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * GET /api/me
 * Returns authenticated user details. Requires a valid Bearer token in the Authorization header.
 * Intercepts and proxies the request to DummyJSON's `/auth/me` endpoint.
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized. Missing or invalid token." },
        { status: 401 }
      );
    }

    const accessToken = authHeader.split(" ")[1];

    // Forward the token to DummyJSON auth/me to fetch user details securely
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unauthorized. Session validation failed." },
        { status: 401 }
      );
    }

    const userData = await response.json();

    // Return the sanitized user profile details to the client
    return NextResponse.json({
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
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error during profile validation." },
      { status: 500 }
    );
  }
}
