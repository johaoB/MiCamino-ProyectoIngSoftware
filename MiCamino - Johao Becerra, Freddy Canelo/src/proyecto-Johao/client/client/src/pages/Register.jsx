import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

// Roles que requieren institución
const ROLES_CON_INST = ['usuario', 'profesor', 'orientador'];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', password: '', role: 'usuario', institucion: '' });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (ROLES_CON_INST.includes(form.role) && !form.institucion.trim())
      return setError('Por favor indica la institución a la que perteneces.');

    setLoading(true);
    try {
      await createUser(form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2200);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const requiereInst = ROLES_CON_INST.includes(form.role);

  return (
    <div style={styles.page}>
      <div style={styles.glow} />
      <div style={styles.card}>
        <button style={styles.back} onClick={() => navigate('/')}>← Volver</button>

        <h2 style={styles.title}>Crear cuenta</h2>
        <p style={styles.sub}>Únete a la plataforma Mi Camino</p>

        {success ? (
          <div style={styles.successBox}>
            <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: 16 }}>✓ Cuenta creada</p>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 8 }}>
              Tu solicitud quedó pendiente de aprobación. Redirigiendo al login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>

            <label style={styles.label}>Nombre completo</label>
            <input style={styles.input} type="text" name="name"
              placeholder="Tu nombre" value={form.name} onChange={handleChange} required />

            <label style={styles.label}>Correo electrónico</label>
            <input style={styles.input} type="email" name="email"
              placeholder="correo@email.com" value={form.email} onChange={handleChange} required />

            <label style={styles.label}>Contraseña</label>
            <input style={styles.input} type="password" name="password"
              placeholder="••••••••" value={form.password} onChange={handleChange} required />

            <label style={styles.label}>Rol</label>
            <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
              <option value="usuario">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="orientador">Orientador</option>
              <option value="padre">Padre / Acudiente</option>
            </select>

            {/* Campo institución — solo visible si el rol lo requiere */}
            {requiereInst && (
              <>
                <label style={styles.label}>
                  Institución educativa
                  <span style={styles.required}> *</span>
                </label>
                <input
                  style={styles.input}
                  type="text"
                  name="institucion"
                  placeholder="Ej: IE San José"
                  value={form.institucion}
                  onChange={handleChange}
                  required
                />
                <p style={styles.fieldNote}>
                  Escribe el nombre exacto de tu institución para poder vincularte con otros usuarios de la misma sede.
                </p>
              </>
            )}

            {error && <p style={styles.error}>{error}</p>}

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear cuenta →'}
            </button>
          </form>
        )}

        <p style={styles.hint}>
          ¿Ya tienes cuenta?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page:  { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:24, position:'relative', overflow:'hidden' },
  glow:  { position:'fixed', width:700, height:700, borderRadius:'50%', background:'rgba(167,139,250,0.07)', filter:'blur(120px)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:0 },
  card:  { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:'48px 40px', width:'100%', maxWidth:440, position:'relative', zIndex:1, boxShadow:'var(--shadow)' },
  back:  { background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--font)', fontSize:13, marginBottom:32, padding:0, display:'block' },
  title: { fontSize:28, fontWeight:700, marginBottom:8, letterSpacing:'-0.5px' },
  sub:   { color:'var(--muted)', fontSize:14, marginBottom:32 },
  form:  { display:'flex', flexDirection:'column', gap:10 },
  label: { fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:2, marginTop:4 },
  required: { color:'var(--danger)' },
  input: { background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', color:'var(--text)', fontFamily:'var(--font)', fontSize:14, outline:'none' },
  fieldNote: { fontSize:11, color:'var(--muted)', marginTop:4, fontStyle:'italic', lineHeight:1.5 },
  error: { color:'var(--danger)', fontSize:13, background:'rgba(248,113,113,0.08)', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(248,113,113,0.2)' },
  btn:   { marginTop:12, background:'var(--accent2)', color:'#fff', border:'none', padding:'14px', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer' },
  successBox: { background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:12, padding:'28px', textAlign:'center', marginBottom:16 },
  hint:  { textAlign:'center', color:'var(--muted)', fontSize:13, marginTop:24 },
  link:  { color:'var(--accent2)', cursor:'pointer' },
};

export default Register;
