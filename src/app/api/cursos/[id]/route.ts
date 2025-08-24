import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const curso = await prisma.curso.findUnique({
      where: { id: Number(params.id) },
    });
    if (!curso) return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    return NextResponse.json(curso);
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json({ error: "Erro ao buscar curso" }, { status: 500 });
  }
}
