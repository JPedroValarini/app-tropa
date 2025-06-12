import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  padding: 18px;
`;

export const WelcomeText = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 400;
  letter-spacing: 0.2px;

  strong {
    color: #333;
    font-weight: 600;
  }
`;

export const Title = styled.h1`
  color: #CC6237;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const Spacer = styled.div<{ size?: number }>`
  height: ${({ size }) => size || 16}px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  padding: 12px 20px;
  border-radius: 22px;
  border: 1px solid #E0E0E0;
  width: 280px;
  max-width: 100%;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #CC6237;
    box-shadow: 0 0 0 3px rgba(204, 98, 55, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const NewButton = styled.button`
  background-color: #CC6237;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 22px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TableWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  background: #fff;
  max-width: 98vw;
`;

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0 0 0 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
`;

export const TableBody = styled.tbody`
  tr:last-child td {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.2s ease;

  &:hover {
    background-color: rgb(251, 251, 251);
    cursor: pointer;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
`;

export const TableHead = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 17px;
  font-weight: 400;
  color: #cc481380;
  position: relative;
`;

export const TableCell = styled.td<{ primary?: boolean }>`
  padding: 16px 24px;
  color: ${({ primary }) => (primary ? '#000000' : '#555')};
  font-weight: ${({ primary }) => (primary ? 400 : 400)};
  font-size: 14px;
  border-bottom: 1px solid #CC62371A;
  transition: color 0.2s ease;
  position: relative;
`;

export const Status = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ active }) => (active ? '#2E7D32' : '#D32F2F')};
  font-size: 14px;
  font-weight: 500;
`;

export const StatusDot = styled.span<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#F44336')};
  box-shadow: 0 0 8px ${({ active }) => (active ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)')};
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #CC6237;
  transition: all 0.3s ease;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #CC6237;
    background-color: #FFF0E6;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 20px 32px 28px 32px;
  background: transparent;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 28px 32px 0 24px;
  background: transparent;
`;

export const PageButton = styled.button`
  padding: 10px 18px;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 22px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #555;

  &:hover {
    border-color: #CC6237;
    color: #ffffff;
    background-color: #CC6237;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled(PageButton) <{ active?: boolean }>`
  ${({ active }) => active && `
    background-color: #CC6237;
    color: white;
    border-color: #CC6237;
    font-weight: 500;
  `}
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);

  h2 {
    margin-top: 0;
    margin-bottom: 18px;
    color: #CC6237;
    font-size: 20px;
  }

  label {
    display: block;
    margin-bottom: 12px;
    color: #333;
    font-size: 15px;
  }

  input, select {
    width: 100%;
    padding: 8px 10px;
    margin-top: 4px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 15px;
    margin-bottom: 8px;
  }

  button {
    padding: 8px 18px;
    border-radius: 6px;
    border: none;
    background: #CC6237;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    font-size: 15px;
    transition: background 0.2s;
  }

  button[type="button"] {
    background: #eee;
    color: #333;
  }
`;

export const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f6f6f6;
  border-radius: 22px;
  padding: 8px 16px;
  margin-top: 4px;
  gap: 8px;
`;

export const CalendarIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  color: #555;
  flex: 1;

  &::placeholder {
    color: #b0b0b0;
    font-size: 15px;
  }
`;