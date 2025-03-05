import { JWTgenerate } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  const accessToken = await getAccessToken(payload);
  const refreshToken = await getRefreshToken(payload);

  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken.value, {
    httpOnly: true,
    expires: accessToken.time,
  });
  cookieStore.set("refreshToken", refreshToken.value, {
    httpOnly: true,
    expires: refreshToken.time,
  });
  return NextResponse.json({ message: "success" });
}

export async function getAccessToken(payload) {
  const token = await JWTgenerate(payload);
  const expires = new Date(Date.now() + 30 * 1000);
  return { value: token, time: expires };
}

export async function getRefreshToken(payload) {
  const refreshToken = await JWTgenerate(
    { ...payload, type: "refresh" },
    "refresh"
  );
  const expires = new Date(Date.now() + 60 * 1000 * 60 * 24 * 7);
  return { value: refreshToken, time: expires };
}
