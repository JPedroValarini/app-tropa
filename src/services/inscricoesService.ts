const API_URL = "http://localhost:3001/inscricoes";

export async function getInscricoes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar inscrições");
  return res.json();
}

export async function createInscricao(inscricao: { eventoId: number; equipeId: number }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inscricao),
  });
  if (!res.ok) throw new Error("Erro ao criar inscrição");
  return res.json();
}

export async function deleteInscricao(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar inscrição");
  return res.json();
}