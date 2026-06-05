import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfesorPage = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  return (
    <div style={s.page}>
      <div style={s.glow} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Profesor</em></span>}
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.btn2} onClick={() => { logoutUser(); navigate('/'); }}>Salir</button>
        </div>
      </header>

      <main style={s.main}>
        <div style={s.iconBox}><span style={{fontSize:40}}>📚</span></div>
        <h1 style={s.title}>Panel de <span style={{color:'#f59e0b'}}>Profesor</span></h1>
        <p style={s.sub}>
          Bienvenido/a, <strong>{user?.name}</strong>.
        </p>

        <div style={s.grid}>
          {/* Institución */}
          <div style={{...s.card, borderColor:'#f59e0b30'}}>
            <p style={s.cardLabel}>🏫 Institución</p>
            <p style={s.cardValue}>{user?.institucion || 'No asignada'}</p>
          </div>

          <div style={s.card}>
            <p style={s.cardLabel}>Rol activo</p>
            <p style={s.cardValue}>Profesor</p>
          </div>

          <div style={s.card}>
            <p style={s.cardLabel}>Correo</p>
            <p style={s.cardValue}>{user?.email || '—'}</p>
          </div>

          <div style={s.card}>
            <p style={s.cardLabel}>Estado</p>
            <p style={{...s.cardValue, color:'var(--success)'}}>● Activo</p>
          </div>
        </div>

        <div style={s.infoBox}>
          <p style={s.infoTitle}>📋 Funcionalidades disponibles</p>
          <ul style={s.infoList}>
            <li>Consultar listado de estudiantes de tu institución</li>
            <li>Revisar resultados de encuestas vocacionales</li>
            <li>Coordinar con orientadores del plantel</li>
          </ul>
          <p style={s.infoNote}>Estas secciones estarán disponibles en próximas versiones.</p>
        </div>
      </main>
    </div>
  );
};

const s = {
  page:    { minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)', position:'relative', overflow:'hidden' },
  glow:    { position:'fixed', width:600, height:600, borderRadius:'50%', background:'rgba(245,158,11,0.07)', filter:'blur(120px)', top:-100, right:-100, zIndex:0, pointerEvents:'none' },
  header:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:    { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:     { color:'var(--accent)' },
  headerR: { display:'flex', alignItems:'center', gap:12 },
  userTag: { fontSize:13, color:'var(--muted)' },
  btn2:    { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:    { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox: { width:80, height:80, borderRadius:18, border:'1px solid #f59e0b30', background:'#f59e0b12', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:   { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:     { color:'var(--muted)', fontSize:15, marginBottom:36 },
  grid:    { display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', marginBottom:32 },
  card:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'22px 28px', minWidth:160, textAlign:'left' },
  cardLabel:{ fontSize:12, color:'var(--muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:1 },
  cardValue:{ fontSize:15, fontWeight:600 },
  infoBox: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 32px', maxWidth:500, textAlign:'left' },
  infoTitle:{ fontSize:15, fontWeight:600, marginBottom:14 },
  infoList: { paddingLeft:20, color:'var(--muted)', fontSize:14, lineHeight:2 },
  infoNote: { fontSize:12, color:'var(--muted)', marginTop:14, fontStyle:'italic', fontFamily:'var(--mono)' },
};

export default ProfesorPage;
