import config from '../config';
const API_URL = `${config.apiUrl}/inscricoes`;

export async function getInscricoes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar inscrições");
  return res.json();
}

export async function createInscricao(inscricao: { eventoId: string | number; equipeId: string | number }) {
  const res = await fetch("https://json-server-api-kv6x.onrender.com/api/inscricoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inscricao),
  });
  if (!res.ok) throw new Error("Erro ao criar inscrição");
  return res.json();
}

export async function deleteInscricao(id: string | number) {
  const res = await fetch(`https://json-server-api-kv6x.onrender.com/api/inscricoes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar inscrição");
  return res.json();
}