import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'Site de Cursos',
  description: 'Venda de cursos online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">

        {/* Header */}
        <header className="bg-primary text-white p-4 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center h-full">
            
            <span className="text-xl font-bold ml-2">UNIFAMEC</span>
          </div>

          {/* Navbar */}
          <nav className="space-x-4">
            <a href="/" className="text-white font-semibold hover:text-accent transition-colors duration-200">Home</a>
            <a href="/sobre" className="text-white font-semibold hover:text-accent transition-colors duration-200">Sobre Nós</a>
            <a href="/cursos" className="text-white font-semibold hover:text-accent transition-colors duration-200">Cursos</a>
            <a href="/contato" className="text-white font-semibold hover:text-accent transition-colors duration-200">Contato</a>
          </nav>
        </header>

        {/* Main */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-primary text-white text-center p-4">
          © 2025 UNIFAMEC. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
