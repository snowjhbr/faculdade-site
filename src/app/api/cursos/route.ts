// src/app/api/cursos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";

const prisma = new PrismaClient();

// ---------------- GET - listar cursos ----------------
export async function GET() {
  try {
    const cursos = await prisma.curso.findMany({
      include: { depoimentos: true },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(cursos);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json({ error: "Erro ao buscar cursos" }, { status: 500 });
  }
}

// ---------------- POST - criar curso ----------------
export async function POST(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return new NextResponse("Não autorizado", { status: 401 });

  try {
    const body = await req.json();
    const { titulo, descricao, preco, categoria, conteudo, imagem } = body;

    if (!titulo || !descricao || !preco || !categoria || !conteudo) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        preco: Number(preco),
        categoria,
        conteudo,
        imagem: imagem || null,
      },
    });

    return NextResponse.json(novoCurso, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 });
  }
}

// ---------------- PUT - atualizar curso ----------------
export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return new NextResponse("Não autorizado", { status: 401 });

  try {
    const body = await req.json();
    const { id, titulo, descricao, preco, categoria, conteudo, imagem } = body;

    if (!id) {
      return NextResponse.json({ error: "ID do curso é obrigatório" }, { status: 400 });
    }

    const cursoAtualizado = await prisma.curso.update({
      where: { id: Number(id) },
      data: { titulo, descricao, preco, categoria, conteudo, imagem },
    });

    return NextResponse.json(cursoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return NextResponse.json({ error: "Erro ao atualizar curso" }, { status: 500 });
  }
}

// ---------------- DELETE - deletar curso ----------------
export async function DELETE(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return new NextResponse("Não autorizado", { status: 401 });

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID do curso é obrigatório" }, { status: 400 });
    }

    await prisma.curso.delete({ where: { id: Number(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return NextResponse.json({ error: "Erro ao deletar curso" }, { status: 500 });
  }
}
