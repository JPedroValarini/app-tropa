import { MoreVertical, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import TableMenu from "../../components/TableMenu";
import { getEventos, createEvento } from "../../services/service";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ptBR } from 'date-fns/locale';
import { addDays, format } from 'date-fns';
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
  Status,
  StatusDot,
  ActionButton,
  Pagination,
  PageButton,
  PageNumber,
  ModalOverlay,
  ModalContent,
  CalendarIcon,
  DateInputWrapper,
  DateInput
} from "../../styles/MainStyles";

type Evento = {
  id: number;
  nome: string;
  equipes: number;
  status: string;
  data: string;
};

export default function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [busca, setBusca] = useState('');
  const eventosPorPagina = 4;
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    nome: "",
    equipes: "",
    status: "Ativo",
    data: ""
  });
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const dataFormatada = `${format(range[0].startDate, 'dd/MM/yyyy')} a ${format(range[0].endDate, 'dd/MM/yyyy')}`;


  useEffect(() => {
    getEventos()
      .then(setEventos)
      .catch(() => setEventos([]));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [busca]);

  useEffect(() => {
    setNovoEvento((prev) => ({
      ...prev,
      data: `${format(range[0].startDate, 'dd/MM/yyyy')} a ${format(range[0].endDate, 'dd/MM/yyyy')}`
    }));
  }, [range]);

  function formatarDataIntervalo(start: Date, end: Date) {
    const diaInicio = format(start, "dd");
    const diaFim = format(end, "dd");
    const mes = format(end, "MMMM", { locale: ptBR });
    return `${diaInicio} a ${diaFim} de ${mes.charAt(0).toUpperCase() + mes.slice(1)}`;
  }

  const eventosFiltrados = eventos.filter(e =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);

  const eventosPaginados = eventosFiltrados.slice(
    (page - 1) * eventosPorPagina,
    page * eventosPorPagina
  );

  const handleMenuToggle = (id: number) => {
    setMenuOpenId((prevId) => (prevId === id ? null : id));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPaginas) setPage(newPage);
  };

  return (
    <Container>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Novo Evento</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await createEvento({
                  ...novoEvento,
                  equipes: Number(novoEvento.equipes),
                  data: formatarDataIntervalo(range[0].startDate, range[0].endDate),
                });
                setShowModal(false);
                setNovoEvento({ nome: "", equipes: "", status: "Ativo", data: "" });
                getEventos()
                  .then(setEventos)
                  .catch(() => setEventos([]));
              }}
            >
              <label>
                Nome:
                <input
                  value={novoEvento.nome}
                  onChange={e => setNovoEvento({ ...novoEvento, nome: e.target.value })}
                  required
                />
              </label>
              <label>
                Equipes:
                <input
                  type="number"
                  value={novoEvento.equipes}
                  onChange={e => setNovoEvento({ ...novoEvento, equipes: e.target.value })}
                  required
                />
              </label>
              <label>
                Status:
                <select
                  value={novoEvento.status}
                  onChange={e => setNovoEvento({ ...novoEvento, status: e.target.value })}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Encerrado">Encerrado</option>
                </select>
              </label>
              <label style={{ position: "relative" }}>
                Data:
                <DateInputWrapper>
                  <CalendarIcon
                    onClick={() => setShowPicker((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    aria-label="Abrir calendário"
                  >
                    <svg width="20" height="20" fill="none" stroke="#CC6237" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="16" rx="6" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </CalendarIcon>
                  <DateInput
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={dataFormatada}
                    readOnly
                    onClick={() => setShowPicker((prev) => !prev)}
                    required
                  />
                </DateInputWrapper>
                {showPicker && (
                  <div
                    style={{
                      position: "absolute",
                      top: 60,
                      left: 0,
                      zIndex: 100,
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={item => {
                        const selection = item.selection;
                        setRange([{
                          startDate: selection.startDate ?? new Date(),
                          endDate: selection.endDate ?? new Date(),
                          key: selection.key ?? 'selection'
                        }]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                      locale={ptBR}
                      rangeColors={["#CC6237"]}
                    />
                  </div>
                )}
              </label>
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
      <ContentWrapper>
        <TableWrapper>
          <Header>
            <Title>Eventos</Title>
            <Actions>
              <div style={{ position: "relative" }}>
                <SearchInput
                  placeholder="Buscar eventos"
                  value={busca}
                  onChange={e => setBusca(e.target.value)}
                  style={{ paddingLeft: 36 }}
                />
                <span style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#bbb",
                  pointerEvents: "none"
                }}>
                  <svg width="18" height="18" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
              <NewButton onClick={() => setShowModal(true)}>
                <Plus size={22} color="white" />
                Inserir novo
              </NewButton>
            </Actions>
          </Header>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do evento</TableHead>
                  <TableHead>Total de Equipes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventosPaginados.map((evento) => (
                  <TableRow key={evento.id}>
                    <TableCell primary>{evento.nome}</TableCell>
                    <TableCell>{evento.equipes}</TableCell>
                    <TableCell>
                      <Status active={evento.status === "Ativo"}>
                        <StatusDot active={evento.status === "Ativo"} />
                        {evento.status}
                      </Status>
                    </TableCell>
                    <TableCell>{evento.data}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleMenuToggle(evento.id)}>
                        <MoreVertical size={18} />
                      </ActionButton>
                      {menuOpenId === evento.id && (
                        <TableMenu
                          onVisualizar={() => { }}
                          onEditar={() => { }}
                          onRemover={() => { }}
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
        </TableWrapper>
      </ContentWrapper>
    </Container>
  );
}