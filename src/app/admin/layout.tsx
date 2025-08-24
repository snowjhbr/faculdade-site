// Layout do Admin
// Aqui definimos a base do painel admin: um sidebar fixo e a área principal.
// Isso ajuda a manter consistência entre as páginas do admin.

import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar do admin */}
      <AdminSidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
