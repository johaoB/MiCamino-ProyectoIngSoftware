import React, { useState } from 'react';
import axios from 'axios';

const PerfilModal = ({ user, onClose, onUpdate, onDelete }) => {
  const [vista, setVista]     = useState('menu'); // 'menu' | 'editar' | 'confirmarEliminar'
  const [form, setForm]       = useState({ name: user.name, email: user.email, password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleActualizar = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password.trim()) payload.password = form.password;
      const res = await axios.put(`/api/users/${user.id}`, payload);
      setSuccess('Información actualizada correctamente.');
      onUpdate(res.data);
      setTimeout(() => { setSuccess(''); setVista('menu'); }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar.');
    } finally { setLoading(false); }
  };

  const handleEliminar = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/users/${user.id}`);
      onDelete();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar.');
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>

        {/* ── MENÚ ── */}
        {vista === 'menu' && (
          <>
            <div style={s.modalHeader}>
              <div style={s.avatar}>{user.name.charAt(0).toUpperCase()}</div>
              <div>
                <p style={s.modalName}>{user.name}</p>
                <p style={s.modalEmail}>{user.email}</p>
                <span style={s.roleBadge}>{user.role}</span>
              </div>
            </div>
            <div style={s.menuBtns}>
              <button style={s.editBtn} onClick={() => setVista('editar')}>
                ✏️ Actualizar información
              </button>
              <button style={s.deleteBtn} onClick={() => setVista('confirmarEliminar')}>
                🗑️ Eliminar cuenta
              </button>
            </div>
            <button style={s.cancelBtn} onClick={onClose}>Cerrar</button>
          </>
        )}

        {/* ── EDITAR ── */}
        {vista === 'editar' && (
          <>
            <h3 style={s.modalTitle}>Actualizar información</h3>
            <form onSubmit={handleActualizar} style={s.form}>
              <label style={s.label}>Nombre completo</label>
              <input style={s.input} type="text" name="name"
                value={form.name} onChange={handleChange} required />

              <label style={s.label}>Correo electrónico</label>
              <input style={s.input} type="email" name="email"
                value={form.email} onChange={handleChange} required />

              <label style={s.label}>Nueva contraseña <span style={s.optional}>(dejar vacío para no cambiar)</span></label>
              <input style={s.input} type="password" name="password"
                placeholder="••••••••" value={form.password} onChange={handleChange} />

              {error   && <p style={s.error}>{error}</p>}
              {success && <p style={s.successMsg}>{success}</p>}

              <div style={s.formBtns}>
                <button style={s.editBtn} type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button style={s.cancelBtn} type="button" onClick={() => { setVista('menu'); setError(''); }}>
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── CONFIRMAR ELIMINAR ── */}
        {vista === 'confirmarEliminar' && (
          <>
            <div style={s.deleteWarn}>
              <p style={{fontSize: 36}}>⚠️</p>
              <h3 style={{...s.modalTitle, color: 'var(--danger)'}}>¿Eliminar cuenta?</h3>
              <p style={s.modalEmail}>Esta acción no se puede deshacer. Tu cuenta y todos tus datos serán eliminados permanentemente.</p>
            </div>
            {error && <p style={s.error}>{error}</p>}
            <div style={s.formBtns}>
              <button style={s.deleteBtn} onClick={handleEliminar} disabled={loading}>
                {loading ? 'Eliminando...' : 'Sí, eliminar mi cuenta'}
              </button>
              <button style={s.cancelBtn} onClick={() => { setVista('menu'); setError(''); }}>
                Cancelar
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

const s = {
  overlay:    { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:24 },
  modal:      { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:'36px 32px', width:'100%', maxWidth:420, boxShadow:'var(--shadow)' },
  modalHeader:{ display:'flex', gap:16, alignItems:'center', marginBottom:28 },
  avatar:     { width:56, height:56, borderRadius:14, background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:700, color:'#fff', flexShrink:0 },
  modalName:  { fontSize:17, fontWeight:700, marginBottom:4 },
  modalEmail: { fontSize:13, color:'var(--muted)', marginBottom:8 },
  roleBadge:  { fontSize:11, fontFamily:'var(--mono)', background:'rgba(79,142,247,0.1)', color:'var(--accent)', padding:'2px 10px', borderRadius:100, border:'1px solid rgba(79,142,247,0.2)' },
  modalTitle: { fontSize:20, fontWeight:700, marginBottom:20, letterSpacing:'-0.5px' },
  menuBtns:   { display:'flex', flexDirection:'column', gap:10, marginBottom:12 },
  editBtn:    { background:'rgba(79,142,247,0.12)', border:'1px solid rgba(79,142,247,0.3)', color:'var(--accent)', padding:'12px', borderRadius:10, cursor:'pointer', fontFamily:'var(--font)', fontSize:14, fontWeight:600, textAlign:'center' },
  deleteBtn:  { background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'var(--danger)', padding:'12px', borderRadius:10, cursor:'pointer', fontFamily:'var(--font)', fontSize:14, fontWeight:600, textAlign:'center' },
  cancelBtn:  { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'10px', borderRadius:10, cursor:'pointer', fontFamily:'var(--font)', fontSize:13, width:'100%', textAlign:'center' },
  form:       { display:'flex', flexDirection:'column', gap:10 },
  label:      { fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:2 },
  optional:   { fontWeight:400, fontSize:11, color:'var(--muted)' },
  input:      { background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius:10, padding:'11px 14px', color:'var(--text)', fontFamily:'var(--font)', fontSize:14, outline:'none' },
  error:      { color:'var(--danger)', fontSize:13, background:'rgba(248,113,113,0.08)', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(248,113,113,0.2)' },
  successMsg: { color:'#34d399', fontSize:13, background:'rgba(52,211,153,0.08)', padding:'10px 14px', borderRadius:8, border:'1px solid rgba(52,211,153,0.2)' },
  formBtns:   { display:'flex', flexDirection:'column', gap:8, marginTop:8 },
  deleteWarn: { textAlign:'center', marginBottom:20 },
};

export default PerfilModal;
