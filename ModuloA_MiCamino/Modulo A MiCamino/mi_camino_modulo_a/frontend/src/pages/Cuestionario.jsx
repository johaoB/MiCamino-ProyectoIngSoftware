// Importamos React y hooks para estado y ciclo de vida.
import React, { useEffect, useMemo, useState } from 'react';
// Importamos useNavigate para avanzar a página de resultados.
import { useNavigate } from 'react-router-dom';
// Importamos servicios de API para cargar y finalizar cuestionario.
import { finalizarCuestionario, obtenerCuestionarioActivo } from '../services/api';
// Importamos contexto para persistir resultado en memoria del frontend.
import { useResultado } from '../context/ResultadoContext';

// Componente principal de la página de cuestionario.
const Cuestionario = () => {
  // Hook de navegación para redirecciones entre pantallas.
  const navigate = useNavigate();

  // Obtenemos setters del contexto para guardar resultado y respuestas.
  const { setResultado, respuestasSeleccionadas, setRespuestasSeleccionadas } = useResultado();

  // Estado para guardar cuestionario completo recibido del backend.
  const [cuestionario, setCuestionario] = useState(null);

  // Estado para controlar índice de pregunta visible actualmente.
  const [indicePregunta, setIndicePregunta] = useState(0);

  // Estado para manejar mensaje de error en UI.
  const [error, setError] = useState('');

  // Estado para indicar si estamos cargando datos del backend.
  const [cargando, setCargando] = useState(true);

  // Estado para bloquear botón mientras enviamos respuestas al backend.
  const [enviando, setEnviando] = useState(false);

  // Efecto para consultar cuestionario activo una sola vez al abrir la página.
  useEffect(() => {
    // Definimos función async interna para poder usar await en useEffect.
    const cargarCuestionario = async () => {
      try {
        // Activamos indicador de carga.
        setCargando(true);
        // Limpiamos errores previos.
        setError('');
        // Solicitamos cuestionario activo al backend.
        const data = await obtenerCuestionarioActivo();
        // Guardamos cuestionario en estado local.
        setCuestionario(data);
      } catch (err) {
        // Guardamos mensaje de error legible.
        setError(err.message || 'Error al cargar el cuestionario.');
      } finally {
        // Quitamos estado de carga al finalizar.
        setCargando(false);
      }
    };

    // Ejecutamos función de carga inicial.
    cargarCuestionario();
  }, []);

  // Derivamos pregunta actual de forma memoizada para lectura clara.
  const preguntaActual = useMemo(() => {
    // Si no hay cuestionario, retornamos null para evitar errores.
    if (!cuestionario) {
      return null;
    }

    // Retornamos la pregunta en la posición del índice actual.
    return cuestionario.preguntas[indicePregunta] || null;
  }, [cuestionario, indicePregunta]);

  // Calculamos progreso porcentual para la barra visual.
  const progresoPorcentaje = useMemo(() => {
    // Si no hay cuestionario, el progreso es 0.
    if (!cuestionario?.preguntas?.length) {
      return 0;
    }

    // Calculamos porcentaje basado en pregunta actual (1-indexed).
    return Math.round(((indicePregunta + 1) / cuestionario.preguntas.length) * 100);
  }, [cuestionario, indicePregunta]);

  // Función para seleccionar una opción de la pregunta actual.
  const seleccionarOpcion = (idPregunta, idOpcion) => {
    // Actualizamos respuestas previas de manera inmutable.
    setRespuestasSeleccionadas((prev) => {
      // Filtramos respuesta previa de la misma pregunta para reemplazarla.
      const sinPreguntaActual = prev.filter((r) => r.idPregunta !== idPregunta);
      // Retornamos arreglo con nueva selección de la pregunta actual.
      return [...sinPreguntaActual, { idPregunta, idOpcion }];
    });
  };

  // Función para saber si la pregunta actual ya tiene opción seleccionada.
  const obtenerOpcionSeleccionada = (idPregunta) => {
    // Buscamos respuesta por id de pregunta.
    const respuesta = respuestasSeleccionadas.find((r) => r.idPregunta === idPregunta);
    // Retornamos id de opción o null si no existe.
    return respuesta ? respuesta.idOpcion : null;
  };

  // Acción para pasar a la siguiente pregunta.
  const siguientePregunta = () => {
    // Si no estamos en la última pregunta, avanzamos índice +1.
    if (cuestionario && indicePregunta < cuestionario.preguntas.length - 1) {
      setIndicePregunta((prev) => prev + 1);
    }
  };

  // Acción para regresar a la pregunta anterior.
  const preguntaAnterior = () => {
    // Si no estamos en la primera pregunta, retrocedemos índice -1.
    if (indicePregunta > 0) {
      setIndicePregunta((prev) => prev - 1);
    }
  };

  // Acción final para enviar respuestas y cerrar intento.
  const terminar = async () => {
    // Validamos que todas las preguntas estén contestadas.
    if (respuestasSeleccionadas.length !== cuestionario.preguntas.length) {
      setError('Debes responder todas las preguntas antes de terminar.');
      return;
    }

    try {
      // Activamos estado de envío para bloquear UI.
      setEnviando(true);
      // Limpiamos errores previos.
      setError('');

      // Enviamos payload al backend para cálculo de resultados.
      const data = await finalizarCuestionario({
        idCuestionario: cuestionario.idCuestionario,
        nombreParticipante: 'Participante Demo',
        respuestas: respuestasSeleccionadas
      });

      // Guardamos resultado en contexto para usarlo en siguientes páginas.
      setResultado(data.resultado);

      // Redirigimos a pantalla de resultados.
      navigate('/resultados');
    } catch (err) {
      // Mostramos mensaje de error en caso de fallo de API.
      setError(err.message || 'No fue posible finalizar el cuestionario.');
    } finally {
      // Quitamos estado de envío.
      setEnviando(false);
    }
  };

  // Si está cargando, mostramos mensaje de carga.
  if (cargando) {
    return (
      <div className="page-container">
        <div className="card">
          <div className="state-message info">Cargando cuestionario...</div>
        </div>
      </div>
    );
  }

  // Si ocurrió error al cargar y no hay cuestionario, mostramos fallback.
  if (!cuestionario) {
    return (
      <div className="page-container">
        <div className="card">
          <div className="state-message error">{error || 'No hay cuestionario disponible.'}</div>
          <button type="button" className="btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Determinamos si estamos en la última pregunta para cambiar CTA.
  const esUltimaPregunta = indicePregunta === cuestionario.preguntas.length - 1;

  // Obtenemos opción seleccionada de la pregunta visible.
  const opcionSeleccionadaActual = obtenerOpcionSeleccionada(preguntaActual.idPregunta);

  // Render principal de la página cuestionario.
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">{cuestionario.titulo}</h1>
        <p className="page-text">
          Pregunta {indicePregunta + 1} de {cuestionario.preguntas.length}
        </p>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progresoPorcentaje}%` }} />
        </div>

        {error && <div className="state-message error">{error}</div>}

        <h3>{preguntaActual.enunciado}</h3>

        <div className="options-list">
          {preguntaActual.opciones.map((opcion) => {
            // Evaluamos si esta opción está seleccionada para aplicar estilo.
            const selected = opcion.idOpcion === opcionSeleccionadaActual;

            // Renderizamos opción clickeable.
            return (
              <button
                key={opcion.idOpcion}
                type="button"
                className={`option-item ${selected ? 'selected' : ''}`}
                onClick={() => seleccionarOpcion(preguntaActual.idPregunta, opcion.idOpcion)}
              >
                {opcion.textoOpcion}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={preguntaAnterior}
            disabled={indicePregunta === 0 || enviando}
          >
            Anterior
          </button>

          {!esUltimaPregunta && (
            <button
              type="button"
              className="btn-primary"
              onClick={siguientePregunta}
              disabled={!opcionSeleccionadaActual || enviando}
            >
              Siguiente
            </button>
          )}

          {esUltimaPregunta && (
            <button
              type="button"
              className="btn-primary"
              onClick={terminar}
              disabled={!opcionSeleccionadaActual || enviando}
            >
              {enviando ? 'Procesando...' : 'Terminar Cuestionario'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Exportamos componente para sistema de rutas.
export default Cuestionario;
