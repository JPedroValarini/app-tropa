import { MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import TableMenu from "../../components/TableMenu";
import {
  Container,
  ContentWrapper,
  Header,
  Title,
  Actions,
  SearchInput,
  NewButton,
  Spacer,
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
} from "../../styles/MainStyles";

const eventosMock = [
  {
    id: 1,
    nome: "Clube do Laço Coração Pantaneiro",
    equipes: 10,
    status: "Ativo",
    data: "09 a 11 de Junho",
  },
  {
    id: 2,
    nome: "Clube do Laço Coração Pantaneiro",
    equipes: 10,
    status: "Ativo",
    data: "09 a 11 de Junho",
  },
  {
    id: 3,
    nome: "Festival de Rodeio Nacional",
    equipes: 24,
    status: "Encerrado",
    data: "15 a 18 de Maio",
  },
  {
    id: 4,
    nome: "Campeonato de Laço Comprido",
    equipes: 8,
    status: "Ativo",
    data: "22 a 25 de Julho",
  },
  {
    id: 5,
    nome: "Torneio de Vaquejada Nordestina",
    equipes: 16,
    status: "Ativo",
    data: "05 a 08 de Agosto",
  },
];

export default function Eventos() {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const handleMenuToggle = (id: number) => {
    setMenuOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Eventos</Title>
          <Actions>
            <SearchInput placeholder="Buscar eventos" />
            <NewButton>
              <Plus size={22} color="white" />
              Inserir novo
            </NewButton>
          </Actions>
        </Header>

        <Spacer size={24} />

        <TableWrapper>
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
                {eventosMock.map((evento) => (
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
        </TableWrapper>

        <Spacer size={24} />

        <Pagination>
          <PageButton>Anterior</PageButton>
          <PageNumber active>1</PageNumber>
          <PageNumber>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageButton>Próxima</PageButton>
        </Pagination>
      </ContentWrapper>
    </Container>
  );
}
