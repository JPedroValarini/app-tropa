import { useEffect, useState } from "react";
import { getEventos } from "../../services/service";
import { getEquipes } from "../../services/equipesService";
import { getInscricoes } from "../../services/inscricoesService";
import styled, { keyframes } from "styled-components";
import { Users, Calendar, List, Award, Loader, MapPin } from "lucide-react";

type Evento = {
  id: string | number;
  nome: string;
  status: string;
  data: string;
  equipes?: number;
};

type Equipe = {
  id: string | number;
  nome: string;
  responsavel?: string;
  cidade?: string;
  status?: string;
};

type Inscricao = {
  id: string | number;
  eventoId: string | number;
  equipeId: string | number;
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #CC6237;
  margin: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #CC6237, #E67E22);
    border-radius: 2px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #CC6237, #E67E22);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(204, 98, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    color: #CC6237;
  }
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
`;

const StatChange = styled.span<{ $positive?: boolean }>`
  font-size: 0.8rem;
  color: ${({ $positive }) => ($positive ? '#27ae60' : '#e74c3c')};
  display: flex;
  align-items: center;
  
  &::before {
    content: '${({ $positive }) => ($positive ? '↑' : '↓')}';
    margin-right: 0.25rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: #CC6237;
  }
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
`;

const ListCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

const ListCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ListCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
`;

const ListCardBadge = styled.span<{ $status: string }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: ${({ $status }) =>
    $status.toLowerCase() === "ativo" ? "rgba(39, 174, 96, 0.1)" : "rgba(230, 126, 34, 0.1)"};
  color: ${({ $status }) =>
    $status.toLowerCase() === "ativo" ? "#27ae60" : "#e67e22"};
`;

const ListCardDetail = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ListCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const ListCardStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1a1a1a;
  
  span {
    font-weight: 700;
    color: #CC6237;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1.5rem;
`;

const LoadingSpinner = styled(Loader)`
  animation: ${pulse} 1.5s ease-in-out infinite;
  color: #CC6237;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #666;
`;

export default function DashboardHome() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const [eventosData, equipesData, inscricoesData] = await Promise.all([
          getEventos(),
          getEquipes(),
          getInscricoes(),
        ]);
        setEventos(eventosData);
        setEquipes(equipesData);
        setInscricoes(inscricoesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  const totalEventos = eventos.length;
  const totalEquipes = equipes.length;
  const totalInscricoes = inscricoes.length;
  const eventosAtivos = eventos.filter(e => e.status === 'Ativo').length;
  const equipesAtivas = equipes.filter(e => e.status === 'Ativa').length;

  const eventosComQtdEquipes = eventos.map((evento) => {
    const qtdEquipes = inscricoes.filter(
      (insc) => String(insc.eventoId) === String(evento.id)
    ).length;
    return { ...evento, qtdEquipes };
  });

  const eventosMaisPopulares = [...eventosComQtdEquipes]
    .sort((a, b) => b.qtdEquipes - a.qtdEquipes)
    .slice(0, 4);

  const equipesComQtdEventos = equipes.map((equipe) => {
    const qtdEventos = inscricoes.filter(
      (insc) => String(insc.equipeId) === String(equipe.id)
    ).length;
    return { ...equipe, qtdEventos };
  });

  const equipesMaisAtivas = [...equipesComQtdEventos]
    .sort((a, b) => b.qtdEventos - a.qtdEventos)
    .slice(0, 4);

  return (
    <Container>
      <Header>
        <Title>Visão Geral</Title>
      </Header>

      {loading ? (
        <LoadingContainer>
          <LoadingSpinner size={48} />
          <LoadingText>Carregando dados do dashboard...</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          <CardsGrid>
            <StatCard>
              <StatIcon>
                <Calendar size={24} />
              </StatIcon>
              <StatInfo>
                <StatLabel>Total de Eventos</StatLabel>
                <StatValue>{totalEventos}</StatValue>
                <StatChange $positive={eventosAtivos > totalEventos / 2}>
                  {eventosAtivos} ativos
                </StatChange>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIcon>
                <Users size={24} />
              </StatIcon>
              <StatInfo>
                <StatLabel>Total de Equipes</StatLabel>
                <StatValue>{totalEquipes}</StatValue>
                <StatChange $positive={equipesAtivas > totalEquipes / 2}>
                  {equipesAtivas} ativas
                </StatChange>
              </StatInfo>
            </StatCard>

            <StatCard>
              <StatIcon>
                <List size={24} />
              </StatIcon>
              <StatInfo>
                <StatLabel>Total de Inscrições</StatLabel>
                <StatValue>{totalInscricoes}</StatValue>
                <StatChange $positive={totalInscricoes > totalEquipes}>
                  Média de {(totalInscricoes / totalEventos).toFixed(1)} por evento
                </StatChange>
              </StatInfo>
            </StatCard>
          </CardsGrid>

          <Section>
            <SectionHeader>
              <SectionTitle>
                <Award size={20} />
                Eventos em Destaque
              </SectionTitle>
            </SectionHeader>
            <CardList>
              {eventosMaisPopulares.length === 0 ? (
                <ListCard>Nenhum evento encontrado.</ListCard>
              ) : (
                eventosMaisPopulares.map((evento) => (
                  <ListCard key={evento.id}>
                    <ListCardHeader>
                      <ListCardTitle>{evento.nome}</ListCardTitle>
                      <ListCardBadge $status={evento.status}>
                        {evento.status}
                      </ListCardBadge>
                    </ListCardHeader>
                    <ListCardDetail>
                      <Calendar size={14} />
                      {evento.data}
                    </ListCardDetail>
                    <ListCardDetail>
                      <Users size={14} />
                      Capacidade: {evento.equipes} equipes
                    </ListCardDetail>
                    <ListCardFooter>
                      <ListCardStat>
                        <span>{evento.qtdEquipes}</span> Equipes inscritas
                      </ListCardStat>
                    </ListCardFooter>
                  </ListCard>
                ))
              )}
            </CardList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>
                <Award size={20} />
                Equipes em Destaque
              </SectionTitle>
            </SectionHeader>
            <CardList>
              {equipesMaisAtivas.length === 0 ? (
                <ListCard>Nenhuma equipe encontrada.</ListCard>
              ) : (
                equipesMaisAtivas.map((equipe) => (
                  <ListCard key={equipe.id}>
                    <ListCardHeader>
                      <ListCardTitle>{equipe.nome}</ListCardTitle>
                      {equipe.status && (
                        <ListCardBadge $status={equipe.status}>
                          {equipe.status}
                        </ListCardBadge>
                      )}
                    </ListCardHeader>
                    {equipe.cidade && (
                      <ListCardDetail>
                        <MapPin size={14} />
                        {equipe.cidade}
                      </ListCardDetail>
                    )}
                    {equipe.responsavel && (
                      <ListCardDetail>
                        <Users size={14} />
                        Responsável: {equipe.responsavel}
                      </ListCardDetail>
                    )}
                    <ListCardFooter>
                      <ListCardStat>
                        Participou de <span>{equipe.qtdEventos}</span> evento
                        {equipe.qtdEventos === 1 ? "" : "s"}
                      </ListCardStat>
                    </ListCardFooter>
                  </ListCard>
                ))
              )}
            </CardList>
          </Section>
        </>
      )}
    </Container>
  );
}