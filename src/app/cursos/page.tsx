'use client';

import React, { useState } from 'react';
import CardCurso from '@/components/CardCurso';
import useFadeIn from '@/hooks/useFadeIn';

interface Curso {
  id: string;
  nome: string;
  descricao: string;
  valor: string;
  imagem: string;
  categoria: string;
}

// Lista de cursos (pode futuramente vir do CMS)
const cursos: Curso[] = [
  {
    id: '1',
    nome: 'Sistemas de Informação',
    descricao: 'Aprenda desenvolvimento de software, banco de dados e mais.',
    valor: 'R$ 1.200,00',
    imagem: '/images/si.jpg',
    categoria: 'Tecnologia',
  },
  {
    id: '2',
    nome: 'Nutrição',
    descricao: 'Estude alimentação saudável, dietética e nutrição clínica.',
    valor: 'R$ 950,00',
    imagem: '/images/nutricao.jpg',
    categoria: 'Saúde',
  },
  {
    id: '3',
    nome: 'Fisioterapia',
    descricao: 'Aprenda técnicas de reabilitação e cuidados com pacientes.',
    valor: 'R$ 1.050,00',
    imagem: '/images/fisioterapia.jpg',
    categoria: 'Saúde',
  },
  {
    id: '4',
    nome: 'Design Gráfico',
    descricao: 'Crie identidades visuais e designs modernos.',
    valor: 'R$ 800,00',
    imagem: '/images/design.jpg',
    categoria: 'Arte',
  },
];

export default function CursosPage() {
  useFadeIn();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos');
  const [busca, setBusca] = useState('');

  // Filtra cursos por categoria e nome
  const cursosFiltrados = cursos.filter((curso) => {
    const matchCategoria = categoriaSelecionada === 'Todos' || curso.categoria === categoriaSelecionada;
    const matchBusca = curso.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  // Lista de categorias para filtro
  const categorias = ['Todos', 'Tecnologia', 'Saúde', 'Arte'];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-10 fade-in-up">

      <h1 className="text-4xl font-bold text-primary text-center mb-8">Todos os Cursos</h1>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Filtro por categoria */}
        <div className="flex space-x-2">
          {categorias.map((cat) => (
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

        {/* Pesquisa por nome */}
        <input
          type="text"
          placeholder="Buscar curso..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
        />
      </div>

      {/* Lista de cursos */}
      {cursosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursosFiltrados.map((curso, index) => (
            <CardCurso
              key={curso.id}
              id={curso.id}
              index={index}
              nome={curso.nome}
              descricao={curso.descricao}
              valor={curso.valor}
              imagem={curso.imagem}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg">Nenhum curso encontrado.</p>
      )}

    </div>
  );
}
