import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import Eventos from './pages/dashboard/Eventos';
import Equipes from './pages/dashboard/Equipes';
import Inscricoes from './pages/dashboard/Inscricoes';
import GlobalStyle from './GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
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
  </React.StrictMode>
);