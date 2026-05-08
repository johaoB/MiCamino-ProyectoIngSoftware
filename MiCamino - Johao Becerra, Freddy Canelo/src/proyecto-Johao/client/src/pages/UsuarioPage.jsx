import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPreguntas, submitEncuesta, getResultado, getTendencias } from '../services/encuestaService';

// ── vistas posibles: 'home' | 'encuesta' | 'resultado' | 'tendencias'
const UsuarioPage = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [vista, setVista]         = useState('home');
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado]   = useState(null);
  const [tendencias, setTendencias] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const codigo = user?.codigoEstudiante || 'EST-001';

  // ── Abrir encuesta
  const abrirEncuesta = async () => {
    setLoading(true); setError('');
    try {
      const res = await getPreguntas();
      setPreguntas(res.data);
      setRespuestas({});
      setResultado(null);
      setVista('encuesta');
    } catch { setError('No se pudo cargar la encuesta.'); }
    finally { setLoading(false); }
  };

  // ── Enviar encuesta
  const enviarEncuesta = async () => {
    if (Object.keys(respuestas).length < preguntas.length)
      return setError('Responde todas las preguntas antes de enviar.');
    setLoading(true); setError('');
    try {
      const payload = {
        codigoEstudiante: codigo,
        respuestas: preguntas.map((p) => ({
          preguntaId: p.id,
          opcionSeleccionada: respuestas[p.id],
        })),
      };
      const res = await submitEncuesta(payload);
      setResultado(res.data);
      setVista('resultado');
    } catch { setError('Error al enviar la encuesta.'); }
    finally { setLoading(false); }
  };

  // ── Ver resultado guardado
  const verResultadoGuardado = async () => {
    setLoading(true); setError('');
    try {
      const res = await getResultado(codigo);
      setResultado(res.data);
      setVista('resultado');
    } catch (e) {
      setError(e.response?.data?.message || 'Aún no tienes resultados guardados.');
    }
    finally { setLoading(false); }
  };

  // ── Ver tendencias
  const verTendencias = async () => {
    setLoading(true); setError('');
    try {
      const res = await getTendencias();
      setTendencias(res.data);
      setVista('tendencias');
    } catch { setError('No se pudieron cargar las tendencias.'); }
    finally { setLoading(false); }
  };

  const handleLogout = () => { logoutUser(); navigate('/'); };

  // ════════ RENDER ════════
  return (
    <div style={s.page}>
      <div style={s.glow} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Estudiante</em></span>}
          <button style={s.btn2} onClick={() => { setVista('home'); setError(''); }}>Inicio</button>
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.btn2} onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main style={s.main}>

        {/* ── HOME ── */}
        {vista === 'home' && (
          <>
            <div style={s.iconBox}><span style={{fontSize:40}}>🎓</span></div>
            <h1 style={s.title}>Panel de <span style={{color:'#34d399'}}>Estudiante</span></h1>
            <p style={s.sub}>Bienvenido/a, <strong>{user?.name}</strong>. Explora tus herramientas.</p>
            {error && <p style={s.error}>{error}</p>}
            <div style={s.grid}>
              <button style={{...s.card, ...s.cardBtn}} onClick={abrirEncuesta} disabled={loading}>
                <span style={s.cardIcon}>📝</span>
                <p style={s.cardTitle}>Hacer encuesta vocacional</p>
                <p style={s.cardDesc}>Responde y descubre tu perfil</p>
              </button>
              <button style={{...s.card, ...s.cardBtn}} onClick={verResultadoGuardado} disabled={loading}>
                <span style={s.cardIcon}>📊</span>
                <p style={s.cardTitle}>Ver mis resultados</p>
                <p style={s.cardDesc}>Revisa tu última encuesta</p>
              </button>
              <button style={{...s.card, ...s.cardBtn}} onClick={verTendencias} disabled={loading}>
                <span style={s.cardIcon}>🚀</span>
                <p style={s.cardTitle}>Tendencias laborales</p>
                <p style={s.cardDesc}>¿Qué áreas están creciendo?</p>
              </button>
            </div>
          </>
        )}

        {/* ── ENCUESTA ── */}
        {vista === 'encuesta' && (
          <div style={s.encuestaWrap}>
            <h2 style={s.sectionTitle}>Encuesta Vocacional</h2>
            <p style={s.sub}>Selecciona la opción que mejor te represente en cada pregunta.</p>
            {preguntas.map((p, pi) => (
              <div key={p.id} style={s.preguntaCard}>
                <p style={s.preguntaNum}>Pregunta {pi + 1}</p>
                <p style={s.preguntaTxt}>{p.pregunta}</p>
                <div style={s.opcionesGrid}>
                  {p.opciones.map((op, oi) => (
                    <button
                      key={oi}
                      style={{
                        ...s.opcion,
                        ...(respuestas[p.id] === oi ? s.opcionSel : {}),
                      }}
                      onClick={() => setRespuestas((prev) => ({ ...prev, [p.id]: oi }))}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {error && <p style={s.error}>{error}</p>}
            <button style={s.primaryBtn} onClick={enviarEncuesta} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar respuestas →'}
            </button>
          </div>
        )}

        {/* ── RESULTADO ── */}
        {vista === 'resultado' && resultado && (
          <div style={s.encuestaWrap}>
            <h2 style={s.sectionTitle}>Tus resultados</h2>
            <div style={s.scoreBox}>
              <p style={s.scoreNum}>{resultado.puntaje}/{resultado.total}</p>
              <p style={s.scorePct}>{resultado.porcentaje}% de acierto</p>
              <p style={s.scoreFecha}>Fecha: {resultado.fecha}</p>
            </div>
            {resultado.detalle.map((d, i) => (
              <div key={i} style={{...s.detalleCard, borderColor: d.correcta ? '#34d39940' : '#f8717140'}}>
                <div style={s.detalleHeader}>
                  <span>{d.correcta ? '✅' : '❌'}</span>
                  <p style={s.detallePregunta}>{d.pregunta}</p>
                </div>
                <p style={s.detalleOp}><strong>Tu respuesta:</strong> {d.opcionElegida}</p>
                {!d.correcta && <p style={s.detalleOp}><strong>Respuesta ideal:</strong> {d.opcionCorrecta}</p>}
                <p style={{...s.detalleFeedback, color: d.correcta ? '#34d399' : '#f87171'}}>{d.feedback}</p>
              </div>
            ))}
            <button style={s.primaryBtn} onClick={() => setVista('home')}>← Volver al panel</button>
          </div>
        )}

        {/* ── TENDENCIAS ── */}
        {vista === 'tendencias' && (
          <div style={s.encuestaWrap}>
            <h2 style={s.sectionTitle}>Tendencias Laborales 2025</h2>
            <p style={s.sub}>Áreas con mayor demanda en el mercado laboral colombiano.</p>
            {tendencias.map((t, i) => (
              <div key={i} style={s.tendenciaCard}>
                <div style={s.tendenciaHeader}>
                  <strong style={{fontSize:15}}>{t.area}</strong>
                  <span style={s.tendenciaSalario}>{t.salarioBase}/mes</span>
                </div>
                <div style={s.tendenciaTags}>
                  <span style={s.tagSector}>{t.sector}</span>
                  <span style={s.tagClasif}>{t.clasificacion}</span>
                </div>
                <div style={s.barBg}>
                  <div style={{...s.barFill, width: `${t.demanda}%`}} />
                </div>
                <div style={s.tendenciaFooter}>
                  <span style={s.tendenciaMuted}>Demanda: {t.demanda}%</span>
                  <span style={{color:'#34d399', fontSize:13}}>{t.crecimiento}</span>
                </div>
              </div>
            ))}
            <button style={s.primaryBtn} onClick={() => setVista('home')}>← Volver al panel</button>
          </div>
        )}

      </main>
    </div>
  );
};

const s = {
  page:    { minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)', position:'relative', overflow:'hidden' },
  glow:    { position:'fixed', width:600, height:600, borderRadius:'50%', background:'rgba(52,211,153,0.07)', filter:'blur(120px)', top:-100, right:-100, zIndex:0, pointerEvents:'none' },
  header:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:    { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:     { color:'var(--accent)' },
  headerR: { display:'flex', alignItems:'center', gap:12 },
  userTag: { fontSize:13, color:'var(--muted)' },
  btn2:    { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:    { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox: { width:80, height:80, borderRadius:18, border:'1px solid #34d39930', background:'#34d39912', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:   { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:     { color:'var(--muted)', fontSize:15, marginBottom:36, maxWidth:520 },
  error:   { color:'var(--danger)', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:8, padding:'10px 16px', fontSize:13, marginBottom:16 },
  grid:    { display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' },
  card:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 24px', minWidth:200, maxWidth:220 },
  cardBtn: { cursor:'pointer', textAlign:'center', transition:'border-color 0.2s', color:'var(--text)' },
  cardIcon:{ fontSize:32, display:'block', marginBottom:12 },
  cardTitle:{ fontSize:14, fontWeight:600, marginBottom:6 },
  cardDesc: { fontSize:12, color:'var(--muted)' },
  // encuesta
  encuestaWrap:{ width:'100%', maxWidth:640, textAlign:'left' },
  sectionTitle:{ fontSize:28, fontWeight:700, letterSpacing:'-0.5px', marginBottom:8 },
  preguntaCard:{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'24px', marginBottom:16 },
  preguntaNum: { fontSize:11, color:'var(--accent)', fontFamily:'var(--mono)', letterSpacing:1, textTransform:'uppercase', marginBottom:8 },
  preguntaTxt: { fontSize:15, fontWeight:600, marginBottom:16 },
  opcionesGrid:{ display:'flex', flexDirection:'column', gap:8 },
  opcion:      { background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', color:'var(--text)', cursor:'pointer', fontFamily:'var(--font)', fontSize:13, textAlign:'left', transition:'all 0.15s' },
  opcionSel:   { background:'rgba(79,142,247,0.15)', borderColor:'var(--accent)', color:'var(--accent)' },
  primaryBtn:  { marginTop:24, background:'var(--accent)', color:'#fff', border:'none', padding:'13px 32px', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer', display:'block' },
  // resultado
  scoreBox:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'24px', textAlign:'center', marginBottom:24 },
  scoreNum:    { fontSize:48, fontWeight:700, color:'var(--accent)', letterSpacing:'-2px' },
  scorePct:    { fontSize:18, color:'var(--muted)', marginTop:4 },
  scoreFecha:  { fontSize:12, color:'var(--muted)', marginTop:8, fontFamily:'var(--mono)' },
  detalleCard: { background:'var(--surface)', border:'1px solid', borderRadius:12, padding:'18px 20px', marginBottom:12 },
  detalleHeader:{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 },
  detallePregunta:{ fontSize:14, fontWeight:600, flex:1 },
  detalleOp:   { fontSize:13, color:'var(--muted)', marginBottom:4 },
  detalleFeedback:{ fontSize:13, marginTop:8, fontStyle:'italic' },
  // tendencias
  tendenciaCard:  { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'18px 20px', marginBottom:12 },
  tendenciaHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  tendenciaSalario:{ fontSize:13, color:'#34d399', fontFamily:'var(--mono)' },
  tendenciaTags:  { display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 },
  tagSector:      { fontSize:11, fontFamily:'var(--mono)', background:'rgba(167,139,250,0.12)', color:'var(--accent2)', padding:'3px 10px', borderRadius:100, border:'1px solid rgba(167,139,250,0.2)' },
  tagClasif:      { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'3px 10px', borderRadius:100, border:'1px solid rgba(79,142,247,0.2)' },
  barBg:          { background:'rgba(255,255,255,0.05)', borderRadius:100, height:8, marginBottom:8 },
  barFill:        { background:'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius:100, height:8, transition:'width 0.6s ease' },
  tendenciaFooter:{ display:'flex', justifyContent:'space-between' },
  tendenciaMuted: { fontSize:12, color:'var(--muted)' },
};

export default UsuarioPage;
