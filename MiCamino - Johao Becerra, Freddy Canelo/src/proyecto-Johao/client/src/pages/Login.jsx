import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const ROLE_ROUTES = {
  admin:      '/admin',
  usuario:    '/usuario',
  profesor:   '/profesor',
  orientador: '/orientador',
  padre:      '/padre',
};

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res  = await login(form.email, form.password);
      const user = res.data.user;
      loginUser(user);
      navigate(ROLE_ROUTES[user.role] || '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow} />
      <div style={styles.card}>
        <button style={styles.back} onClick={() => navigate('/')}>← Volver</button>
        <h2 style={styles.title}>Iniciar sesión</h2>
        <p style={styles.sub}>Accede con tu correo institucional</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Correo electrónico</label>
          <input style={styles.input} type="email" name="email"
            placeholder="correo@email.com" value={form.email} onChange={handleChange} required />
          <label style={styles.label}>Contraseña</label>
          <input style={styles.input} type="password" name="password"
            placeholder="••••••••" value={form.password} onChange={handleChange} required />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar →'}
          </button>
        </form>
        <p style={styles.hint}>
          ¿No tienes cuenta?{' '}
          <span style={styles.link} onClick={() => navigate('/register')}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page:  { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', padding:24, position:'relative', overflow:'hidden' },
  glow:  { position:'fixed', width:700, height:700, borderRadius:'50%', background:'rgba(79,142,247,0.07)', filter:'blur(120px)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', zIndex:0 },
  card:  { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:'48px 40px', width:'100%', maxWidth:440, position:'relative', zIndex:1, boxShadow:'var(--shadow)' },
  back:  { background:'transparent', border:'none', color:'var(--muted)', cursor:'pointer', fontFamily:'var(--font)', fontSize:13, marginBottom:32, padding:0, display:'block' },
  title: { fontSize:28, fontWeight:700, marginBottom:8, letterSpacing:'-0.5px' },
  sub:   { color:'var(--muted)', fontSize:14, marginBottom:32 },
  form:  { display:'flex', flexDirection:'column', gap:12 },
  label: { fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:2 },
  input: { background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', color:'var(--text)', fontFamily:'var(--font)', fontSize:14, outline:'none' },
  error: { color:'var(--danger)', fontSize:13, background:'rgba(248,113,113,0.08)', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(248,113,113,0.2)' },
  btn:   { marginTop:8, background:'var(--accent)', color:'#fff', border:'none', padding:'14px', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer' },
  hint:  { textAlign:'center', color:'var(--muted)', fontSize:13, marginTop:24 },
  link:  { color:'var(--accent)', cursor:'pointer' },
};

export default Login;
