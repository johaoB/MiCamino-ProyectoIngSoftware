// Importamos React para crear componente.
import React from 'react';
// Importamos useNavigate para navegación entre páginas.
import { useNavigate } from 'react-router-dom';
// Importamos contexto para leer recomendaciones y reiniciar flujo.
import { useResultado } from '../context/ResultadoContext';

// Componente de página final con carreras sugeridas.
const Recomendaciones = () => {
  // Hook para navegación programática.
  const navigate = useNavigate();

  // Leemos resultado y función para limpiar estado del flujo.
  const { resultado, limpiarFlujo } = useResultado();

  // Si usuario entra aquí sin resultado, mostramos mensaje y retorno al inicio.
  if (!resultado) {
    return (
      <div className="page-container">
        <div className="card">
          <div className="state-message error">
            No hay recomendaciones disponibles aún. Completa el cuestionario primero.
          </div>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  // Manejador del botón para nuevo test completo.
  const realizarNuevoTest = () => {
    // Limpiamos contexto para iniciar desde cero.
    limpiarFlujo();
    // Regresamos a introducción.
    navigate('/');
  };

  // Render de recomendaciones top 1-3 carreras.
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">Carreras Recomendadas para Ti</h1>
        <p className="page-text">
          Estas recomendaciones se ordenan según tu afinidad académica y su demanda en el mercado.
        </p>

        <div className="recommendations-grid">
          {resultado.recomendaciones?.slice(0, 3).map((recomendacion) => (
            <article key={recomendacion.idCarrera} className="recommendation-card">
              <h3>{recomendacion.nombreCarrera}</h3>
              <p>{recomendacion.descripcionCarrera}</p>
              <p>{recomendacion.razonRecomendacion}</p>
              <span className="badge">Afinidad: {recomendacion.porcentajeAfinidad}%</span>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="button" className="btn-primary" onClick={realizarNuevoTest}>
            Realizar Nuevo Test
          </button>
        </div>
      </div>
    </div>
  );
};

// Exportamos componente.
export default Recomendaciones;
