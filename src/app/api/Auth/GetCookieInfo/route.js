import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token not found" },
        { status: 401 }
      );
    }

    const decodedAccessToken = accessToken ? jwt.decode(accessToken) : null;
    const decodedRefreshToken = refreshToken ? jwt.decode(refreshToken) : null;

    return NextResponse.json({
      accessTokenData: decodedAccessToken.data,
      refreshTokenData: decodedRefreshToken.data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token or server error" },
      { status: 400 }
    );
  }
}
