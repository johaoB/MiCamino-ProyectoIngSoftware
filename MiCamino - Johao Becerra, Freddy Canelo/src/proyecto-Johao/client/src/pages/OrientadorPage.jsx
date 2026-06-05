import React, { useState } from 'react';
import PerfilModal from '../components/PerfilModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEstudiantesByInst } from '../services/institucionService';

const OrientadorPage = () => {
  const navigate = useNavigate();
  const { user, loginUser, logoutUser } = useAuth();
  const [showPerfil, setShowPerfil] = useState(false);
  const [vista, setVista]             = useState('home');
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const institucion = user?.institucion;

  const cargarEstudiantes = async () => {
    if (!institucion) return setError('No tienes institución asignada.');
    setLoading(true); setError('');
    try {
      const res = await getEstudiantesByInst(institucion);
      setEstudiantes(res.data);
      setVista('estudiantes');
    } catch { setError('No se pudieron cargar los estudiantes.'); }
    finally { setLoading(false); }
  };

  const handleUpdate = (updated) => {
    loginUser({ ...user, ...updated });
    setShowPerfil(false);
  };
  const handleDelete = () => {
    logoutUser();
    navigate('/');
  };
  const handleLogout = () => { logoutUser(); navigate('/'); };

  return (
    <div style={s.page}>
      <div style={{...s.glow, background: '#a78bfa'}} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Orientador</em></span>}
          <button style={s.btn2} onClick={() => { setVista('home'); setError(''); }}>Panel</button>
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.perfilBtn} onClick={() => setShowPerfil(true)}>👤 Perfil</button>
          <button style={s.btn2} onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main style={s.main}>

        {vista === 'home' && (
          <>
            <div style={{...s.iconBox, borderColor:'#a78bfa20', background:'#a78bfa12'}}>
              <span style={{fontSize:40}}>🧭</span>
            </div>
            <h1 style={s.title}>Panel de <span style={{color:'#a78bfa'}}>Orientador</span></h1>
            <p style={s.sub}>Bienvenido/a, <strong>{user?.name}</strong>.</p>

            <div style={s.infoGrid}>
              <div style={{...s.infoCard, borderColor:'#a78bfa30'}}>
                <p style={s.infoLabel}>🏫 Institución</p>
                <p style={s.infoVal}>{institucion || 'No asignada'}</p>
              </div>
              <div style={s.infoCard}>
                <p style={s.infoLabel}>Rol activo</p>
                <p style={s.infoVal}>Orientador</p>
              </div>
              <div style={s.infoCard}>
                <p style={s.infoLabel}>Correo</p>
                <p style={s.infoVal}>{user?.email || '—'}</p>
              </div>
              <div style={s.infoCard}>
                <p style={s.infoLabel}>Estado</p>
                <p style={{...s.infoVal, color:'var(--success)'}}>● Activo</p>
              </div>
            </div>

            {error && <p style={s.error}>{error}</p>}

            <button style={{...s.primaryBtn, background:'#a78bfa'}} onClick={cargarEstudiantes} disabled={loading}>
              {loading ? 'Cargando...' : '🎓 Ver estudiantes de mi institución →'}
            </button>
          </>
        )}

        {vista === 'estudiantes' && (
          <div style={s.wrap}>
            <div style={s.wrapHeader}>
              <div>
                <h2 style={s.sectionTitle}>Estudiantes</h2>
                <p style={s.instTag}>🏫 {institucion}</p>
              </div>
              <button style={s.btn2} onClick={() => setVista('home')}>← Volver</button>
            </div>

            {estudiantes.length === 0 ? (
              <div style={s.emptyBox}>
                <p style={{fontSize:32}}>📭</p>
                <p style={{color:'var(--muted)', marginTop:8}}>No hay estudiantes activos en esta institución.</p>
              </div>
            ) : (
              estudiantes.map((est) => (
                <div key={est.id} style={s.estCard}>
                  <div style={s.estAvatar}>{est.name.charAt(0).toUpperCase()}</div>
                  <div style={{flex:1}}>
                    <p style={s.estNombre}>{est.name}</p>
                    <p style={s.estEmail}>{est.email}</p>
                    <div style={s.estMeta}>
                      {est.codigoEstudiante && (
                        <span style={s.codeBadge}>{est.codigoEstudiante}</span>
                      )}
                      <span style={s.activoBadge}>● Activo</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </main>
    {showPerfil && (
      <PerfilModal
        user={user}
        onClose={() => setShowPerfil(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    )}
    </div>
  );
};

const s = {
  page:    { minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)', position:'relative', overflow:'hidden' },
  glow:    { position:'fixed', width:600, height:600, borderRadius:'50%', filter:'blur(120px)', top:-100, right:-100, zIndex:0, pointerEvents:'none' },
  header:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:    { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:     { color:'var(--accent)' },
  headerR: { display:'flex', alignItems:'center', gap:12 },
  userTag: { fontSize:13, color:'var(--muted)' },
  perfilBtn: { background:'rgba(167,139,250,0.12)', border:'1px solid rgba(167,139,250,0.3)', color:'var(--accent2)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12, fontWeight:600 },
  btn2:    { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:    { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox: { width:80, height:80, borderRadius:18, border:'1px solid', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:   { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:     { color:'var(--muted)', fontSize:15, marginBottom:24 },
  infoGrid:{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', marginBottom:32 },
  infoCard:{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'20px 26px', minWidth:150, textAlign:'left' },
  infoLabel:{ fontSize:12, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:1 },
  infoVal: { fontSize:15, fontWeight:600 },
  error:   { color:'var(--danger)', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:8, padding:'10px 16px', fontSize:13, marginBottom:16 },
  primaryBtn:{ color:'#fff', border:'none', padding:'13px 28px', borderRadius:10, fontSize:14, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer' },
  // tabla estudiantes
  wrap:       { width:'100%', maxWidth:620, textAlign:'left' },
  wrapHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 },
  sectionTitle:{ fontSize:26, fontWeight:700, letterSpacing:'-0.5px', marginBottom:4 },
  instTag:    { fontSize:13, color:'var(--muted)' },
  emptyBox:   { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'40px', textAlign:'center' },
  estCard:    { display:'flex', gap:14, alignItems:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 20px', marginBottom:10 },
  estAvatar:  { width:42, height:42, borderRadius:10, background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, fontWeight:700, color:'#fff', flexShrink:0 },
  estNombre:  { fontSize:15, fontWeight:600, marginBottom:3 },
  estEmail:   { fontSize:13, color:'var(--muted)', marginBottom:6 },
  estMeta:    { display:'flex', gap:8, alignItems:'center' },
  codeBadge:  { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'2px 10px', borderRadius:100 },
  activoBadge:{ fontSize:11, color:'#34d399' },
};

export default OrientadorPage;
