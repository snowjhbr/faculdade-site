/**
 * Logout em apps com JWT é normalmente feito no cliente
 * (basta apagar o token do localStorage/cookie).
 * Aqui criamos um endpoint para formalizar a ação.
 */
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  // No caso de JWT, não há "deslogar" no servidor.
  // Apenas orientamos o cliente a remover o token.
  return res.status(200).json({ message: "Logout realizado com sucesso. Remova o token do cliente." });
}
