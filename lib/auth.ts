// src/lib/auth.ts
import { SignJWT, jwtVerify, JWTPayload } from "jose";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("A variável de ambiente JWT_SECRET não está definida!");
}

const EXPIRES_IN = "8h";
const encoder = new TextEncoder();
const secretKey = encoder.encode(SECRET);

export interface TokenPayload extends JWTPayload {
  id: string;
  email: string;
  role?: string;
}

/**
 * Gera um token JWT assinado
 * @param payload - Dados que vão dentro do token
 * @returns token (string)
 */
export async function signToken(payload: TokenPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(EXPIRES_IN)
    .sign(secretKey);
}

/**
 * Verifica e decodifica um token JWT
 * @param token - Token JWT
 * @returns Decodificação do token ou null se inválido
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as TokenPayload;
  } catch (err: any) {
    console.error("Token inválido:", err.message);
    return null;
  }
}
