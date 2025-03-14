import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });

  response.headers.set(
    "Set-Cookie",
    "accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
  );
  response.headers.append(
    "Set-Cookie",
    "refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
  );

  return response;
}
