// ============================================================
// Módulo A – Orientación Vocacional (Freddy Palacio)
// UNIFICACIÓN: este componente es el antiguo App.jsx del Módulo A.
// Ya no tiene su propio BrowserRouter ni su propio index.js: ahora vive dentro del
// router del Módulo B y se abre desde el botón "Realizar prueba" del panel del estudiante
// (ruta /usuario/prueba/*).
// ============================================================

// Importamos React.
import React from 'react';
// Importamos componentes de enrutamiento (sin BrowserRouter: el router lo provee el Módulo B).
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// Sesión del Módulo B: solo usuarios autenticados pueden entrar a la prueba.
import { useAuth } from '../../context/AuthContext';
// Importamos las páginas CRUDL del Módulo A.
import CarrerasCRUD from './CarrerasCRUD';
import IntentosCRUD from './IntentosCRUD';
// Estilos del Módulo A (encapsulados bajo la clase .modulo-a).
import './moduloA.css';

// Componente raíz del Módulo A: panel con dos CRUDL, accesible desde el panel del estudiante.
const ModuloAPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Si no hay sesión iniciada se regresa al login del Módulo B.
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="modulo-a">
      {/* Barra superior con marca y navegación */}
      <header className="topbar">
        <h1 className="brand">Mi Camino · Módulo A</h1>
        <span className="subtitle">Orientación Vocacional y Cuestionarios</span>
      </header>

      {/* Navegación entre los paneles CRUDL + retorno al panel del estudiante */}
      <nav className="nav">
        <button className="btn" onClick={() => navigate('/usuario')}>← Panel del estudiante</button>
        <NavLink to="/usuario/prueba/carreras" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          🎓 Carreras (Maestra)
        </NavLink>
        <NavLink to="/usuario/prueba/intentos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          📝 Intentos de Cuestionario (Transaccional)
        </NavLink>
        {/* Cuestionario rápido del Módulo B (misma BD, tablas pregunta/opcion_respuesta/respuesta) */}
        <button className="btn" onClick={() => navigate('/usuario', { state: { abrir: 'encuesta' } })}>
          ✍️ Responder cuestionario
        </button>
      </nav>

      {/* Contenido principal */}
      <main className="content">
        <Routes>
          <Route path="carreras" element={<CarrerasCRUD />} />
          <Route path="intentos" element={<IntentosCRUD />} />
          <Route path="*" element={<Navigate to="carreras" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default ModuloAPage;
