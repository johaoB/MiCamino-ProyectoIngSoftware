// Definimos URL base de la API leyendo variable de entorno para flexibilidad.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Función para obtener cuestionario activo desde backend.
export const obtenerCuestionarioActivo = async () => {
  // Hacemos petición GET al endpoint del cuestionario activo.
  const response = await fetch(`${API_URL}/cuestionario/activo`);

  // Si la respuesta no es exitosa, lanzamos error controlado.
  if (!response.ok) {
    throw new Error('No fue posible cargar el cuestionario activo.');
  }

  // Convertimos y retornamos respuesta JSON.
  return response.json();
};

// Función para enviar respuestas y finalizar cuestionario.
export const finalizarCuestionario = async (payload) => {
  // Hacemos petición POST con body JSON al endpoint de finalización.
  const response = await fetch(`${API_URL}/cuestionario/finalizar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  // Si falla, intentamos leer mensaje de backend para mostrarlo en UI.
  if (!response.ok) {
    // Leemos body de error como json o string.
    let mensajeError = 'No fue posible finalizar el cuestionario.';

    try {
      // Intentamos parsear JSON de error.
      const data = await response.json();
      // Si backend envió mensaje específico, lo usamos.
      mensajeError = data.mensaje || mensajeError;
    } catch (error) {
      // Si no se puede parsear json, dejamos mensaje genérico.
      mensajeError = 'Error inesperado al procesar respuestas.';
    }

    // Lanzamos error para manejo en componentes.
    throw new Error(mensajeError);
  }

  // Devolvemos respuesta JSON exitosa.
  return response.json();
};
