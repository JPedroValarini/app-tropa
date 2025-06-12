const API_URL = "http://localhost:3001/eventos";

export async function getEventos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar eventos");
  return res.json();
}

export async function createEvento(evento: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}