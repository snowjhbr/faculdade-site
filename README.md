# Nossa Faculdade - Site Institucional (Next.js + Prisma + PostgreSQL)

## 🚀 Tecnologias
- [Next.js](https://nextjs.org/) (App Router)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- PostgreSQL (via Docker)
- JWT para autenticação do CMS

---

## 📦 Estrutura de pastas
```
faculdade-site/
│── prisma/              # Esquema do banco e seeds
│   ├── schema.prisma
│   └── seed.ts
│
│── src/                 # Código principal
│   ├── controllers/     # Lógica dos endpoints
│   ├── routes/          # Rotas da API
│   ├── services/        # Regras de negócio
│   ├── middlewares/     # Middlewares de autenticação/erros
│   └── utils/           # Funções auxiliares
│
│── .env                 # Variáveis de ambiente
│── package.json
│── tsconfig.json
│── README.md

```

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/snowjhbr/faculdade-site.git
cd faculdade-site
```

### 2. Instale dependências
```bash
npm install
```

### 3. Suba o banco com Docker
```bash
npm run db:up
```

### 4. Rode migrations e seed
```bash
npm run db:migrate
npm run db:seed
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

> Acesse: [http://localhost:3000](http://localhost:3000)

### Login CMS (criado no seed)
- **E-mail:** admin@nossa.com  
- **Senha:** admin123

---

## 📌 Scripts principais
- `npm run db:up` → Sobe PostgreSQL via Docker  
- `npm run db:down` → Derruba container  
- `npm run db:migrate` → Roda migrations  
- `npm run db:seed` → Popula dados iniciais  
- `npm run dev` → Ambiente de desenvolvimento  

---

## 🎯 Funcionalidades implementadas

### Site Público
- **Home:** Banner de destaque, benefícios, cursos populares, depoimentos.  
- **Listagem de cursos:** Busca e filtro por categoria.  
- **Detalhes do curso:** Nome, descrição, preço, imagem e conteúdo programático.  
- **Comprar Agora:** Simulação de compra → redireciona para página de agradecimento.  
- **Sobre Nós:** Texto institucional.  
- **Contato:** Formulário (mock) para envio de nome, e-mail e mensagem.  
- **Obrigado:** Página exibida após compra simulada.  

### CMS (Admin)
- **Login protegido por JWT**.  
- **Dashboard com listagem de cursos**.  
- **Criar curso:** formulário com título, descrição, preço, categoria, imagem e conteúdo.  
- **Editar curso:** alteração dos dados.  
- **Excluir curso:** remoção definitiva.  
- **Logout** (via endpoint /api/auth/logout).  

---

## 🧑‍💻 Fluxo de uso do CMS

1. Acesse [http://localhost:3000/admin/login](http://localhost:3000/admin/login).  
2. Faça login com **admin@nossa.com / admin123**.  
3. Você será redirecionado para o **Dashboard**:  
   - Visualize todos os cursos cadastrados.  
   - Clique em **Editar** para alterar um curso existente.  
   - Clique em **Excluir** para remover um curso.  
4. Para criar um novo curso:  
   - Clique no botão **Novo Curso**.  
   - Preencha os campos (título, descrição, preço, categoria, imagem, conteúdo).  
   - Clique em **Salvar** → O curso aparecerá no Dashboard e também na listagem pública.  
5. Logout: faça `POST /api/auth/logout` (ou adicione um botão no dashboard para chamar essa rota).  

---

## 🔒 Segurança
- Senhas armazenadas com **bcrypt**.  
- Autenticação via **JWT em cookies HttpOnly**.  
- Middleware protege rotas `/admin` e `/api/admin/*`.  


