
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
  FiGrid
} from 'react-icons/fi';
import tropaLogo from '../assets/tropa-logo.png';
import userImg from '../assets/user.png';
import presonSvg from '../assets/person.svg';
import teamSvg from '../assets/team.svg';
import eventosSvg from '../assets/eventos.svg';
import power from '../assets/power.svg';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { path: '/dashboard/eventos', label: 'Eventos', icon: <img src={eventosSvg} alt="Eventos" /> },
    { path: '/dashboard/equipes', label: 'Equipes', icon: <img src={teamSvg} alt="Equipes" /> },
    { path: '/dashboard/inscricoes', label: 'Inscrições', icon: <img src={presonSvg} alt="Inscrições" /> },
  ];

  return (
    <Container>
      <Sidebar>
        <TopSection>
          <LogoImg src={tropaLogo} alt="Tropa App Logo" />
        </TopSection>

        <MiddleSection>
          <Menu>
            <MenuLabel>Menu</MenuLabel>
            {menuItems.map(({ path, label, icon }) => (
              <MenuItem key={path} to={path} $active={location.pathname === path}>
                {icon}
                <span>{label}</span>
              </MenuItem>
            ))}
          </Menu>
        </MiddleSection>

        <BottomSection>
          <UserInfoWrapper>
            <Avatar src={userImg} alt="Usuário" />
            <UserInfo>
              <UserName>Romário</UserName>
              <UserRole>Administrador</UserRole>
            </UserInfo>
          </UserInfoWrapper>

          <FooterLinks>
            <FooterButton>
              <img src={presonSvg} alt="Alterar Dados" style={{ width: 14, height: 14, filter: 'brightness(0) saturate(100%)' }} />
              <span>Alterar Dados</span>
            </FooterButton>
            <FooterButton onClick={() => navigate('/')}>
              <img src={power} alt="Sair" style={{ width: 14, height: 14, filter: 'brightness(0) saturate(100%)', transform: 'rotate(-90deg)' }} />
              <span>Sair</span>
            </FooterButton>
          </FooterLinks>
        </BottomSection>
      </Sidebar>

      <MainContent>
        <PageHeader>
          <Outlet />
        </PageHeader>
      </MainContent>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #F6F6F6;
`;

const Sidebar = styled.aside`
  width: 240px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #EEE;
`;

const TopSection = styled.div`
  padding: 24px;
`;

const MiddleSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
`;

const BottomSection = styled.div`
  padding: 16px;
  border-top: 1px solid #EEE;
  background: #FAFAFA;
`;

const LogoImg = styled.img`
  width: 100%;
  height: auto;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const MenuLabel = styled.span`
  color: #A3A3A3;
  font-size: 9px;
  font-weight: 600;
  margin: 0 0 9px 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const MenuItem = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0 10px 16px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#333333')};
  background: ${({ $active }) => ($active ? '#CC6237' : 'transparent')};
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 7px;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({ $active }) => ($active ? '#CC6237' : '#F6F6F6')};
  }

  svg {
    width: 16px;
    height: 16px;
  }

  img {
    width: 16px;
    height: 16px;
    filter: ${({ $active }) =>
    $active
      ? 'brightness(0) invert(1)'
      : 'brightness(0) saturate(100%)'};
    transition: filter 0.2s;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #CC6237;
  overflow: hidden;
  background: #fff;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.strong`
  font-size: 14px;
  color: #333;
`;

const UserRole = styled.small`
  font-size: 12px;
  color: #888;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px;
  color: #252525;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #CC6237;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  max-width: 80%;
  gap: 8px;
  color: #333;
  font-size: 20px;
  font-weight: 600;

  svg {
    cursor: pointer;
  }
`;