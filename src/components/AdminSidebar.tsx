// Sidebar do admin
// Apenas links simples entre páginas
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Painel Admin</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/admin/dashboard" className="hover:text-blue-300">
          Cursos
        </Link>
        <Link href="/admin/config" className="hover:text-blue-300">
          Configurações
        </Link>
      </nav>
    </aside>
  );
}
