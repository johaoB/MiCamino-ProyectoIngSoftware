// Importamos React para construir el componente.
import React from 'react';
// Importamos navegación para movernos al siguiente paso o volver al inicio.
import { useNavigate } from 'react-router-dom';
// Importamos contexto para acceder al resultado calculado.
import { useResultado } from '../context/ResultadoContext';

// Componente de la página de resultados principales.
const Resultados = () => {
  // Hook de navegación entre rutas.
  const navigate = useNavigate();

  // Obtenemos resultado guardado por la pantalla de cuestionario.
  const { resultado } = useResultado();

  // Si no hay resultado, evitamos acceso directo y redirigimos al inicio.
  if (!resultado) {
    return (
      <div className="page-container">
        <div className="card">
          <div className="state-message error">
            No hay resultados disponibles. Primero debes completar el cuestionario.
          </div>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  // Render de la pantalla de resultados con afinidad principal.
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">Tu Resultado Vocacional</h1>
        <h2>
          {resultado.areaPrincipal} - {resultado.porcentajePrincipal}%
        </h2>
        <p className="page-text">{resultado.explicacionPersonalizada}</p>

        <h3>Desglose por áreas</h3>
        <ul>
          {resultado.afinidades?.map((afinidad) => (
            <li key={afinidad.idArea}>
              {afinidad.nombreArea}: {afinidad.porcentajeAfinidad}%
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate('/recomendaciones')}
        >
          Ver Recomendaciones de Carreras
        </button>
      </div>
    </div>
  );
};

// Exportamos componente.
export default Resultados;
