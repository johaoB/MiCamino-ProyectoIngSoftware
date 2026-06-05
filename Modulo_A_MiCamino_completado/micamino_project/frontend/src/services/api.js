// ============================================================
// Servicio de API - Cliente HTTP genérico para el CRUD del Módulo A.
// ============================================================

// URL base de la API (configurable por variable de entorno).
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Función auxiliar que procesa la respuesta y extrae el mensaje de error.
async function procesar(response) {
  if (!response.ok) {
    let mensaje = 'Ocurrió un error al comunicarse con el servidor.';
    try {
      const data = await response.json();
      mensaje = data.mensaje || mensaje;
    } catch (e) {
      /* respuesta sin cuerpo JSON */
    }
    throw new Error(mensaje);
  }
  // 204 sin contenido.
  if (response.status === 204) return null;
  return response.json();
}

// CRUD genérico reutilizable para cualquier recurso REST.
export const crud = (recurso) => ({
  // Listar todos los registros.
  listar: () => fetch(`${API_URL}/${recurso}`).then(procesar),
  // Obtener un registro por id.
  obtener: (id) => fetch(`${API_URL}/${recurso}/${id}`).then(procesar),
  // Crear un registro.
  crear: (data) =>
    fetch(`${API_URL}/${recurso}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(procesar),
  // Actualizar un registro existente.
  actualizar: (id, data) =>
    fetch(`${API_URL}/${recurso}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(procesar),
  // Eliminar un registro.
  eliminar: (id) =>
    fetch(`${API_URL}/${recurso}/${id}`, { method: 'DELETE' }).then(procesar)
});

// Recursos CRUD usados por la interfaz.
export const carrerasApi = crud('carreras');
export const intentosApi = crud('intentos');

// Endpoints auxiliares para poblar dropdowns de llaves foráneas.
export const obtenerEstudiantes = () => fetch(`${API_URL}/estudiantes`).then(procesar);
export const obtenerCuestionarios = () => fetch(`${API_URL}/cuestionarios`).then(procesar);
