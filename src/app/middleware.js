import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAccessToken } from "./api/Auth/Jwt/route";
import { JWTverify } from "./lib/auth";

export const config = {
  matcher: ["/profile"],
};
export async function middleware(request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const { payload } = JWTverify(refreshToken, "refresh");

  if (!accessToken && refreshToken) {
    const newAccessToken = await getAccessToken(payload);
    cookieStore.set("accessToken", newAccessToken.value, {
      expires: newAccessToken.time,
    });

    return NextResponse.next();
  }
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}
