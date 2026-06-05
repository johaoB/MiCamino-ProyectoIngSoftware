import React, { useState, useEffect } from 'react';
import PerfilModal from '../components/PerfilModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPreguntas, submitEncuesta, getResultado, getTendencias, guardarProgreso, getProgreso } from '../services/encuestaService';

const UsuarioPage = () => {
  const navigate = useNavigate();
  const { user, loginUser, logoutUser } = useAuth();
  const [showPerfil, setShowPerfil] = useState(false);
  const [vista, setVista]           = useState('home');
  const [preguntas, setPreguntas]   = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado]   = useState(null);
  const [tendencias, setTendencias] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [saveMsg, setSaveMsg]       = useState('');
  const [error, setError]           = useState('');
  // progreso para mostrar en el panel home
  const [progresoHome, setProgresoHome] = useState(null);
  const [totalHome, setTotalHome]       = useState(0);

  const codigo = user?.id;

  // progreso dentro del cuestionario (calculado en vivo)
  const totalPreguntas = preguntas.length;
  const respondidas    = Object.keys(respuestas).length;
  const porcentajeBar  = totalPreguntas > 0 ? Math.round((respondidas / totalPreguntas) * 100) : 0;

  // Carga el progreso guardado al montar para mostrarlo en el panel
  useEffect(() => {
    Promise.allSettled([getProgreso(codigo), getPreguntas()]).then(([prog, preg]) => {
      const total = preg.status === 'fulfilled' ? preg.value.data.length : 3;
      setTotalHome(total);
      if (prog.status === 'fulfilled') {
        const resp = prog.value.data.respuestas || {};
        setProgresoHome(Object.keys(resp).length);
      } else {
        setProgresoHome(null);
      }
    });
  }, [vista]); // recalcula cada vez que vuelves al panel

  const pctHome = totalHome > 0 && progresoHome !== null
    ? Math.round((progresoHome / totalHome) * 100)
    : 0;

  const abrirEncuesta = async () => {
    setLoading(true); setError('');
    try {
      const [resP, resProg] = await Promise.allSettled([getPreguntas(), getProgreso(codigo)]);
      const preg = resP.status === 'fulfilled' ? resP.value.data : [];
      const prog = resProg.status === 'fulfilled' ? resProg.value.data : null;
      setPreguntas(preg);
      setRespuestas(prog ? prog.respuestas : {});
      setVista('encuesta');
    } catch { setError('No se pudo cargar la encuesta.'); }
    finally { setLoading(false); }
  };

  const handleGuardarProgreso = async () => {
    try {
      await guardarProgreso({ idEstudiante: codigo, respuestas });
      setSaveMsg('Progreso guardado ✓');
      setTimeout(() => setSaveMsg(''), 2500);
    } catch { setSaveMsg('Error al guardar'); }
  };

  const handleGuardarYVolver = async () => {
    await handleGuardarProgreso();
    setVista('home');
  };

  const enviarEncuesta = async () => {
    if (respondidas < totalPreguntas)
      return setError('Responde todas las preguntas antes de enviar.');
    setLoading(true); setError('');
    try {
      const payload = {
        idEstudiante: codigo,
        respuestas: preguntas.map((p) => ({ preguntaId: p.id, opcionSeleccionada: respuestas[p.id] })),
      };
      const res = await submitEncuesta(payload);
      setResultado(res.data);
      setVista('resultado');
    } catch { setError('Error al enviar la encuesta.'); }
    finally { setLoading(false); }
  };

  const verResultadoGuardado = async () => {
    setLoading(true); setError('');
    try {
      const res = await getResultado(codigo);
      setResultado(res.data);
      setVista('resultado');
    } catch (e) { setError(e.response?.data?.message || 'Aún no tienes resultados.'); }
    finally { setLoading(false); }
  };

  const verTendencias = async () => {
    setLoading(true); setError('');
    try {
      const res = await getTendencias();
      setTendencias(res.data);
      setVista('tendencias');
    } catch { setError('No se pudieron cargar las tendencias.'); }
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
      <div style={s.glow} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Estudiante</em></span>}
          <button style={s.btn2} onClick={() => { setVista('home'); setError(''); }}>Panel</button>
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.perfilBtn} onClick={() => setShowPerfil(true)}>👤 Perfil</button>
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

            {/* ── BARRA DE PROGRESO EN EL PANEL ── */}
            <div style={s.progressWrap}>
              <div style={s.progressHeader}>
                <span style={s.progressLabel}>Progreso de encuesta</span>
                <span style={s.progressPct}>
                  {progresoHome !== null
                    ? `${progresoHome} / ${totalHome} respondidas — ${pctHome}%`
                    : 'Sin progreso guardado'}
                </span>
              </div>
              <div style={s.progressBg}>
                <div style={{
                  ...s.progressFill,
                  width: `${pctHome}%`,
                  background: pctHome === 100
                    ? 'linear-gradient(90deg,#34d399,#059669)'
                    : 'linear-gradient(90deg,var(--accent),var(--accent2))',
                }} />
              </div>
              {resultado && (
                <p style={s.progressNote}>✅ Encuesta finalizada — {resultado.porcentaje}% de acierto</p>
              )}
            </div>

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

        {/* ── ENCUESTA (sin barra de progreso, con botones de guardar) ── */}
        {vista === 'encuesta' && (
          <div style={s.encuestaWrap}>
            <h2 style={s.sectionTitle}>Encuesta Vocacional</h2>
            <p style={s.sub}>Selecciona la opción que mejor te represente.</p>

            <div style={s.controlRow}>
              <button style={s.saveBtn} onClick={handleGuardarProgreso}>
                💾 Guardar progreso
              </button>
              <button style={s.outlineBtn} onClick={handleGuardarYVolver}>
                ← Guardar y volver al panel
              </button>
              {saveMsg && <span style={s.saveMsg}>{saveMsg}</span>}
            </div>

            {preguntas.map((p, pi) => (
              <div key={p.id} style={{
                ...s.preguntaCard,
                borderColor: respuestas[p.id] !== undefined ? 'rgba(79,142,247,0.3)' : 'var(--border)',
              }}>
                <p style={s.preguntaNum}>Pregunta {pi + 1} de {totalPreguntas}</p>
                <p style={s.preguntaTxt}>{p.pregunta}</p>
                <div style={s.opcionesGrid}>
                  {p.opciones.map((op, oi) => (
                    <button
                      key={oi}
                      style={{ ...s.opcion, ...(respuestas[p.id] === oi ? s.opcionSel : {}) }}
                      onClick={() => setRespuestas((prev) => ({ ...prev, [p.id]: oi }))}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {error && <p style={s.error}>{error}</p>}
            <button
              style={{ ...s.primaryBtn, opacity: respondidas < totalPreguntas ? 0.5 : 1 }}
              onClick={enviarEncuesta}
              disabled={loading}
            >
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
                {!d.correcta && <p style={s.detalleOp}><strong>Ideal:</strong> {d.opcionCorrecta}</p>}
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
                  <div style={{...s.barFill, width:`${t.demanda}%`}} />
                </div>
                <div style={s.tendenciaFooter}>
                  <span style={s.tendenciaMuted}>Demanda: {t.demanda}%</span>
                  <span style={{color:'#34d399',fontSize:13}}>{t.crecimiento}</span>
                </div>
              </div>
            ))}
            <button style={s.primaryBtn} onClick={() => setVista('home')}>← Volver al panel</button>
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
  glow:    { position:'fixed', width:600, height:600, borderRadius:'50%', background:'rgba(52,211,153,0.07)', filter:'blur(120px)', top:-100, right:-100, zIndex:0, pointerEvents:'none' },
  header:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:    { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:     { color:'var(--accent)' },
  headerR: { display:'flex', alignItems:'center', gap:12 },
  userTag: { fontSize:13, color:'var(--muted)' },
  perfilBtn: { background:'rgba(167,139,250,0.12)', border:'1px solid rgba(167,139,250,0.3)', color:'var(--accent2)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12, fontWeight:600 },
  btn2:    { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:    { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox: { width:80, height:80, borderRadius:18, border:'1px solid #34d39930', background:'#34d39912', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:   { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:     { color:'var(--muted)', fontSize:15, marginBottom:20, maxWidth:520 },
  error:   { color:'var(--danger)', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:8, padding:'10px 16px', fontSize:13, marginBottom:16 },
  // barra en el panel
  progressWrap:   { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 20px', marginBottom:28, width:'100%', maxWidth:560, textAlign:'left' },
  progressHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  progressLabel:  { fontSize:12, fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:1 },
  progressPct:    { fontSize:13, fontWeight:600, color:'var(--text)' },
  progressBg:     { background:'rgba(255,255,255,0.06)', borderRadius:100, height:10, overflow:'hidden' },
  progressFill:   { height:10, borderRadius:100, transition:'width 0.5s ease' },
  progressNote:   { fontSize:12, color:'#34d399', marginTop:10, fontFamily:'var(--mono)' },
  // cards
  grid:     { display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' },
  card:     { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 24px', minWidth:200, maxWidth:220 },
  cardBtn:  { cursor:'pointer', textAlign:'center', color:'var(--text)' },
  cardIcon: { fontSize:32, display:'block', marginBottom:12 },
  cardTitle:{ fontSize:14, fontWeight:600, marginBottom:6 },
  cardDesc: { fontSize:12, color:'var(--muted)' },
  // encuesta
  encuestaWrap: { width:'100%', maxWidth:640, textAlign:'left' },
  sectionTitle: { fontSize:28, fontWeight:700, letterSpacing:'-0.5px', marginBottom:8 },
  controlRow:   { display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', marginBottom:20 },
  saveBtn:      { background:'rgba(79,142,247,0.12)', border:'1px solid rgba(79,142,247,0.3)', color:'var(--accent)', padding:'8px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:13, fontWeight:600 },
  outlineBtn:   { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'8px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:13 },
  saveMsg:      { fontSize:12, color:'#34d399', fontFamily:'var(--mono)' },
  preguntaCard: { background:'var(--surface)', border:'1px solid', borderRadius:14, padding:'24px', marginBottom:16, transition:'border-color 0.2s' },
  preguntaNum:  { fontSize:11, color:'var(--accent)', fontFamily:'var(--mono)', letterSpacing:1, textTransform:'uppercase', marginBottom:8 },
  preguntaTxt:  { fontSize:15, fontWeight:600, marginBottom:16 },
  opcionesGrid: { display:'flex', flexDirection:'column', gap:8 },
  opcion:       { background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 14px', color:'var(--text)', cursor:'pointer', fontFamily:'var(--font)', fontSize:13, textAlign:'left' },
  opcionSel:    { background:'rgba(79,142,247,0.15)', borderColor:'var(--accent)', color:'var(--accent)' },
  primaryBtn:   { marginTop:24, background:'var(--accent)', color:'#fff', border:'none', padding:'13px 32px', borderRadius:10, fontSize:15, fontWeight:600, fontFamily:'var(--font)', cursor:'pointer', display:'block' },
  // resultado
  scoreBox:       { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'24px', textAlign:'center', marginBottom:24 },
  scoreNum:       { fontSize:48, fontWeight:700, color:'var(--accent)', letterSpacing:'-2px' },
  scorePct:       { fontSize:18, color:'var(--muted)', marginTop:4 },
  scoreFecha:     { fontSize:12, color:'var(--muted)', marginTop:8, fontFamily:'var(--mono)' },
  detalleCard:    { background:'var(--surface)', border:'1px solid', borderRadius:12, padding:'18px 20px', marginBottom:12 },
  detalleHeader:  { display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 },
  detallePregunta:{ fontSize:14, fontWeight:600, flex:1 },
  detalleOp:      { fontSize:13, color:'var(--muted)', marginBottom:4 },
  detalleFeedback:{ fontSize:13, marginTop:8, fontStyle:'italic' },
  // tendencias
  tendenciaCard:   { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'18px 20px', marginBottom:12 },
  tendenciaHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  tendenciaSalario:{ fontSize:13, color:'#34d399', fontFamily:'var(--mono)' },
  tendenciaTags:   { display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 },
  tagSector:       { fontSize:11, fontFamily:'var(--mono)', background:'rgba(167,139,250,0.12)', color:'var(--accent2)', padding:'3px 10px', borderRadius:100, border:'1px solid rgba(167,139,250,0.2)' },
  tagClasif:       { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'3px 10px', borderRadius:100, border:'1px solid rgba(79,142,247,0.2)' },
  barBg:           { background:'rgba(255,255,255,0.05)', borderRadius:100, height:8, marginBottom:8 },
  barFill:         { background:'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius:100, height:8 },
  tendenciaFooter: { display:'flex', justifyContent:'space-between' },
  tendenciaMuted:  { fontSize:12, color:'var(--muted)' },
};

export default UsuarioPage;
