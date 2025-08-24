'use client';

import React from 'react';
import useFadeIn from '@/hooks/useFadeIn';

export default function ContatoPage() {
  useFadeIn();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 fade-in-up">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Contato</h2>

      <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nome</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Mensagem</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Escreva sua mensagem"
            rows={5}
          ></textarea>
        </div>

        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </div>
  );
}
