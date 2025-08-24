import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Listar todos os usuários
  const usuarios = await prisma.usuarios.findMany();
  console.log('Usuários atuais:', usuarios);

  // Criar um novo usuário
  await prisma.usuarios.create({
    data: {
      nome: 'João',
      email: 'joao@example.com'
    }
  });

  // Listar novamente para ver o novo usuário
  const usuariosAtualizados = await prisma.usuarios.findMany();
  console.log('Após criação:', usuariosAtualizados);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
