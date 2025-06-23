import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FiGrid, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';
import tropaLogo from '../assets/tropa-logo.png';
import userImg from '../assets/user.png';
import presonSvg from '../assets/person.svg';
import teamSvg from '../assets/team.svg';
import eventosSvg from '../assets/eventos.svg';
import power from '../assets/power.svg';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { path: '/dashboard/eventos', label: 'Eventos', icon: <img src={eventosSvg} alt="Eventos" /> },
    { path: '/dashboard/equipes', label: 'Equipes', icon: <img src={teamSvg} alt="Equipes" /> },
    { path: '/dashboard/inscricoes', label: 'Inscrições', icon: <img src={presonSvg} alt="Inscrições" /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container>
      {isMobile && (
        <HamburgerButton onClick={toggleSidebar}>
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </HamburgerButton>
      )}

      <Sidebar $isMobile={isMobile} $sidebarOpen={sidebarOpen}>
        <TopSection>
          <LogoImg src={tropaLogo} alt="Tropa App Logo" />
          {isMobile && (
            <CloseButton onClick={toggleSidebar}>
              <FiArrowLeft size={20} />
            </CloseButton>
          )}
        </TopSection>

        <MiddleSection>
          <Menu>
            <MenuLabel>Menu</MenuLabel>
            {menuItems.map(({ path, label, icon }) => (
              <MenuItem 
                key={path} 
                to={path} 
                $active={location.pathname === path}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
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

      <MainContent $sidebarOpen={sidebarOpen} $isMobile={isMobile}>
        <PageHeader>
          <Outlet />
        </PageHeader>
      </MainContent>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && <Overlay onClick={toggleSidebar} />}
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #F6F6F6;
  position: relative;
`;

const Sidebar = styled.aside<{ $isMobile: boolean; $sidebarOpen: boolean }>`
  width: 240px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #EEE;
  transition: transform 0.3s ease;
  z-index: 100;
  
  ${({ $isMobile, $sidebarOpen }) =>
    $isMobile &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      transform: ${$sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
      box-shadow: ${$sidebarOpen ? '2px 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
    `}
`;

const TopSection = styled.div`
  padding: 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const MenuItem = styled(Link)<{ $active: boolean }>`
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

const MainContent = styled.main<{ $sidebarOpen: boolean; $isMobile: boolean }>`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
  
  ${({ $isMobile, $sidebarOpen }) =>
    $isMobile &&
    $sidebarOpen &&
    css`
      margin-left: 240px;
    `}
`;

const PageHeader = styled.div`
  max-width: 80%;
  gap: 8px;
  margin-top: 18px;
  color: #333;
  font-size: 20px;
  font-weight: 600;

  svg {
    cursor: pointer;
  }
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #333;
  z-index: 99;
  cursor: pointer;
  display: none;

  @media (max-width: 767px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
`;