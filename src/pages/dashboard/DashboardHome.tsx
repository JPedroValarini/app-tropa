import {
  Container,
  WelcomeText,
  Title
} from '../../styles/MainStyles';

export default function DashboardHome() {
  return (
    <Container>
      <WelcomeText>
        Bem vindo de volta, <strong>Kaique Steck</strong>
      </WelcomeText>
      <Title>Dashboard</Title>
    </Container>
  );
}
