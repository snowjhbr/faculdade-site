import jwt from "jsonwebtoken";

export type JWTPayload = {
  id: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

export function getBearerToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

export function verifyToken(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado");
  return jwt.verify(token, secret) as JWTPayload;
}

export function requireAdmin(req: Request): JWTPayload | null {
  const token = getBearerToken(req);
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    if (!payload.isAdmin) return null;
    return payload;
  } catch {
    return null;
  }
}
