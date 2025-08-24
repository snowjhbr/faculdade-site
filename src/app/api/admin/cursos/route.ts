import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  // Verifica admin
  const admin = requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();

    console.log("Body recebido no admin:", body); // DEBUG

    const { titulo, descricao, preco, categoria, imagem, conteudo } = body;

    if (!titulo || !descricao || !preco || !categoria || !imagem || !conteudo) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

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

    console.log("Curso criado:", novoCurso); // DEBUG

    return NextResponse.json(novoCurso, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 });
  }
}
