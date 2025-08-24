// Funções utilitárias para ler o token do header e validar se é admin.
import jwt from "jsonwebtoken";

export type JWTPayload = {
  id: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

/**
 * Extrai o token do header Authorization (formato: "Bearer <token>").
 * Retorna null se não houver ou estiver em formato inválido.
 */
export function getBearerToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

/**
 * Verifica e decodifica o JWT usando o JWT_SECRET.
 * Lança erro se token inválido/expirado.
 */
export function verifyToken(token: string): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado no .env");
  return jwt.verify(token, secret) as JWTPayload;
}

/**
 * Garante que o request esteja autenticado como admin.
 * Retorna o payload se ok; caso contrário, retorna null.
 * (A rota decide a resposta HTTP adequada.)
 */
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
