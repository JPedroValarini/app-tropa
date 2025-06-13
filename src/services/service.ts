import config from '../config';
const API_URL = `${config.apiUrl}/eventos`;

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

export interface Evento {
  id?: number;
  [key: string]: unknown;
}

export async function updateEvento(id: number, evento: Evento): Promise<Evento> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento),
  });
  if (!res.ok) throw new Error("Erro ao atualizar evento");
  return res.json();
}

export interface DeleteEventoResponse {
  success?: boolean;
  [key: string]: unknown;
}

export async function deleteEvento(id: number): Promise<DeleteEventoResponse> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar evento");
  return res.json();
}