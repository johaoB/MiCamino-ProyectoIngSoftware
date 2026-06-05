// Importamos React.
import React from 'react';
// Importamos componentes de enrutamiento.
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
// Importamos las páginas CRUDL del Módulo A.
import CarrerasCRUD from './pages/CarrerasCRUD';
import IntentosCRUD from './pages/IntentosCRUD';

// Componente raíz: panel de administración del Módulo A con dos CRUDL.
const App = () => {
  return (
    <BrowserRouter>
      {/* Barra superior con marca y navegación */}
      <header className="topbar">
        <h1 className="brand">Mi Camino · Módulo A</h1>
        <span className="subtitle">Orientación Vocacional y Cuestionarios</span>
      </header>

      {/* Navegación entre los dos paneles CRUDL */}
      <nav className="nav">
        <NavLink to="/carreras" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          🎓 Carreras (Maestra)
        </NavLink>
        <NavLink to="/intentos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          📝 Intentos de Cuestionario (Transaccional)
        </NavLink>
      </nav>

      {/* Contenido principal */}
      <main className="content">
        <Routes>
          <Route path="/carreras" element={<CarrerasCRUD />} />
          <Route path="/intentos" element={<IntentosCRUD />} />
          <Route path="*" element={<Navigate to="/carreras" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
