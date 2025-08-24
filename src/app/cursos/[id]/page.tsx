'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import useFadeIn from '@/hooks/useFadeIn';

const cursos = [
  {
    id: '1',
    nome: 'Sistemas de Informação',
    descricao: 'Aprenda desenvolvimento de software, banco de dados e mais.',
    valor: 'R$ 1.200,00',
    imagem: '/images/si.jpg',
    conteudo: [
      'Introdução à Programação',
      'Banco de Dados',
      'Desenvolvimento Web',
      'Projetos Práticos',
    ],
  },
  {
    id: '2',
    nome: 'Nutrição',
    descricao: 'Estude alimentação saudável, dietética e nutrição clínica.',
    valor: 'R$ 950,00',
    imagem: '/images/nutricao.jpg',
    conteudo: [
      'Nutrição Básica',
      'Dietética',
      'Nutrição Clínica',
      'Práticas de Alimentação',
    ],
  },
  {
    id: '3',
    nome: 'Fisioterapia',
    descricao: 'Aprenda técnicas de reabilitação e cuidados com pacientes.',
    valor: 'R$ 1.050,00',
    imagem: '/images/fisioterapia.jpg',
    categoria: 'Saúde',
    conteudo: ['Anatomia', 'Terapia Manual', 'Reabilitação Funcional', 'Exercícios Práticos'],
  },
  {
    id: '4',
    nome: 'Design Gráfico',
    descricao: 'Crie identidades visuais e designs modernos.',
    valor: 'R$ 800,00',
    imagem: '/images/design.jpg',
    categoria: 'Arte',
    conteudo: ['Tipografia', 'Corel / Illustrator', 'Teoria das Cores', 'Projetos Práticos'],
  },
];

export default function DetalhesCurso() {
  useFadeIn();
  const { id } = useParams();
  const router = useRouter();

  const curso = cursos.find((c) => c.id === id);

  if (!curso) {
    return (
      <div className="text-center py-20 text-red-600 font-bold text-xl">
        Curso não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10 fade-in-up">
      {/* Título e imagem */}
      <section className="flex flex-col lg:flex-row items-center gap-8">
        <img
          src={curso.imagem}
          alt={curso.nome}
          className="w-full lg:w-1/2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-primary">{curso.nome}</h1>
          <p className="text-gray-700 text-lg">{curso.descricao}</p>
          <p className="text-2xl font-semibold text-secondary">{curso.valor}</p>
          <button
            onClick={() => router.push('/obrigado')}
            className="bg-accent text-primary font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Comprar Agora
          </button>
        </div>
      </section>

      {/* Conteúdo programático */}
      <section className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-primary mb-4">Conteúdo Programático</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {curso.conteudo.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
