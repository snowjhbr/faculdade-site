import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando seed...");

  // 1️⃣ Usuário Admin
  const senhaHash = await bcrypt.hash('admin123', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@nossa.com' },
    update: {},
    create: {
      nome: 'Admin',
      email: 'admin@nossa.com',
      senha: senhaHash,
      isAdmin: true,
    },
  });
  console.log("✅ Usuário admin criado/atualizado.");

  // 2️⃣ Cursos
  const cursosData = [
    {
      titulo: 'Introdução à Programação',
      descricao: 'Aprenda lógica, variáveis, condições e laços.',
      preco: 199.9,
      categoria: 'Tecnologia',
      imagem: '/images/design.jpg',
      conteudo: 'Módulo 1: Lógica\nMódulo 2: Variáveis\nMódulo 3: Estruturas',
    },
    {
      titulo: 'Marketing Digital Essencial',
      descricao: 'Fundamentos de tráfego, conteúdo e funil.',
      preco: 149.9,
      categoria: 'Marketing',
      imagem: '/images/administracao.jpg',
      conteudo: 'SEO, Mídias Sociais, Email Marketing',
    },
  ];

  const cursosCriados: Array<{ id: number; titulo: string }> = [];

  for (const curso of cursosData) {
    const c = await prisma.curso.upsert({
      where: { titulo: curso.titulo },
      update: {},
      create: curso,
    });
    cursosCriados.push({ id: c.id, titulo: c.titulo });
  }
  console.log(`✅ ${cursosCriados.length} cursos criados/atualizados.`);

  // 3️⃣ Depoimentos
  const depoimentosData = [
    {
      nome: 'João Silva',
      texto: 'O curso de Introdução à Programação mudou minha carreira!',
      cursoTitulo: 'Introdução à Programação',
    },
    {
      nome: 'Maria Santos',
      texto: 'Aprendi muito sobre marketing digital. Super recomendo!',
      cursoTitulo: 'Marketing Digital Essencial',
    },
  ];

  for (const depoimento of depoimentosData) {
    const curso = cursosCriados.find(c => c.titulo === depoimento.cursoTitulo);
    if (!curso) {
      console.warn(`⚠️ Curso "${depoimento.cursoTitulo}" não encontrado, depoimento ignorado.`);
      continue;
    }

    await prisma.depoimento.upsert({
      where: { nome: depoimento.nome },
      update: {},
      create: {
        nome: depoimento.nome,
        texto: depoimento.texto,
        cursoId: curso.id,
      },
    });
  }
  console.log("✅ Depoimentos criados/atualizados.");

  console.log("🌱 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
