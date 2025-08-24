'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function PaginaObrigado() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto py-20 text-center fade-in-up">
      <h1 className="text-4xl font-bold text-primary mb-6">
        Obrigado pela compra!
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Em breve você receberá mais informações por e-mail.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-accent text-primary font-bold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Voltar para Home
      </button>
    </div>
  );
}
