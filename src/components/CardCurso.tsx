'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CardCursoProps {
  id: string;
  nome: string;
  descricao: string;
  valor: string;
  imagem: string;
  index?: number; // opcional para animação ou ordenação
}

export default function CardCurso({ id, nome, descricao, valor, imagem }: CardCursoProps) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/cursos/${id}`)}
    >
      <img src={imagem} alt={nome} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-primary">{nome}</h3>
        <p className="text-gray-700">{descricao}</p>
        <p className="text-secondary font-semibold mt-2">{valor}</p>
      </div>
    </div>
  );
}
