// src/app/admin/page.tsx
import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Administração</h1>
      <p className="mb-4">Escolha o módulo que deseja gerenciar:</p>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/cursos" className="text-blue-600 hover:underline">
            Gerenciar Cursos
          </Link>
        </li>
        {/* aqui você pode adicionar mais links para outros módulos */}
      </ul>
    </div>
  );
}
