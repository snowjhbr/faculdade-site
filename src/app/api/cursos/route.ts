// src/app/api/cursos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import formidable from "formidable";
import path from "path";

export const config = {
  api: { bodyParser: false }, // necessário para upload
};

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
  const admin = requireAdmin(req);
  if (!admin) return new NextResponse("Não autorizado", { status: 401 });

  const form = new formidable.IncomingForm() as any;
  form.uploadDir = path.join(process.cwd(), "public/uploads");
  form.keepExtensions = true;

  return new Promise((resolve) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err)
        return resolve(
          NextResponse.json({ error: "Erro no upload" }, { status: 500 })
        );

      const { titulo, descricao, preco, categoria, conteudo } = fields;
      const imagemFile = Array.isArray(files.imagem) ? files.imagem[0] : files.imagem;
      const imagem = imagemFile ? `/uploads/${path.basename(imagemFile.filepath)}` : null;

      if (!titulo || !descricao || !preco || !categoria || !conteudo || !imagem) {
        return resolve(
          NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
        );
      }

      try {
        const novoCurso = await prisma.curso.create({
          data: {
            titulo: String(titulo),
            descricao: String(descricao),
            preco: Number(preco),
            categoria: String(categoria),
            conteudo: String(conteudo),
            imagem,
          },
        });
        resolve(NextResponse.json(novoCurso, { status: 201 }));
      } catch (error) {
        console.error("Erro ao criar curso:", error);
        resolve(
          NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 })
        );
      }
    });
  });
}

// ---------------- PUT - atualizar curso (JSON, sem imagem) ----------------
export async function PUT(req: Request) {
  const admin = requireAdmin(req);
  if (!admin) return new NextResponse("Não autorizado", { status: 401 });

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
