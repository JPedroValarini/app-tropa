import { useEffect, useState } from "react";
import { getEventos } from "../../services/service";
import { getEquipes } from "../../services/equipesService";
import { getInscricoes } from "../../services/inscricoesService";
import {
  Container,
  ContentWrapper,
  Header,
  Title,
  Actions,
  SearchInput,
  TableWrapper,
  TableContainer,
  Pagination,
  PageButton,
  PageNumber
} from "../../styles/MainStyles";
import EventoCard from "../../components/EventoCard";

type Evento = {
  id: number | string;
  nome: string;
  data?: string;
  status?: 'ativo' | 'encerrado' | 'breve';
};

type Equipe = {
  id: number | string;
  nome: string;
  membros?: number;
};

type Inscricao = {
  id: number | string;
  eventoId: number | string;
  equipeId: number | string;
};

type EventoComEquipes = Evento & {
  equipesInscritas: Equipe[];
};

export default function Inscricoes() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [eventosData, equipesData, inscricoesData] = await Promise.all([
          getEventos(),
          getEquipes(),
          getInscricoes(),
        ]);

        interface EventoCompleto extends Evento {
          data: string;
          status: 'ativo' | 'encerrado' | 'breve';
        }

        const eventosCompletos: EventoCompleto[] = eventosData.map((evento: Evento): EventoCompleto => ({
          ...evento,
          data: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: ['ativo', 'encerrado', 'breve'][Math.floor(Math.random() * 3)] as 'ativo' | 'encerrado' | 'breve'
        }));

        interface EquipeCompleta extends Equipe {
          membros: number;
        }

        const equipesCompletas: EquipeCompleta[] = equipesData.map((equipe: Equipe): EquipeCompleta => ({
          ...equipe,
          membros: Math.floor(Math.random() * 10) + 1
        }));

        setEventos(eventosCompletos);
        setEquipes(equipesCompletas);
        setInscricoes(inscricoesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const getEventosComEquipes = (): EventoComEquipes[] => {
    return eventos
      .filter(evento =>
        evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.data?.includes(searchTerm))
      .map((evento) => {
        const equipesInscritas = inscricoes
          .filter((i) => String(i.eventoId) === String(evento.id))
          .map((i) => equipes.find((eq) => String(eq.id) === String(i.equipeId)))
          .filter((eq): eq is Equipe => !!eq);

        return { ...evento, equipesInscritas };
      });
  };

  const eventosFiltrados = getEventosComEquipes();
  const totalPaginas = Math.ceil(eventosFiltrados.length / itemsPerPage);
  const eventosPaginados = eventosFiltrados.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <ContentWrapper>
        <TableWrapper>
          <Header>
            <Title>Eventos e Inscrições</Title>
            <Actions>
              <SearchInput
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </Actions>
          </Header>

          <TableContainer>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '16px' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    height: '200px',
                    background: '#f5f5f5',
                    borderRadius: '8px',
                    animation: 'pulse 1.5s infinite'
                  }} />
                ))}
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                padding: '16px'
              }}>
                {eventosPaginados.map((evento) => (
                  <EventoCard key={evento.id} evento={evento} />
                ))}
              </div>
            )}
          </TableContainer>

          {eventosFiltrados.length > 0 && (
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </PageButton>
              {Array.from({ length: totalPaginas }, (_, i) => (
                <PageNumber
                  key={i + 1}
                  active={page === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PageNumber>
              ))}
              <PageButton
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPaginas}
              >
                Próxima
              </PageButton>
            </Pagination>
          )}
        </TableWrapper>
      </ContentWrapper>
    </Container>
  );
}