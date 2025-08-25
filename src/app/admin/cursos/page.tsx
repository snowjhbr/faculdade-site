"use client";

import { useEffect, useState } from "react";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string | null;
  conteudo: string;
};

export default function AdminCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState<Partial<Curso & { imagemFile?: File }>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  // --------- BUSCAR CURSOS ----------
  const fetchCursos = async () => {
    try {
      const res = await fetch("/api/admin/cursos", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setCursos(data);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  // --------- CRIAR OU ATUALIZAR CURSO ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Atualizar curso via PUT (JSON)
        await fetch("/api/admin/cursos", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        // Criar curso via POST (FormData)
        const formData = new FormData();
        formData.append("titulo", form.titulo || "");
        formData.append("descricao", form.descricao || "");
        formData.append("preco", String(form.preco || 0));
        formData.append("categoria", form.categoria || "");
        formData.append("conteudo", form.conteudo || "");
        if (form.imagemFile) formData.append("imagem", form.imagemFile);

        await fetch("/api/admin/cursos", {
          method: "POST",
          body: formData, // não passar headers Content-Type
        });
      }

      setForm({});
      setEditingId(null);
      fetchCursos();
    } catch (err) {
      console.error("Erro ao criar/atualizar curso:", err);
      alert("❌ Erro ao conectar ao servidor");
    }
  };

  // --------- EDITAR ----------
  const handleEdit = (curso: Curso) => {
    setForm(curso);
    setEditingId(curso.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --------- DELETAR ----------
  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente deletar este curso?")) return;

    try {
      await fetch("/api/admin/cursos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id }),
      });
      fetchCursos();
    } catch (err) {
      console.error("Erro ao deletar curso:", err);
      alert("❌ Erro ao deletar curso");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administração de Cursos</h1>

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Editar Curso" : "Novo Curso"}
        </h2>

        <input
          type="text"
          placeholder="Título"
          value={form.titulo || ""}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={form.descricao || ""}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Preço"
          value={form.preco || ""}
          onChange={(e) => setForm({ ...form, preco: Number(e.target.value) })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Categoria"
          value={form.categoria || ""}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Conteúdo"
          value={form.conteudo || ""}
          onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imagemFile: e.target.files?.[0] })}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Atualizar" : "Criar"}
        </button>
      </form>

      {/* LISTA DE CURSOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-white p-4 rounded shadow">
            {curso.imagem && (
              <img
                src={curso.imagem}
                alt={curso.titulo}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{curso.titulo}</h3>
            <p className="text-sm text-gray-600 mb-2">{curso.descricao}</p>
            <p className="text-sm font-medium">Preço: R$ {curso.preco}</p>
            <p className="text-sm font-medium">Categoria: {curso.categoria}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(curso)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(curso.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
