import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getPendientes, aprobarUsuario, denegarUsuario,
  getEstudiantes, getPadres, vincularPadreEstudiante,
} from '../services/adminService';

const ROLE_LABELS = { usuario:'Estudiante', profesor:'Profesor', orientador:'Orientador', padre:'Padre/Acudiente', admin:'Admin' };
const ROLE_COLORS = { usuario:'#34d399', profesor:'#f59e0b', orientador:'#a78bfa', padre:'#fb923c', admin:'#4f8ef7' };

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const [vista, setVista]             = useState('home');
  const [pendientes, setPendientes]   = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [padres, setPadres]           = useState([]);
  const [loading, setLoading]         = useState(false);
  const [msg, setMsg]                 = useState('');
  const [msgType, setMsgType]         = useState('success');

  const [selEstudiante, setSelEstudiante] = useState('');
  const [selPadre, setSelPadre]           = useState('');
  const [vinculando, setVinculando]       = useState(false);

  const notify = (text, type = 'success') => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(''), 3000);
  };

  const cargarPendientes = async () => {
    setLoading(true);
    try { const r = await getPendientes(); setPendientes(r.data); }
    finally { setLoading(false); }
  };

  const cargarEstudiantes = async () => {
    setLoading(true);
    try { const r = await getEstudiantes(); setEstudiantes(r.data); }
    finally { setLoading(false); }
  };

  const cargarVincular = async () => {
    setLoading(true);
    setSelEstudiante(''); setSelPadre('');
    try {
      const [resE, resP] = await Promise.all([getEstudiantes(), getPadres()]);
      setEstudiantes(resE.data);
      setPadres(resP.data);
    } finally { setLoading(false); }
  };

  const handleAprobar = async (id, nombre) => {
    await aprobarUsuario(id);
    setPendientes((prev) => prev.filter((u) => u.id !== id));
    notify(`✅ ${nombre} aprobado`);
  };

  const handleDenegar = async (id, nombre) => {
    await denegarUsuario(id);
    setPendientes((prev) => prev.filter((u) => u.id !== id));
    notify(`❌ ${nombre} denegado`);
  };

  const handleVincular = async () => {
    if (!selEstudiante || !selPadre) return notify('⚠️ Selecciona un estudiante y un padre/acudiente', 'error');
    setVinculando(true);
    try {
      await vincularPadreEstudiante(Number(selPadre), Number(selEstudiante));
      notify('🔗 Vínculo creado exitosamente');
      setSelEstudiante(''); setSelPadre('');
    } catch (err) {
      notify(`❌ ${err?.response?.data?.message || 'Error al crear el vínculo'}`, 'error');
    } finally { setVinculando(false); }
  };

  const irA = (v, loader) => { setVista(v); loader && loader(); };
  const handleLogout = () => { logoutUser(); navigate('/'); };

  const toastStyle = msgType === 'error'
    ? { ...s.toast, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171' }
    : s.toast;

  return (
    <div style={s.page}>
      <div style={s.glow} />
      <header style={s.header}>
        <span style={s.logo}>MiCamino<span style={s.dot}>.</span></span>
        <div style={s.headerR}>
          {user && <span style={s.userTag}>{user.name} · <em>Admin</em></span>}
          <button style={s.btn2} onClick={() => setVista('home')}>Panel</button>
          <button style={s.btn2} onClick={() => navigate('/')}>← Home</button>
          <button style={s.btn2} onClick={handleLogout}>Salir</button>
        </div>
      </header>

      <main style={s.main}>

        {/* ── HOME ── */}
        {vista === 'home' && (
          <>
            <div style={s.iconBox}><span style={{fontSize:40}}>🛡️</span></div>
            <h1 style={s.title}>Panel de <span style={{color:'#4f8ef7'}}>Administrador</span></h1>
            <p style={s.sub}>Bienvenido/a, <strong>{user?.name}</strong>. Gestiona la plataforma.</p>
            {msg && <p style={toastStyle}>{msg}</p>}
            <div style={s.grid}>
              <button style={{...s.card, ...s.cardBtn}} onClick={() => irA('pendientes', cargarPendientes)}>
                <span style={s.cardIcon}>⏳</span>
                <p style={s.cardTitle}>Solicitudes pendientes</p>
                <p style={s.cardDesc}>Aprobar o denegar registros</p>
              </button>
              <button style={{...s.card, ...s.cardBtn}} onClick={() => irA('estudiantes', cargarEstudiantes)}>
                <span style={s.cardIcon}>🎓</span>
                <p style={s.cardTitle}>Todos los estudiantes</p>
                <p style={s.cardDesc}>Ver lista completa</p>
              </button>
              <button style={{...s.card, ...s.cardBtn}} onClick={() => irA('vincular', cargarVincular)}>
                <span style={s.cardIcon}>🔗</span>
                <p style={s.cardTitle}>Vincular estudiante</p>
                <p style={s.cardDesc}>Asociar con padre/acudiente</p>
              </button>
            </div>
          </>
        )}

        {/* ── PENDIENTES ── */}
        {vista === 'pendientes' && (
          <div style={s.wrap}>
            <div style={s.wrapHeader}>
              <h2 style={s.sectionTitle}>Solicitudes pendientes</h2>
              <button style={s.btn2} onClick={() => setVista('home')}>← Volver</button>
            </div>
            {msg && <p style={toastStyle}>{msg}</p>}
            {loading && <p style={s.muted}>Cargando...</p>}
            {!loading && pendientes.length === 0 && (
              <div style={s.emptyBox}>
                <p style={{fontSize:32}}>✅</p>
                <p style={{color:'var(--muted)', marginTop:8}}>No hay solicitudes pendientes.</p>
              </div>
            )}
            {pendientes.map((u) => (
              <div key={u.id} style={s.userCard}>
                <div style={s.userAvatar}>{u.name.charAt(0).toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={s.userRow}>
                    <p style={s.userName}>{u.name}</p>
                    <span style={{...s.roleBadge, background:`${ROLE_COLORS[u.role]}18`, color:ROLE_COLORS[u.role], border:`1px solid ${ROLE_COLORS[u.role]}40`}}>
                      {ROLE_LABELS[u.role] || u.role}
                    </span>
                  </div>
                  <p style={s.userEmail}>{u.email}</p>
                  {u.institucion && <p style={s.userMeta}>🏫 {u.institucion}</p>}
                </div>
                <div style={s.actionBtns}>
                  <button style={s.aprobarBtn} onClick={() => handleAprobar(u.id, u.name)}>Aprobar</button>
                  <button style={s.denegarBtn} onClick={() => handleDenegar(u.id, u.name)}>Denegar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ESTUDIANTES ── */}
        {vista === 'estudiantes' && (
          <div style={s.wrap}>
            <div style={s.wrapHeader}>
              <h2 style={s.sectionTitle}>Todos los estudiantes</h2>
              <button style={s.btn2} onClick={() => setVista('home')}>← Volver</button>
            </div>
            {loading && <p style={s.muted}>Cargando...</p>}
            {!loading && estudiantes.length === 0 && (
              <div style={s.emptyBox}><p style={{color:'var(--muted)'}}>No hay estudiantes registrados.</p></div>
            )}
            {estudiantes.map((u) => (
              <div key={u.id} style={s.userCard}>
                <div style={{...s.userAvatar, background:'linear-gradient(135deg,#34d399,#059669)'}}>{u.name.charAt(0).toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={s.userRow}>
                    <p style={s.userName}>{u.name}</p>
                    <span style={{...s.estadoBadge, color:u.estado==='activo'?'#34d399':u.estado==='pendiente'?'#f59e0b':'#f87171', background:u.estado==='activo'?'rgba(52,211,153,0.1)':u.estado==='pendiente'?'rgba(245,158,11,0.1)':'rgba(248,113,113,0.1)'}}>
                      {u.estado}
                    </span>
                  </div>
                  <p style={s.userEmail}>{u.email}</p>
                  <div style={s.userMetaRow}>
                    {u.codigoEstudiante && <span style={s.codeBadge}>{u.codigoEstudiante}</span>}
                    {u.institucion && <p style={s.userMeta}>🏫 {u.institucion}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── VINCULAR ── */}
        {vista === 'vincular' && (
          <div style={s.wrap}>
            <div style={s.wrapHeader}>
              <h2 style={s.sectionTitle}>Vincular estudiante con padre/acudiente</h2>
              <button style={s.btn2} onClick={() => setVista('home')}>← Volver</button>
            </div>
            {msg && <p style={toastStyle}>{msg}</p>}
            {loading && <p style={s.muted}>Cargando usuarios...</p>}

            {!loading && (
              <div style={s.vincularBox}>
                <p style={s.vincularDesc}>
                  Selecciona un estudiante y su padre/acudiente para crear el vínculo en el sistema.
                </p>

                <div style={s.fieldGroup}>
                  <label style={s.label}>🎓 Estudiante</label>
                  <select style={s.select} value={selEstudiante} onChange={(e) => setSelEstudiante(e.target.value)}>
                    <option value="">— Selecciona un estudiante —</option>
                    {estudiantes.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}{e.grado ? ` · ${e.grado}${e.grupo || ''}` : ''} ({e.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.label}>👨‍👩‍👧 Padre / Acudiente</label>
                  <select style={s.select} value={selPadre} onChange={(e) => setSelPadre(e.target.value)}>
                    <option value="">— Selecciona un padre/acudiente —</option>
                    {padres.length === 0 && <option disabled>No hay padres/acudientes activos</option>}
                    {padres.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                    ))}
                  </select>
                </div>

                {selEstudiante && selPadre && (() => {
                  const est = estudiantes.find((e) => String(e.id) === String(selEstudiante));
                  const pad = padres.find((p) => String(p.id) === String(selPadre));
                  return (
                    <div style={s.previewBox}>
                      <p style={s.previewTitle}>Vista previa del vínculo</p>
                      <div style={s.previewRow}>
                        <div style={s.previewItem}>
                          <span style={{fontSize:22}}>🎓</span>
                          <div>
                            <p style={s.previewName}>{est?.name}</p>
                            <p style={s.previewSub}>{est?.email}</p>
                          </div>
                        </div>
                        <span style={s.previewArrow}>🔗</span>
                        <div style={s.previewItem}>
                          <span style={{fontSize:22}}>👨‍👩‍👧</span>
                          <div>
                            <p style={s.previewName}>{pad?.name}</p>
                            <p style={s.previewSub}>{pad?.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <button
                  style={{
                    ...s.vincularBtn,
                    opacity: (!selEstudiante || !selPadre || vinculando) ? 0.5 : 1,
                    cursor:  (!selEstudiante || !selPadre || vinculando) ? 'not-allowed' : 'pointer',
                  }}
                  disabled={!selEstudiante || !selPadre || vinculando}
                  onClick={handleVincular}
                >
                  {vinculando ? 'Vinculando...' : '🔗 Crear vínculo'}
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

const s = {
  page:        { minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)', position:'relative', overflow:'hidden' },
  glow:        { position:'fixed', width:600, height:600, borderRadius:'50%', background:'rgba(79,142,247,0.07)', filter:'blur(120px)', top:-100, right:-100, zIndex:0, pointerEvents:'none' },
  header:      { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 48px', borderBottom:'1px solid var(--border)', position:'relative', zIndex:1 },
  logo:        { fontFamily:'var(--mono)', fontSize:18, fontWeight:600 },
  dot:         { color:'var(--accent)' },
  headerR:     { display:'flex', alignItems:'center', gap:12 },
  userTag:     { fontSize:13, color:'var(--muted)' },
  btn2:        { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'7px 14px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:12 },
  main:        { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', position:'relative', zIndex:1, textAlign:'center' },
  iconBox:     { width:80, height:80, borderRadius:18, border:'1px solid rgba(79,142,247,0.2)', background:'rgba(79,142,247,0.08)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24 },
  title:       { fontSize:38, fontWeight:700, letterSpacing:'-1px', marginBottom:10 },
  sub:         { color:'var(--muted)', fontSize:15, marginBottom:36 },
  toast:       { background:'rgba(52,211,153,0.1)', border:'1px solid rgba(52,211,153,0.3)', color:'#34d399', borderRadius:8, padding:'8px 16px', fontSize:13, marginBottom:16 },
  muted:       { color:'var(--muted)', fontSize:14 },
  grid:        { display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' },
  card:        { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 24px', minWidth:200, maxWidth:220 },
  cardBtn:     { cursor:'pointer', textAlign:'center', color:'var(--text)' },
  cardIcon:    { fontSize:32, display:'block', marginBottom:12 },
  cardTitle:   { fontSize:14, fontWeight:600, marginBottom:6 },
  cardDesc:    { fontSize:12, color:'var(--muted)' },
  wrap:        { width:'100%', maxWidth:640, textAlign:'left' },
  wrapHeader:  { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 },
  sectionTitle:{ fontSize:26, fontWeight:700, letterSpacing:'-0.5px' },
  emptyBox:    { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'40px', textAlign:'center' },
  userCard:    { display:'flex', gap:14, alignItems:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, padding:'16px 20px', marginBottom:12 },
  userAvatar:  { width:44, height:44, borderRadius:12, background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700, color:'#fff', flexShrink:0 },
  userRow:     { display:'flex', alignItems:'center', gap:10, marginBottom:4 },
  userName:    { fontSize:15, fontWeight:600 },
  userEmail:   { fontSize:13, color:'var(--muted)', marginBottom:4 },
  userMetaRow: { display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' },
  userMeta:    { fontSize:12, color:'var(--muted)' },
  roleBadge:   { fontSize:11, fontFamily:'var(--mono)', padding:'2px 10px', borderRadius:100 },
  estadoBadge: { fontSize:11, fontFamily:'var(--mono)', padding:'2px 10px', borderRadius:100 },
  codeBadge:   { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'2px 10px', borderRadius:100 },
  actionBtns:  { display:'flex', flexDirection:'column', gap:8, flexShrink:0 },
  aprobarBtn:  { background:'rgba(52,211,153,0.12)', border:'1px solid rgba(52,211,153,0.3)', color:'#34d399', padding:'7px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:13, fontWeight:600 },
  denegarBtn:  { background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', padding:'7px 16px', borderRadius:8, cursor:'pointer', fontFamily:'var(--font)', fontSize:13, fontWeight:600 },
  vincularBox:   { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'28px 24px' },
  vincularDesc:  { fontSize:14, color:'var(--muted)', marginBottom:24 },
  fieldGroup:    { marginBottom:18 },
  label:         { fontSize:13, fontWeight:600, display:'block', marginBottom:8, color:'var(--text)' },
  select:        { width:'100%', padding:'10px 14px', borderRadius:10, border:'1px solid var(--border)', background:'var(--bg)', color:'var(--text)', fontSize:14, fontFamily:'var(--font)', outline:'none', cursor:'pointer' },
  previewBox:    { background:'rgba(79,142,247,0.05)', border:'1px solid rgba(79,142,247,0.2)', borderRadius:12, padding:'16px 20px', marginBottom:20, marginTop:4 },
  previewTitle:  { fontSize:12, color:'var(--muted)', fontWeight:600, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.05em' },
  previewRow:    { display:'flex', alignItems:'center', gap:16 },
  previewItem:   { display:'flex', alignItems:'center', gap:10, flex:1 },
  previewName:   { fontSize:14, fontWeight:600, marginBottom:2 },
  previewSub:    { fontSize:12, color:'var(--muted)' },
  previewArrow:  { fontSize:20, flexShrink:0 },
  vincularBtn:   { width:'100%', padding:'12px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#4f8ef7,#a78bfa)', color:'#fff', fontSize:15, fontWeight:700, fontFamily:'var(--font)', marginTop:4 },
};

export default AdminPage;
