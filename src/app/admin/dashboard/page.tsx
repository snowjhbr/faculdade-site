"use client";

import { useEffect, useState } from "react";

type Curso = {
  id: number;
  nome: string;
  descricao: string;
};

export default function AdminDashboardPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState<number | null>(null);

  // Função auxiliar para buscar cursos
  const fetchCursos = async () => {
    const token = localStorage.getItem("admin_token");
    const res = await fetch("/api/admin/cursos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCursos(data);
    setLoading(false);
  };

  // Busca cursos ao montar
  useEffect(() => {
    fetchCursos();
  }, []);

  // Cria ou atualiza curso
  const salvarCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");

    const url = editando
      ? `/api/admin/cursos?id=${editando}`
      : "/api/admin/cursos";

    const metodo = editando ? "PUT" : "POST";

    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, descricao }),
    });

    setNome("");
    setDescricao("");
    setEditando(null);
    fetchCursos();
  };

  // Deleta curso
  const excluirCurso = async (id: number) => {
    const token = localStorage.getItem("admin_token");

    await fetch(`/api/admin/cursos?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCursos();
  };

  if (loading) return <p>Carregando cursos...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard - Cursos</h1>

      {/* Formulário de criação/edição */}
      <form
        onSubmit={salvarCurso}
        className="mb-6 bg-white shadow p-4 rounded"
      >
        <h2 className="text-lg font-semibold mb-3">
          {editando ? "Editar Curso" : "Novo Curso"}
        </h2>
        <input
          type="text"
          placeholder="Nome"
          className="w-full border rounded px-3 py-2 mb-3"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          className="w-full border rounded px-3 py-2 mb-3"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {editando ? "Salvar Alterações" : "Adicionar Curso"}
        </button>
      </form>

      {/* Lista de cursos */}
      <ul className="space-y-3">
        {cursos.map((curso) => (
          <li
            key={curso.id}
            className="bg-white shadow p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{curso.nome}</h2>
              <p className="text-sm text-gray-600">{curso.descricao}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditando(curso.id);
                  setNome(curso.nome);
                  setDescricao(curso.descricao);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => excluirCurso(curso.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
