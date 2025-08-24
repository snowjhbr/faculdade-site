import { verifyToken } from "./auth";

/**
 * Middleware para proteger rotas
 * Verifica se o usuário está autenticado via JWT
 */
export const withAuth = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1]; // esperado: "Bearer <token>"

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }

    // Anexa os dados do usuário ao request
    req.user = decoded;

    return handler(req, res);
  };
};
