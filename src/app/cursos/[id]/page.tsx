'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useFadeIn from '@/hooks/useFadeIn';

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  conteudo: string; // ou array de strings, depende de como está no banco
}

export default function DetalhesCurso() {
  useFadeIn();
  const { id } = useParams();
  const router = useRouter();

  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/cursos/${id}`)
      .then(res => res.json())
      .then(data => {
        setCurso(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Carregando curso...</p>;
  }

  if (!curso) {
    return (
      <div className="text-center py-20 text-red-600 font-bold text-xl">
        Curso não encontrado.
      </div>
    );
  }

  // Se o campo conteudo for string separada por linhas no banco, transformamos em array
  const conteudoArray = Array.isArray(curso.conteudo)
    ? curso.conteudo
    : curso.conteudo?.split('\n') || [];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10 fade-in-up">
      {/* Título e imagem */}
      <section className="flex flex-col lg:flex-row items-center gap-8">
        <img
          src={curso.imagem}
          alt={curso.titulo}
          className="w-full lg:w-1/2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
        <div className="lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-primary">{curso.titulo}</h1>
          <p className="text-gray-700 text-lg">{curso.descricao}</p>
          <p className="text-2xl font-semibold text-secondary">R$ {curso.preco}</p>
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
          {conteudoArray.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
