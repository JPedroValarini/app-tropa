import { useEffect, useState } from "react";
import { getEventos } from "../../services/service";
import { getEquipes } from "../../services/equipesService";
import { getInscricoes, deleteInscricao, createInscricao } from "../../services/inscricoesService";
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
  PageNumber,
  ModalOverlay,
  ModalContent
} from "../../styles/MainStyles";
import EventoCard from "../../components/EventoCard";

type Evento = {
  id: number | string;
  nome: string;
  data?: string;
  status?: 'ativo' | 'encerrado';
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
  const [showAdicionarEquipe, setShowAdicionarEquipe] = useState(false);
  const [eventoParaAdicionar, setEventoParaAdicionar] = useState<EventoComEquipes | null>(null);
  const [equipeSelecionada, setEquipeSelecionada] = useState<string>("");

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
          status: 'ativo' | 'encerrado';
        }

        const eventosCompletos: EventoCompleto[] = eventosData.map((evento: Evento): EventoCompleto => ({
          ...evento,

          data: evento.data ?? '',
          status: (evento.status as 'ativo' | 'encerrado') ?? 'ativo',
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

  const equipesDisponiveis = eventoParaAdicionar
    ? equipes.filter(
      eq => !eventoParaAdicionar.equipesInscritas.some(insc => String(insc.id) === String(eq.id))
    )
    : [];

  const handleOpenAdicionarEquipe = (evento: EventoComEquipes) => {
    setEventoParaAdicionar(evento);
    setEquipeSelecionada("");
    setShowAdicionarEquipe(true);
  };

  const handleAdicionarEquipe = async () => {
    if (!eventoParaAdicionar || !equipeSelecionada) return;
    await createInscricao({
      eventoId: Number(eventoParaAdicionar.id),
      equipeId: Number(equipeSelecionada),
    });
    setShowAdicionarEquipe(false);
    setEventoParaAdicionar(null);
    setEquipeSelecionada("");
    getInscricoes().then(setInscricoes);
  };

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

  const handleRemoverInscricao = async (eventoId: string | number, equipeId: string | number) => {
    const inscricao = inscricoes.find(
      (i) => String(i.eventoId) === String(eventoId) && String(i.equipeId) === String(equipeId)
    );
    if (inscricao) {
      await deleteInscricao(Number(inscricao.id));
      getInscricoes().then(setInscricoes);
    }
  };

  return (
    <Container>
      {showAdicionarEquipe && (
        <ModalOverlay>
          <ModalContent>
            <h3>Adicionar equipe ao evento</h3>
            <div style={{ marginBottom: 12 }}>
              <strong>{eventoParaAdicionar?.nome}</strong>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAdicionarEquipe();
              }}
            >
              <select
                value={equipeSelecionada}
                onChange={e => setEquipeSelecionada(e.target.value)}
                required
                style={{ width: "100%", marginBottom: 16 }}
              >
                <option value="">Selecione a equipe</option>
                {equipesDisponiveis.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.nome}
                  </option>
                ))}
              </select>
              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" disabled={!equipeSelecionada}>
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdicionarEquipe(false);
                    setEventoParaAdicionar(null);
                    setEquipeSelecionada("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      <ContentWrapper>
        <TableWrapper>
          <Header>
            <Title>Eventos e Inscrições</Title>
            <Actions>
              <div style={{ position: "relative" }}>
                <SearchInput
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  style={{
                    paddingLeft: "36px",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#bbb",
                    pointerEvents: "none",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="#bbb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
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
                  <EventoCard key={evento.id} evento={evento} onRemoveEquipe={handleRemoverInscricao} onOpenAdicionarEquipe={() => handleOpenAdicionarEquipe(evento)} />
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