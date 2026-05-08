// Importamos utilidades de React para crear contexto global.
import React, { createContext, useContext, useMemo, useState } from 'react';

// Creamos contexto para compartir resultado entre páginas sin props drilling.
const ResultadoContext = createContext(null);

// Componente proveedor que envuelve toda la aplicación.
export const ResultadoProvider = ({ children }) => {
  // Estado que guarda resultado del cuestionario finalizado.
  const [resultado, setResultado] = useState(null);

  // Estado que guarda resumen de respuestas seleccionadas (opcional para depuración UI).
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);

  // Función para limpiar contexto y permitir nuevo test.
  const limpiarFlujo = () => {
    // Reiniciamos resultado principal.
    setResultado(null);
    // Reiniciamos respuestas seleccionadas.
    setRespuestasSeleccionadas([]);
  };

  // Memoizamos valor para evitar renders innecesarios de consumidores.
  const value = useMemo(
    () => ({
      resultado,
      setResultado,
      respuestasSeleccionadas,
      setRespuestasSeleccionadas,
      limpiarFlujo
    }),
    [resultado, respuestasSeleccionadas]
  );

  // Renderizamos provider con el value compartido.
  return <ResultadoContext.Provider value={value}>{children}</ResultadoContext.Provider>;
};

// Hook personalizado para consumir el contexto de forma simple.
export const useResultado = () => {
  // Leemos el contexto actual.
  const context = useContext(ResultadoContext);

  // Validamos uso correcto dentro del provider.
  if (!context) {
    throw new Error('useResultado debe usarse dentro de ResultadoProvider');
  }

  // Retornamos el contexto disponible.
  return context;
};
