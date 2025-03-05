import { jwtVerify, SignJWT } from "jose";

export const JWTgenerate = async (payload, type) => {
  const key = getSecretkey(type);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
};

export const JWTverify = async (token, type) => {
  return jwtVerify(token, getSecretkey(type), { algorithms: ["HS256"] });
};

const getSecretkey = (type) => {
  const secret =
    type === "refresh"
      ? process.env.REFRESH_TOKEN_SECRET_KEY
      : process.env.ACCESS_TOKEN_SECRET_KEY;
  return new TextEncoder().encode(secret);
};
