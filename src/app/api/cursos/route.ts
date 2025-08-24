// src/app/api/cursos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - listar todos os cursos
export async function GET() {
  try {
    const cursos = await prisma.curso.findMany({
      include: { depoimentos: true }, // já retorna com depoimentos
    });
    return NextResponse.json(cursos);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar cursos" },
      { status: 500 }
    );
  }
}

// POST - criar um curso
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { titulo, descricao, preco, categoria, imagem, conteudo } = body;

    if (!titulo || !descricao || !preco || !categoria || !imagem || !conteudo) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        preco,
        categoria,
        imagem,
        conteudo,
      },
    });

    return NextResponse.json(novoCurso, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json(
      { error: "Erro ao criar curso" },
      { status: 500 }
    );
  }
}
