import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/login
 * Body: { email: string, senha: string }
 * Retorna: { token: string }
 */
export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    const ok = await bcrypt.compare(senha, usuario.senha);
    if (!ok) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, isAdmin: usuario.isAdmin },
      secret,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao autenticar" }, { status: 500 });
  }
}
