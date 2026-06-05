// ============================================================
// VISTA CRUDL: Carrera (tabla MAESTRA)
// Formulario completo Crear / Leer / Actualizar / Eliminar / Listar.
// ============================================================

import React, { useEffect, useState } from 'react';
import { carrerasApi } from '../services/api';

// Estado inicial vacío del formulario.
const FORM_VACIO = {
  nombre: '',
  descripcion: '',
  perfil_profesional: '',
  duracion: '',
  campo_laboral: '',
  nivel_riesgo_automatizacion: ''
};

const CarrerasCRUD = () => {
  // Lista de carreras.
  const [carreras, setCarreras] = useState([]);
  // Datos del formulario.
  const [form, setForm] = useState(FORM_VACIO);
  // Id en edición (null = creando).
  const [editandoId, setEditandoId] = useState(null);
  // Mensajes de feedback.
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Carga la lista de carreras desde la API.
  const cargar = async () => {
    setCargando(true);
    try {
      setCarreras(await carrerasApi.listar());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  // Al montar, cargamos la lista.
  useEffect(() => {
    cargar();
  }, []);

  // Maneja los cambios en los inputs del formulario.
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envía el formulario (crear o actualizar según el modo).
  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      if (editandoId) {
        const r = await carrerasApi.actualizar(editandoId, form);
        setMensaje(r.mensaje);
      } else {
        const r = await carrerasApi.crear(form);
        setMensaje(r.mensaje);
      }
      setForm(FORM_VACIO);
      setEditandoId(null);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  // Carga una carrera en el formulario para editarla.
  const editar = (c) => {
    setEditandoId(c.id_carrera);
    setForm({
      nombre: c.nombre || '',
      descripcion: c.descripcion || '',
      perfil_profesional: c.perfil_profesional || '',
      duracion: c.duracion || '',
      campo_laboral: c.campo_laboral || '',
      nivel_riesgo_automatizacion: c.nivel_riesgo_automatizacion || ''
    });
    setMensaje(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancela la edición y limpia el formulario.
  const cancelar = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
  };

  // Elimina una carrera tras confirmación.
  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta carrera?')) return;
    setMensaje(null);
    setError(null);
    try {
      const r = await carrerasApi.eliminar(id);
      setMensaje(r.mensaje);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h2 className="page-title">Gestión de Carreras <span className="badge maestra">MAESTRA</span></h2>

      {/* Mensajes de feedback */}
      {mensaje && <div className="alert ok">{mensaje}</div>}
      {error && <div className="alert err">{error}</div>}

      {/* Formulario CRUD */}
      <form className="card form" onSubmit={onSubmit}>
        <h3>{editandoId ? `Editar carrera #${editandoId}` : 'Nueva carrera'}</h3>
        <div className="grid">
          <label>Nombre *
            <input name="nombre" value={form.nombre} onChange={onChange} required />
          </label>
          <label>Duración
            <input name="duracion" value={form.duracion} onChange={onChange} placeholder="Ej: 5 años" />
          </label>
          <label className="full">Descripción
            <textarea name="descripcion" value={form.descripcion} onChange={onChange} rows={2} />
          </label>
          <label className="full">Perfil profesional
            <textarea name="perfil_profesional" value={form.perfil_profesional} onChange={onChange} rows={2} />
          </label>
          <label className="full">Campo laboral
            <textarea name="campo_laboral" value={form.campo_laboral} onChange={onChange} rows={2} />
          </label>
          <label>Riesgo de automatización
            <select name="nivel_riesgo_automatizacion" value={form.nivel_riesgo_automatizacion} onChange={onChange}>
              <option value="">-- Seleccione --</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <button type="submit" className="btn primary">{editandoId ? 'Actualizar' : 'Crear'}</button>
          {editandoId && <button type="button" className="btn" onClick={cancelar}>Cancelar</button>}
        </div>
      </form>

      {/* Tabla de listado */}
      <div className="card">
        <h3>Listado de carreras {cargando && <small>(cargando…)</small>}</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Duración</th><th>Campo laboral</th><th>Riesgo IA</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.length === 0 && (
                <tr><td colSpan={6} className="empty">Sin registros</td></tr>
              )}
              {carreras.map((c) => (
                <tr key={c.id_carrera}>
                  <td>{c.id_carrera}</td>
                  <td>{c.nombre}</td>
                  <td>{c.duracion}</td>
                  <td>{c.campo_laboral}</td>
                  <td>{c.nivel_riesgo_automatizacion}</td>
                  <td className="row-actions">
                    <button className="btn sm" onClick={() => editar(c)}>Editar</button>
                    <button className="btn sm danger" onClick={() => eliminar(c.id_carrera)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CarrerasCRUD;
