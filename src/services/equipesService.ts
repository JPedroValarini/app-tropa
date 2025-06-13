const API_URL = "http://localhost:3001/equipes";

export async function getEquipes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar equipes");
  return res.json();
}

export interface Equipe {
  id?: number;
  nome: string;
}

export async function createEquipe(equipe: Omit<Equipe, "id">): Promise<Equipe> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipe),
  });
  if (!res.ok) throw new Error("Erro ao criar equipe");
  return res.json();
}

export interface UpdateEquipeParams {
  nome: string;
}

export async function updateEquipe(id: number, equipe: UpdateEquipeParams): Promise<Equipe> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(equipe),
  });
  if (!res.ok) throw new Error("Erro ao atualizar equipe");
  return res.json();
}

export interface DeleteEquipeResponse {
  [key: string]: unknown;
}

export async function deleteEquipe(id: number): Promise<DeleteEquipeResponse> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar equipe");
  return res.json();
}