import { useEffect, useState } from "react";
import {
  getEquipes,
  createEquipe,
  updateEquipe,
  deleteEquipe,
} from "../../services/equipesService";
import {
  Container,
  ContentWrapper,
  Header,
  Title,
  Actions,
  SearchInput,
  NewButton,
  TableWrapper,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  ActionButton,
  Pagination,
  PageButton,
  PageNumber,
  ModalOverlay,
  ModalContent,
} from "../../styles/MainStyles";
import TableMenu from "../../components/TableMenu";
import { MoreVertical, Plus } from "lucide-react";

type Equipe = {
  id: number;
  nome: string;
  responsavel: string;
  cidade: string;
  status: string;
};

export default function Equipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [busca, setBusca] = useState("");
  const equipesPorPagina = 4;
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [visualizando, setVisualizando] = useState(false);
  const [novaEquipe, setNovaEquipe] = useState({
    nome: "",
    responsavel: "",
    cidade: "",
    status: "Ativa",
  });

  useEffect(() => {
    getEquipes().then(setEquipes).catch(() => setEquipes([]));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [busca]);

  const equipesFiltradas = equipes.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );
  const totalPaginas = Math.ceil(equipesFiltradas.length / equipesPorPagina);
  const equipesPaginadas = equipesFiltradas.slice(
    (page - 1) * equipesPorPagina,
    page * equipesPorPagina
  );

  const handleMenuToggle = (id: number) => {
    setMenuOpenId((prevId) => (prevId === id ? null : id));
  };

  const handleEditar = (equipe: Equipe) => {
    setNovaEquipe({
      nome: equipe.nome,
      responsavel: equipe.responsavel,
      cidade: equipe.cidade,
      status: equipe.status,
    });
    setEditandoId(equipe.id);
    setShowModal(true);
    setVisualizando(false);
  };

  const handleVisualizar = (equipe: Equipe) => {
    setNovaEquipe({
      nome: equipe.nome,
      responsavel: equipe.responsavel,
      cidade: equipe.cidade,
      status: equipe.status,
    });
    setVisualizando(true);
    setShowModal(true);
    setEditandoId(null);
  };

  const handleRemover = async (id: number) => {
    await deleteEquipe(id);
    getEquipes().then(setEquipes);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPaginas) setPage(newPage);
  };

  return (
    <Container>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>
              {visualizando
                ? "Visualizar Equipe"
                : editandoId
                ? "Editar Equipe"
                : "Nova Equipe"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (visualizando) {
                  setShowModal(false);
                  setVisualizando(false);
                  setEditandoId(null);
                  return;
                }
                if (editandoId) {
                  await updateEquipe(editandoId, novaEquipe);
                } else {
                  await createEquipe(novaEquipe);
                }
                setShowModal(false);
                setEditandoId(null);
                setNovaEquipe({
                  nome: "",
                  responsavel: "",
                  cidade: "",
                  status: "Ativa",
                });
                getEquipes().then(setEquipes);
              }}
            >
              <label>
                Nome:
                <input
                  value={novaEquipe.nome}
                  onChange={(e) =>
                    setNovaEquipe({ ...novaEquipe, nome: e.target.value })
                  }
                  required
                  readOnly={visualizando}
                  disabled={visualizando}
                />
              </label>
              <label>
                Responsável:
                <input
                  value={novaEquipe.responsavel}
                  onChange={(e) =>
                    setNovaEquipe({
                      ...novaEquipe,
                      responsavel: e.target.value,
                    })
                  }
                  required
                  readOnly={visualizando}
                  disabled={visualizando}
                />
              </label>
              <label>
                Cidade:
                <input
                  value={novaEquipe.cidade}
                  onChange={(e) =>
                    setNovaEquipe({ ...novaEquipe, cidade: e.target.value })
                  }
                  required
                  readOnly={visualizando}
                  disabled={visualizando}
                />
              </label>
              <label>
                Status:
                <select
                  value={novaEquipe.status}
                  onChange={(e) =>
                    setNovaEquipe({ ...novaEquipe, status: e.target.value })
                  }
                  disabled={visualizando}
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                </select>
              </label>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                {!visualizando && <button type="submit">Salvar</button>}
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setVisualizando(false);
                    setEditandoId(null);
                  }}
                >
                  {visualizando ? "Fechar" : "Cancelar"}
                </button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
      <ContentWrapper>
        <TableWrapper>
          <Header>
            <Title>Equipes</Title>
            <Actions>
              <div style={{ position: "relative" }}>
                <SearchInput
                  placeholder="Buscar equipes"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  style={{ paddingLeft: 36 }}
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
              <NewButton
                onClick={() => {
                  setNovaEquipe({
                    nome: "",
                    responsavel: "",
                    cidade: "",
                    status: "Ativa",
                  });
                  setShowModal(true);
                  setEditandoId(null);
                  setVisualizando(false);
                }}
              >
                <Plus size={22} color="white" />
                Inserir novo
              </NewButton>
            </Actions>
          </Header>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipesPaginadas.map((equipe) => (
                  <TableRow key={equipe.id}>
                    <TableCell $primary>{equipe.nome}</TableCell>
                    <TableCell>{equipe.responsavel}</TableCell>
                    <TableCell>{equipe.cidade}</TableCell>
                    <TableCell>{equipe.status}</TableCell>
                    <TableCell>
                      <ActionButton
                        onClick={() => handleMenuToggle(equipe.id)}
                      >
                        <MoreVertical size={18} />
                      </ActionButton>
                      {menuOpenId === equipe.id && (
                        <TableMenu
                          onVisualizar={() => {
                            handleVisualizar(equipe);
                            setMenuOpenId(null);
                          }}
                          onEditar={() => {
                            handleEditar(equipe);
                            setMenuOpenId(null);
                          }}
                          onRemover={() => {
                            handleRemover(equipe.id);
                            setMenuOpenId(null);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                $active={page === i + 1}
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
        </TableWrapper>
      </ContentWrapper>
    </Container>
  );
};