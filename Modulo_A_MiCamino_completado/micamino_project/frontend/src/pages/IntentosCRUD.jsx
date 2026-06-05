// ============================================================
// VISTA CRUDL: Intento_Cuestionario (tabla TRANSACCIONAL)
// CRUDL completo con relaciones FK visibles mediante dropdowns:
//   - id_estudiante  -> dropdown de estudiantes
//   - id_cuestionario -> dropdown de cuestionarios
// ============================================================

import React, { useEffect, useState } from 'react';
import { intentosApi, obtenerEstudiantes, obtenerCuestionarios } from '../services/api';

// Estado inicial del formulario.
const FORM_VACIO = {
  id_estudiante: '',
  id_cuestionario: '',
  fecha_inicio: '',
  fecha_fin: '',
  estado: 'EN_PROGRESO'
};

const IntentosCRUD = () => {
  const [intentos, setIntentos] = useState([]);
  // Catálogos para los dropdowns de llaves foráneas.
  const [estudiantes, setEstudiantes] = useState([]);
  const [cuestionarios, setCuestionarios] = useState([]);

  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Carga intentos + catálogos FK.
  const cargar = async () => {
    setCargando(true);
    try {
      const [lista, ests, cuests] = await Promise.all([
        intentosApi.listar(),
        obtenerEstudiantes(),
        obtenerCuestionarios()
      ]);
      setIntentos(lista);
      setEstudiantes(ests);
      setCuestionarios(cuests);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Envía el formulario (crear/actualizar).
  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    try {
      const payload = { ...form };
      // Normalizamos fechas vacías a null.
      if (!payload.fecha_fin) payload.fecha_fin = null;
      if (!payload.fecha_inicio) payload.fecha_inicio = null;

      if (editandoId) {
        const r = await intentosApi.actualizar(editandoId, payload);
        setMensaje(r.mensaje);
      } else {
        const r = await intentosApi.crear(payload);
        setMensaje(r.mensaje);
      }
      setForm(FORM_VACIO);
      setEditandoId(null);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  // Formatea una fecha ISO al formato del input datetime-local.
  const aLocal = (iso) => (iso ? iso.slice(0, 16) : '');

  const editar = (i) => {
    setEditandoId(i.id_intento);
    setForm({
      id_estudiante: String(i.id_estudiante),
      id_cuestionario: String(i.id_cuestionario),
      fecha_inicio: aLocal(i.fecha_inicio),
      fecha_fin: aLocal(i.fecha_fin),
      estado: i.estado || 'EN_PROGRESO'
    });
    setMensaje(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelar = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este intento?')) return;
    setMensaje(null);
    setError(null);
    try {
      const r = await intentosApi.eliminar(id);
      setMensaje(r.mensaje);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  // Da formato legible a una fecha.
  const fmt = (iso) => (iso ? new Date(iso).toLocaleString('es-CO') : '—');

  return (
    <section>
      <h2 className="page-title">
        Gestión de Intentos de Cuestionario <span className="badge transaccional">TRANSACCIONAL</span>
      </h2>
      <p className="hint">
        Esta tabla transaccional muestra relaciones FK: <strong>estudiante</strong> y <strong>cuestionario</strong> se
        seleccionan mediante listas desplegables. Regla de negocio: máx. 3 intentos por estudiante por día.
      </p>

      {mensaje && <div className="alert ok">{mensaje}</div>}
      {error && <div className="alert err">{error}</div>}

      <form className="card form" onSubmit={onSubmit}>
        <h3>{editandoId ? `Editar intento #${editandoId}` : 'Nuevo intento'}</h3>
        <div className="grid">
          {/* Dropdown FK estudiante */}
          <label>Estudiante (FK) *
            <select name="id_estudiante" value={form.id_estudiante} onChange={onChange} required>
              <option value="">-- Seleccione un estudiante --</option>
              {estudiantes.map((e) => (
                <option key={e.id_estudiante} value={e.id_estudiante}>
                  {e.nombre_completo} (grado {e.grado}{e.grupo ? '-' + e.grupo : ''})
                </option>
              ))}
            </select>
          </label>

          {/* Dropdown FK cuestionario */}
          <label>Cuestionario (FK) *
            <select name="id_cuestionario" value={form.id_cuestionario} onChange={onChange} required>
              <option value="">-- Seleccione un cuestionario --</option>
              {cuestionarios.map((c) => (
                <option key={c.id_cuestionario} value={c.id_cuestionario}>
                  {c.nombre} (v{c.version} · {c.estado})
                </option>
              ))}
            </select>
          </label>

          <label>Fecha de inicio
            <input type="datetime-local" name="fecha_inicio" value={form.fecha_inicio} onChange={onChange} />
          </label>
          <label>Fecha de fin
            <input type="datetime-local" name="fecha_fin" value={form.fecha_fin} onChange={onChange} />
          </label>
          <label>Estado
            <select name="estado" value={form.estado} onChange={onChange}>
              <option value="EN_PROGRESO">EN_PROGRESO</option>
              <option value="FINALIZADO">FINALIZADO</option>
              <option value="ABANDONADO">ABANDONADO</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <button type="submit" className="btn primary">{editandoId ? 'Actualizar' : 'Crear'}</button>
          {editandoId && <button type="button" className="btn" onClick={cancelar}>Cancelar</button>}
        </div>
      </form>

      <div className="card">
        <h3>Listado de intentos {cargando && <small>(cargando…)</small>}</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estudiante (FK)</th>
                <th>Cuestionario (FK)</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {intentos.length === 0 && (
                <tr><td colSpan={7} className="empty">Sin registros</td></tr>
              )}
              {intentos.map((i) => (
                <tr key={i.id_intento}>
                  <td>{i.id_intento}</td>
                  <td>{i.nombre_estudiante} <span className="fk">#{i.id_estudiante}</span></td>
                  <td>{i.nombre_cuestionario} <span className="fk">#{i.id_cuestionario}</span></td>
                  <td>{fmt(i.fecha_inicio)}</td>
                  <td>{fmt(i.fecha_fin)}</td>
                  <td><span className={'estado ' + i.estado}>{i.estado}</span></td>
                  <td className="row-actions">
                    <button className="btn sm" onClick={() => editar(i)}>Editar</button>
                    <button className="btn sm danger" onClick={() => eliminar(i.id_intento)}>Eliminar</button>
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

export default IntentosCRUD;
