import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/cursos
 * Lista todos os cursos (público).
 */
export async function GET() {
  const cursos = await prisma.curso.findMany({
    orderBy: { criadoEm: "desc" },
    include: { depoimentos: true }, // útil para a Home/Detalhes
  });
  return NextResponse.json(cursos);
}

/**
 * POST /api/cursos
 * Cria um novo curso (apenas admin).
 * Body esperado: { titulo, descricao, preco, categoria, imagem, conteudo }
 */
export async function POST(req: Request) {
  // Proteção: apenas admin com Bearer token
  const payload = requireAdmin(req);
  if (!payload) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { titulo, descricao, preco, categoria, imagem, conteudo } = body;

    // Validações mínimas para evitar dados ruins
    if (!titulo || !descricao || typeof preco !== "number" || !categoria || !conteudo) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const curso = await prisma.curso.create({
      data: { titulo, descricao, preco, categoria, imagem: imagem ?? "", conteudo },
    });

    return NextResponse.json(curso, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 });
  }
}
