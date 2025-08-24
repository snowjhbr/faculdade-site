import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/cursos/:id
 * Detalha um curso por ID (público).
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const curso = await prisma.curso.findUnique({
    where: { id },
    include: { depoimentos: true },
  });

  if (!curso) return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
  return NextResponse.json(curso);
}

/**
 * PUT /api/cursos/:id
 * Edita curso (apenas admin).
 * Body parcial permitido (qualquer campo do modelo).
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAdmin(req);
  if (!payload) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const data = await req.json();

    // Evita editar campos inexistentes/indesejados; faz um "pick" simples
    const updateData: any = {};
    if (typeof data.titulo === "string") updateData.titulo = data.titulo;
    if (typeof data.descricao === "string") updateData.descricao = data.descricao;
    if (typeof data.preco === "number") updateData.preco = data.preco;
    if (typeof data.categoria === "string") updateData.categoria = data.categoria;
    if (typeof data.imagem === "string") updateData.imagem = data.imagem;
    if (typeof data.conteudo === "string") updateData.conteudo = data.conteudo;

    const curso = await prisma.curso.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(curso);
  } catch (e) {
    // Pode cair aqui em caso de violação de unique (ex.: titulo duplicado)
    return NextResponse.json({ error: "Erro ao atualizar curso" }, { status: 500 });
  }
}

/**
 * DELETE /api/cursos/:id
 * Exclui curso (apenas admin).
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAdmin(req);
  if (!payload) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    await prisma.curso.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao excluir curso" }, { status: 500 });
  }
}
