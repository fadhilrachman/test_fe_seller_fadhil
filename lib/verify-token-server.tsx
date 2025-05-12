import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: NextRequest) {
  const token = req.headers.get("authorization");

  if (!token)
    return Response.json(
      {
        status: 403,
        message: "Access Denied. No token provided.",
      },
      {
        status: 400,
      }
    );
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7)
    : token;

  return jwt.verify(tokenWithoutBearer, "asdasdasd", (err, decoded) => {
    if (err) {
      return Response.json(
        {
          status: 403,
          message: "Access Denied. No token provided.",
        },
        {
          status: 400,
        }
      );
    }

    req.headers.set("user", JSON.stringify(decoded) as any);

    return null;
  });
}
