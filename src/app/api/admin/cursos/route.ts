// src/app/api/admin/cursos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ---------------- GET - listar todos os cursos ----------------
export async function GET() {
  try {
    const cursos = await prisma.curso.findMany({
      include: { depoimentos: true },
    });
    return NextResponse.json(cursos);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json({ error: "Erro ao buscar cursos" }, { status: 500 });
  }
}

// ---------------- POST - criar curso com upload de imagem ----------------
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const titulo = formData.get("titulo")?.toString();
    const descricao = formData.get("descricao")?.toString();
    const preco = formData.get("preco")?.toString();
    const categoria = formData.get("categoria")?.toString();
    const conteudo = formData.get("conteudo")?.toString();
    const imagemFile = formData.get("imagem") as File | null;

    if (!titulo || !descricao || !preco || !categoria || !conteudo) {
      return NextResponse.json(
        { error: "Todos os campos exceto imagem são obrigatórios" },
        { status: 400 }
      );
    }

    let imagem = ""; // valor default se não houver imagem

    // salvar imagem se houver
    if (imagemFile) {
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

      const bytes = Buffer.from(await imagemFile.arrayBuffer());
      const fileName = `${Date.now()}-${imagemFile.name}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, bytes);

      imagem = `/uploads/${fileName}`;
    }

    const novoCurso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        preco: Number(preco),
        categoria,
        conteudo,
        imagem, // sempre string
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
  try {
    const body = await req.json();
    const { id, titulo, descricao, preco, categoria, conteudo } = body;

    if (!id) {
      return NextResponse.json({ error: "ID do curso é obrigatório" }, { status: 400 });
    }

    const cursoAtualizado = await prisma.curso.update({
      where: { id: Number(id) },
      data: { titulo, descricao, preco, categoria, conteudo },
    });

    return NextResponse.json(cursoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return NextResponse.json({ error: "Erro ao atualizar curso" }, { status: 500 });
  }
}

// ---------------- DELETE - deletar curso ----------------
export async function DELETE(req: Request) {
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
