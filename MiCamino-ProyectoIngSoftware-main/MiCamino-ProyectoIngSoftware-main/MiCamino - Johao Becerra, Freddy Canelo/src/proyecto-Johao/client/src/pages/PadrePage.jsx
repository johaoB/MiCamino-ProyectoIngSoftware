import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEstudiante } from '../services/padreService';

const PadrePage = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const [vista, setVista]           = useState('home');
  const [estudiante, setEstudiante] = useState(null);
  const [resultado, setResultado]   = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const codigoVinculo = user?.codigoVinculo;

  const cargarEstudiante = async () => {
    setLoading(true); setError('');
    try {
      const res = await getEstudiante(codigoVinculo);
      setEstudiante(res.data.estudiante);
      setResultado(res.data.resultado);
      setVista('estudiante');
    } catch (e) {
      setError(e.response?.data?.message || 'No se pudo conectar con el servidor.');
    }
    finally { setLoading(false); }
  };

  const handleLogout = () => { logoutUser(); navigate('/'); };

  return (
    <div style={s.page}>
      <div style={s.glow} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Padre / Acudiente</em></span>}
          <button style={s.btn2} onClick={() => { setVista('home'); setError(''); }}>Inicio</button>
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.btn2} onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main style={s.main}>

        {/* ── HOME ── */}
        {vista === 'home' && (
          <>
            <div style={s.iconBox}><span style={{fontSize:40}}>👨‍👩‍👧</span></div>
            <h1 style={s.title}>Panel de <span style={{color:'#fb923c'}}>Acudiente</span></h1>
            <p style={s.sub}>
              Bienvenido/a, <strong>{user?.name}</strong>. Desde aquí puedes hacer seguimiento
              al proceso vocacional de tu estudiante.
            </p>

            <div style={s.vinculoBox}>
              <p style={s.vinculoLabel}>🔑 Código de vínculo activo</p>
              <p style={s.vinculoCodigo}>{codigoVinculo || 'No asignado'}</p>
              <p style={s.vinculoDesc}>
                Este código te vincula automáticamente al estudiante registrado con ese código.
              </p>
            </div>

            {error && <p style={s.error}>{error}</p>}

            <button style={s.primaryBtn} onClick={cargarEstudiante} disabled={loading || !codigoVinculo}>
              {loading ? 'Buscando...' : '📋 Ver estudiante vinculado →'}
            </button>
          </>
        )}

        {/* ── DETALLE ESTUDIANTE ── */}
        {vista === 'estudiante' && estudiante && (
          <div style={s.wrap}>
            <h2 style={s.sectionTitle}>Información del estudiante</h2>

            <div style={s.perfilCard}>
              <div style={s.perfilAvatar}>
                {estudiante.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={s.perfilNombre}>{estudiante.name}</p>
                <p style={s.perfilEmail}>{estudiante.email}</p>
                <span style={s.perfilBadge}>{estudiante.codigoEstudiante}</span>
              </div>
            </div>

            {/* Institución si la tiene */}
            {estudiante.institucion && (
              <div style={s.infoRow}>
                <span style={s.infoIcon}>🏫</span>
                <div>
                  <p style={s.infoLabel}>Institución</p>
                  <p style={s.infoVal}>{estudiante.institucion}</p>
                </div>
              </div>
            )}

            {/* Resultado de encuesta */}
            <h3 style={s.subTitle}>Resultado de encuesta vocacional</h3>

            {resultado ? (
              <>
                <div style={s.scoreBox}>
                  <div style={s.scoreCircle}>
                    <span style={s.scoreNum}>{resultado.porcentaje}%</span>
                    <span style={s.scoreLabel}>acierto</span>
                  </div>
                  <div>
                    <p style={s.scorePts}>{resultado.puntaje} / {resultado.total} correctas</p>
                    <p style={s.scoreFecha}>Realizada el {resultado.fecha}</p>
                    <p style={{
                      ...s.scoreEstado,
                      color: resultado.porcentaje >= 66 ? '#34d399' : resultado.porcentaje >= 33 ? '#f59e0b' : '#f87171'
                    }}>
                      {resultado.porcentaje >= 66 ? '✅ Buen desempeño' : resultado.porcentaje >= 33 ? '⚠️ Desempeño regular' : '❌ Necesita refuerzo'}
                    </p>
                  </div>
                </div>

                <div style={s.detalleList}>
                  {resultado.detalle.map((d, i) => (
                    <div key={i} style={{...s.detalleCard, borderColor: d.correcta ? '#34d39930' : '#f8717130'}}>
                      <span style={{fontSize:16}}>{d.correcta ? '✅' : '❌'}</span>
                      <div style={{flex:1}}>
                        <p style={s.detallePregunta}>{d.pregunta}</p>
                        <p style={s.detalleRespuesta}>
                          Respondió: <em>{d.opcionElegida}</em>
                        </p>
                        <p style={{...s.detalleFeedback, color: d.correcta ? '#34d399' : '#f87171'}}>
                          {d.feedback}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={s.sinResultado}>
                <p style={{fontSize:32}}>📭</p>
                <p style={{color:'var(--muted)', marginTop:8}}>
                  El estudiante aún no ha completado ninguna encuesta.
                </p>
              </div>
            )}

            <button style={s.backBtn} onClick={() => setVista('home')}>← Volver</button>
          </div>
        )}

      </main>
    </div>
  );
};

const s = {
  page:    { minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)', position:'relative', overflow:'hidden' },
  glow:    { position:'fixed', width:600, height:600, borderRadius:'50%', background:'rgba(251,146,60,0.07)', filter:'blur(120px)', top:-100, left:-100, zIndex:0, pointerEvents:'none' },
  header:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:    { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:     { color:'var(--accent)' },
  headerR: { display:'flex', alignItems:'center', gap:12 },
  userTag: { fontSize:13, color:'var(--muted)' },
  btn2:    { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:    { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox: { width:80, height:80, borderRadius:18, border:'1px solid #fb923c30', background:'#fb923c12', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:   { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:     { color:'var(--muted)', fontSize:15, marginBottom:28, maxWidth:520 },
  vinculoBox: { background:'var(--surface)', border:'1px solid #fb923c30', borderRadius:14, padding:'22px 28px', marginBottom:28, textAlign:'center', maxWidth:360 },
  vinculoLabel:{ fontSize:12, color:'#fb923c', fontFamily:'var(--mono)', letterSpacing:1, textTransform:'uppercase', marginBottom:8 },
  vinculoCodigo:{ fontSize:22, fontWeight:700, fontFamily:'var(--mono)', color:'var(--text)', marginBottom:8 },
  vinculoDesc:{ fontSize:12, color:'var(--muted)' },
  error:   { color:'var(--danger)', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:8, padding:'10px 16px', fontSize:13, marginBottom:16, maxWidth:400 },
  primaryBtn:{ background:'#fb923c', color:'#fff', border:'none', padding:'13px 32px', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer' },
  // detalle
  wrap:    { width:'100%', maxWidth:620, textAlign:'left' },
  sectionTitle:{ fontSize:26, fontWeight:700, letterSpacing:'-0.5px', marginBottom:20 },
  perfilCard:{ display:'flex', gap:18, alignItems:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'20px 24px', marginBottom:20 },
  perfilAvatar:{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:700, color:'#fff', flexShrink:0 },
  perfilNombre:{ fontSize:16, fontWeight:600, marginBottom:4 },
  perfilEmail: { fontSize:13, color:'var(--muted)', marginBottom:8 },
  perfilBadge: { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'3px 10px', borderRadius:100 },
  infoRow: { display:'flex', gap:14, alignItems:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 20px', marginBottom:20 },
  infoIcon:{ fontSize:20 },
  infoLabel:{ fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:4 },
  infoVal: { fontSize:15, fontWeight:600 },
  subTitle:{ fontSize:17, fontWeight:600, marginBottom:14 },
  scoreBox:{ display:'flex', gap:24, alignItems:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'22px', marginBottom:16 },
  scoreCircle:{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 },
  scoreNum:{ fontSize:22, fontWeight:700, color:'#fff', lineHeight:1 },
  scoreLabel:{ fontSize:10, color:'rgba(255,255,255,0.7)', marginTop:2 },
  scorePts:{ fontSize:15, fontWeight:600, marginBottom:4 },
  scoreFecha:{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', marginBottom:8 },
  scoreEstado:{ fontSize:13, fontWeight:600 },
  detalleList:{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 },
  detalleCard:{ display:'flex', gap:12, alignItems:'flex-start', background:'var(--surface)', border:'1px solid', borderRadius:12, padding:'14px 18px' },
  detallePregunta:{ fontSize:13, fontWeight:600, marginBottom:4 },
  detalleRespuesta:{ fontSize:12, color:'var(--muted)', marginBottom:4 },
  detalleFeedback:{ fontSize:12, fontStyle:'italic' },
  sinResultado:{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'32px', textAlign:'center', marginBottom:20 },
  backBtn: { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'10px 24px', borderRadius:10, cursor:'pointer', fontFamily:'var(--font)', fontSize:13 },
};

export default PadrePage;
