import styled from 'styled-components';

type TableMenuProps = {
  onVisualizar?: () => void;
  onEditar?: () => void;
  onRemover?: () => void;
};

export default function TableMenu({ onVisualizar, onEditar, onRemover }: TableMenuProps) {
  return (
    <Menu>
      <MenuItem onClick={onVisualizar}>
        <MenuIcon>👁️</MenuIcon>
        Visualizar
      </MenuItem>
      <MenuItem onClick={onEditar}>
        <MenuIcon>✏️</MenuIcon>
        Editar
      </MenuItem>
      <MenuItem danger onClick={onRemover}>
        <MenuIcon>🗑️</MenuIcon>
        Remover
      </MenuItem>
    </Menu>
  );
}

const Menu = styled.div`
  position: fixed;
  min-width: 150px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  z-index: 10;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 12px 18px;
  font-size: 15px;
  color: ${({ danger }) => (danger ? '#D32F2F' : '#222')};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F6F6F6;
  }
`;

const MenuIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`;