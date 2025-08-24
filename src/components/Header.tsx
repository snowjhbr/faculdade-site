import React from 'react';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <h1 className="text-2xl font-bold">Meu Site de Cursos</h1>
      <nav className="mt-2 space-x-4">
        <a href="/" className="hover:text-accent transition-colors duration-200">Home</a>
        <a href="/sobre" className="hover:text-accent transition-colors duration-200">Sobre Nós</a>
        <a href="/cursos" className="hover:text-accent transition-colors duration-200">Cursos</a>
        <a href="/contato" className="hover:text-accent transition-colors duration-200">Contato</a>
      </nav>
    </header>
  );
}
