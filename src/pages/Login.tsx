import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    setError('');
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <LogoIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </LogoIcon>
          <LogoTitle>Tropa App</LogoTitle>
          <LogoSubtitle>Faça login para continuar</LogoSubtitle>
        </LogoContainer>

        {error && (
          <ErrorAlert>
            {error}
          </ErrorAlert>
        )}

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              minLength={8}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Entrar
          </SubmitButton>
        </LoginForm>

        <SupportText>
          Problemas para acessar? <SupportLink>Contate o suporte</SupportLink>
        </SupportText>
      </LoginCard>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F6F6F6;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const LogoIcon = styled.div`
  width: 64px;
  height: 64px;
  background: #FEA501;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 2px solid #000000;

  svg {
    width: 32px;
    height: 32px;
    color: #000000;
  }
`;

const LogoTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #000000;
  margin: 0;
`;

const LogoSubtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin-top: 8px;
`;

const ErrorAlert = styled.div`
  padding: 12px;
  background-color: #FFF0F0;
  color: #CC6237;
  border-left: 4px solid #CC6237;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #CC6237;
    box-shadow: 0 0 0 3px rgba(204, 98, 55, 0.1);
  }

  &::placeholder {
    color: #BBBBBB;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #CC6237;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover {
    background: #FEA501;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SupportText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #888888;
  margin-top: 24px;
`;

const SupportLink = styled.a`
  color: #CC6237;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;