// src/app/cursos/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CardCurso from '@/components/CardCurso';
import useFadeIn from '@/hooks/useFadeIn';

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export default function CursosPage() {
  useFadeIn();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');
  const [busca, setBusca] = useState('');

  // Buscar cursos do backend
  useEffect(() => {
    fetch('/api/cursos')
      .then(res => res.json())
      .then(data => setCursos(data));
  }, []);

  // Extrair categorias dinamicamente
  const categorias = ['Todos', ...Array.from(new Set(cursos.map(c => c.categoria)))];

  // Filtra cursos por categoria e busca
  const cursosFiltrados = cursos.filter(curso => {
    const matchCategoria = categoriaSelecionada === 'Todos' || curso.categoria === categoriaSelecionada;
    const matchBusca = curso.titulo.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10 fade-in-up">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">Todos os Cursos</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex space-x-2">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                categoriaSelecionada === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar curso..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
        />
      </div>

      {cursosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursosFiltrados.map((curso, index) => (
            <Link key={curso.id} href={`/cursos/${curso.id}`}>
              <CardCurso
                id={String(curso.id)}
                index={index}
                nome={curso.titulo}
                descricao={curso.descricao}
                valor={`R$ ${curso.preco}`}
                imagem={curso.imagem}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg">Nenhum curso encontrado.</p>
      )}
    </div>
  );
}
