import styled, { css } from "styled-components";
import { Trash2 } from "lucide-react";

const Card = styled.div<{ status?: 'ativo' | 'encerrado' }>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: all 0.3s ease;
  border-left: 3px solid;
  
  ${({ status }) =>
    status === 'ativo' ? css`
      border-color: #4CAF50;
      &:hover { box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15); }
    ` : css`
      border-color: #F44336;
      &:hover { box-shadow: 0 4px 12px rgba(244, 67, 54, 0.15); }
    `}

  &:hover {
    transform: translateY(-2px);
  }
`;

const RemoverButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #CC6237;
  transition: color 0.2s;

  &:hover {
    color: #a13e1d;
  }
`;

const EquipeInfo = styled.span`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const CardDate = styled.small`
  display: block;
  color: #888;
  font-size: 12px;
  margin-top: 4px;
`;

const StatusBadge = styled.span<{ status?: 'ativo' | 'encerrado' }>`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  
  ${({ status }) =>
    status === 'ativo' ? css`
      background: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
    ` : css`
      background: rgba(244, 67, 54, 0.1);
      color: #F44336;
    `}
`;

const EquipesContainer = styled.div`
  margin-top: 12px;
`;

const EquipesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
`;

const ContadorBadge = styled.span`
  background: #f0f0f0;
  color: #555;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
`;

const NenhumaEquipe = styled.div`
  color: #bbb;
  font-size: 13px;
  text-align: center;
  padding: 8px 0;
  background: #fafafa;
  border-radius: 6px;
`;

const EquipesLista = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 120px;
  overflow-y: auto;
`;

const EquipeItem = styled.li`
  padding: 6px 0;
  font-size: 13px;
  color: #444;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f8f8f8;

  &:last-child {
    border-bottom: none;
  }
`;

const EquipeMembros = styled.span`
  color: #888;
  font-size: 11px;
`;

type EventoCardProps = {
  evento: {
    id: number | string;
    nome: string;
    data?: string;
    status?: 'ativo' | 'encerrado';
    equipesInscritas: {
      id: number | string;
      nome: string;
      membros?: number;
    }[];
  };
  onRemoveEquipe: (eventoId: string | number, equipeId: string | number) => void;
};
function normalizarStatus(status: string | undefined) {
  if (!status) return undefined;
  const s = status.trim().toLowerCase();
  if (s === "ativo") return "ativo";
  if (s === "encerrado") return "encerrado";
  return undefined;
}

export default function EventoCard({ evento, onRemoveEquipe }: EventoCardProps) {
  const statusNormalizado = normalizarStatus(evento.status);

  return (
    <Card status={statusNormalizado}>
      <CardHeader>
        <div>
          <CardTitle>{evento.nome}</CardTitle>
          <CardDate>{evento.data}</CardDate>
        </div>
        <StatusBadge status={statusNormalizado}>
          {statusNormalizado === "ativo"
            ? "Ativo"
            : statusNormalizado === "encerrado"
              ? "Encerrado"
              : ""}
        </StatusBadge>
      </CardHeader>

      <EquipesContainer>
        <EquipesTitle>
          <span>Equipes Inscritas</span>
          <ContadorBadge>{evento.equipesInscritas.length}</ContadorBadge>
        </EquipesTitle>

        {evento.equipesInscritas.length === 0 ? (
          <NenhumaEquipe>Nenhuma equipe inscrita</NenhumaEquipe>
        ) : (
          <EquipesLista>
            {evento.equipesInscritas.map((equipe) => (
              <EquipeItem key={equipe.id}>
                <EquipeInfo>
                  <span>{equipe.nome}</span>
                  {typeof equipe.membros === "number" && (
                    <EquipeMembros>{equipe.membros} membros</EquipeMembros>
                  )}
                </EquipeInfo>
                <RemoverButton
                  title="Remover inscrição"
                  onClick={e => {
                    e.stopPropagation();
                    onRemoveEquipe(evento.id, equipe.id);
                  }}
                >
                  <Trash2 size={16} />
                </RemoverButton>
              </EquipeItem>
            ))}
          </EquipesLista>
        )}
      </EquipesContainer>
    </Card>
  );
}