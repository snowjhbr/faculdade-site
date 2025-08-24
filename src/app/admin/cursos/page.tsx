"use client";
import { useEffect, useState } from "react";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  conteudo: string;
};

export default function AdminCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [form, setForm] = useState<Partial<Curso & { imagemFile?: File }>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCursos = async () => {
    const res = await fetch("/api/cursos");
    const data = await res.json();
    setCursos(data);
  };

  useEffect(() => { fetchCursos(); }, []);

  // Criar ou atualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", form.titulo || "");
    formData.append("descricao", form.descricao || "");
    formData.append("preco", String(form.preco || 0));
    formData.append("categoria", form.categoria || "");
    formData.append("conteudo", form.conteudo || "");
    if (form.imagemFile) formData.append("imagem", form.imagemFile);

    const method = editingId ? "PUT" : "POST";
    const url = "/api/cursos";

    if (editingId) {
      // PUT não suporta FormData no App Router, enviamos JSON (sem imagem)
      await fetch(url, {
        method,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
    } else {
      await fetch(url, { method, headers, body: formData });
    }

    setForm({});
    setEditingId(null);
    fetchCursos();
  };

  const handleEdit = (curso: Curso) => {
    setForm(curso);
    setEditingId(curso.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente deletar este curso?")) return;
    await fetch("/api/cursos", {
      method: "DELETE",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCursos();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administração de Cursos</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar Curso" : "Novo Curso"}</h2>
        <input type="text" placeholder="Título" value={form.titulo || ""} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
        <input type="text" placeholder="Descrição" value={form.descricao || ""} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
        <input type="number" placeholder="Preço" value={form.preco || ""} onChange={(e) => setForm({ ...form, preco: Number(e.target.value) })} className="w-full mb-2 p-2 border rounded"/>
        <input type="text" placeholder="Categoria" value={form.categoria || ""} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
        <textarea placeholder="Conteúdo" value={form.conteudo || ""} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, imagemFile: e.target.files?.[0] })} className="mb-2"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{editingId ? "Atualizar" : "Criar"}</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-white p-4 rounded shadow">
            {curso.imagem && <img src={curso.imagem} alt={curso.titulo} className="w-full h-40 object-cover mb-2 rounded" />}
            <h3 className="text-lg font-semibold">{curso.titulo}</h3>
            <p className="text-sm text-gray-600 mb-2">{curso.descricao}</p>
            <p className="text-sm font-medium">Preço: R$ {curso.preco}</p>
            <p className="text-sm font-medium">Categoria: {curso.categoria}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(curso)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
              <button onClick={() => handleDelete(curso.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
