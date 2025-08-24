import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  // Verifica se o usuário é admin
  const admin = requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { titulo, descricao, preco, categoria, imagem, conteudo } = body;

    // Validação básica
    if (!titulo || !descricao || !preco || !categoria || !imagem || !conteudo) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    // Criar curso no banco
    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        preco,
        categoria,
        imagem,
        conteudo: Array.isArray(conteudo) ? conteudo.join("\n") : conteudo,
      },
    });

    return NextResponse.json(novoCurso, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 });
  }
}
