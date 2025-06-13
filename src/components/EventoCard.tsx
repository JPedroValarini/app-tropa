import styled, { css } from "styled-components";

const Card = styled.div<{ status?: 'ativo' | 'encerrado' | 'breve' }>`
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
    ` :
      status === 'breve' ? css`
      border-color: #FFC107;
      &:hover { box-shadow: 0 4px 12px rgba(255, 193, 7, 0.15); }
    ` : css`
      border-color: #F44336;
      &:hover { box-shadow: 0 4px 12px rgba(244, 67, 54, 0.15); }
    `}

  &:hover {
    transform: translateY(-2px);
  }
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

const StatusBadge = styled.span<{ status?: 'ativo' | 'encerrado' | 'breve' }>`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  
  ${({ status }) =>
    status === 'ativo' ? css`
      background: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
    ` :
      status === 'breve' ? css`
      background: rgba(255, 193, 7, 0.1);
      color: #FFA000;
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
    status?: 'ativo' | 'encerrado' | 'breve';
    equipesInscritas: {
      id: number | string;
      nome: string;
      membros?: number;
    }[];
  };
};

export default function EventoCard({ evento }: EventoCardProps) {
  return (
    <Card status={evento.status}>
      <CardHeader>
        <div>
          <CardTitle>{evento.nome}</CardTitle>
          <CardDate>{evento.data}</CardDate>
        </div>
        <StatusBadge status={evento.status}>
          {evento.status === 'ativo' ? 'Ativo' :
            evento.status === 'breve' ? 'Em breve' : 'Encerrado'}
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
                <span>{equipe.nome}</span>
                <EquipeMembros>{equipe.membros} membros</EquipeMembros>
              </EquipeItem>
            ))}
          </EquipesLista>
        )}
      </EquipesContainer>
    </Card>
  );
}