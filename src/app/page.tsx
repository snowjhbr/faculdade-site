'use client';

import React from 'react';
import CardCurso from '@/components/CardCurso';
import useFadeIn from '@/hooks/useFadeIn';
import { useRouter } from 'next/navigation';

const cursosDestaque = [
  {
    id: '1',
    nome: 'Sistemas de Informação',
    descricao: 'Aprenda desenvolvimento de software, banco de dados e mais.',
    valor: 'R$ 1.200,00',
    imagem: '/images/si.jpg',
  },
  {
    id: '2',
    nome: 'Nutrição',
    descricao: 'Estude alimentação saudável, dietética e nutrição clínica.',
    valor: 'R$ 950,00',
    imagem: '/images/nutricao.jpg',
  },
];

const beneficios = [
  {
    id: 1,
    titulo: 'Aprendizado Prático',
    descricao: 'Cursos com exercícios e projetos reais para aplicar o conhecimento.',
  },
  {
    id: 2,
    titulo: 'Flexibilidade',
    descricao: 'Estude no seu ritmo, acessando aulas de qualquer lugar.',
  },
  {
    id: 3,
    titulo: 'Certificação',
    descricao: 'Receba certificado reconhecido ao concluir os cursos.',
  },
];

const depoimentos = [
  {
    id: 1,
    nome: 'Ana Silva',
    comentario: 'O curso de Sistemas de Informação me ajudou a conseguir meu emprego dos sonhos!',
    imagem: '/images/aluno1.jpg',
  },
  {
    id: 2,
    nome: 'Carlos Souza',
    comentario: 'A metodologia é prática e fácil de acompanhar, adorei os exercícios!',
    imagem: '/images/aluno2.jpg',
  },
];

export default function HomePage() {
  useFadeIn();
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-20">

      {/* Banner com CTA */}
      <section 
        className="relative bg-cover bg-center h-[60vh] flex items-end justify-center text-white"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <div className="bg-black/50 p-4 rounded mb-8 text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-2">Aprenda com os melhores cursos!</h2>
          <a 
            href="/cursos"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Ver Cursos
          </a>
        </div>
      </section>



      {/* Benefícios */}
      <section className="fade-in-up">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Benefícios de Nossos Cursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {beneficios.map((b) => (
            <div key={b.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-primary">{b.titulo}</h3>
              <p className="text-gray-700">{b.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos em destaque */}
      <section className="fade-in-up">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Cursos em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cursosDestaque.map((curso, index) => (
            <CardCurso
              key={curso.id}
              id={curso.id} // agora o card sabe para qual página de detalhes navegar
              index={index}
              nome={curso.nome}
              descricao={curso.descricao}
              valor={curso.valor}
              imagem={curso.imagem}
            />
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="fade-in-up">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">O que nossos alunos dizem</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {depoimentos.map((d) => (
            <div key={d.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
              <img src={d.imagem} alt={d.nome} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="text-gray-700 italic">"{d.comentario}"</p>
                <p className="mt-2 font-semibold text-primary">{d.nome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
