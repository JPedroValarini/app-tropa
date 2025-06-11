import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import Eventos from './pages/dashboard/Eventos';
import Equipes from './pages/dashboard/Equipes';
import Inscricoes from './pages/dashboard/Inscricoes';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="equipes" element={<Equipes />} />
          <Route path="inscricoes" element={<Inscricoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}