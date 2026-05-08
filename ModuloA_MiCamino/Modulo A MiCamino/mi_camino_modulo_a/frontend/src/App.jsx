// Importamos React para construir componentes funcionales.
import React from 'react';
// Importamos componentes de enrutamiento para navegación entre páginas.
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// Importamos provider del contexto para compartir resultados entre vistas.
import { ResultadoProvider } from './context/ResultadoContext';
// Importamos las 4 páginas solicitadas para el flujo del módulo.
import Introduccion from './pages/Introduccion';
import Cuestionario from './pages/Cuestionario';
import Resultados from './pages/Resultados';
import Recomendaciones from './pages/Recomendaciones';

// Componente raíz de la aplicación frontend.
const App = () => {
  // Renderizamos provider y router para habilitar estado global y navegación.
  return (
    <ResultadoProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta inicial de introducción al test. */}
          <Route path="/" element={<Introduccion />} />
          {/* Ruta para responder preguntas del cuestionario. */}
          <Route path="/cuestionario" element={<Cuestionario />} />
          {/* Ruta para mostrar resultado principal calculado. */}
          <Route path="/resultados" element={<Resultados />} />
          {/* Ruta para mostrar recomendaciones de carreras top. */}
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          {/* Redirección de rutas no encontradas hacia inicio. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ResultadoProvider>
  );
};

// Exportamos App para montarla en index.js.
export default App;
