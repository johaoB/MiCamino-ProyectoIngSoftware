// Importamos React para definir el componente de introducción.
import React from 'react';
// Importamos useNavigate para redirección programática.
import { useNavigate } from 'react-router-dom';
// Importamos hook de contexto para resetear flujo al iniciar nuevo test.
import { useResultado } from '../context/ResultadoContext';

// Componente de la página de introducción del test vocacional.
const Introduccion = () => {
  // Hook para navegar a otras rutas.
  const navigate = useNavigate();

  // Obtenemos función que limpia estados previos del flujo.
  const { limpiarFlujo } = useResultado();

  // Manejador del botón iniciar cuestionario.
  const iniciarCuestionario = () => {
    // Limpiamos datos previos para iniciar intento nuevo.
    limpiarFlujo();
    // Navegamos a la página del cuestionario.
    navigate('/cuestionario');
  };

  // Render principal de la pantalla de introducción.
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">Orientación Vocacional - Mi Camino</h1>
        <p className="page-text">
          Este test vocacional te ayudará a descubrir qué carreras de ingeniería se alinean mejor con
          tus intereses, habilidades y estilo de trabajo.
        </p>
        <p className="page-text">
          Las preguntas están diseñadas para identificar afinidad en áreas como computación,
          ingeniería industrial, civil, mecánica, electrónica y ambiental, considerando también
          la demanda actual del mercado laboral.
        </p>
        <p className="page-text">
          Al finalizar, obtendrás un resultado personalizado y recomendaciones de carreras para que
          tomes decisiones más informadas sobre tu futuro académico.
        </p>
        <button type="button" className="btn-primary" onClick={iniciarCuestionario}>
          Iniciar Cuestionario
        </button>
      </div>
    </div>
  );
};

// Exportamos componente para usarlo en rutas.
export default Introduccion;
