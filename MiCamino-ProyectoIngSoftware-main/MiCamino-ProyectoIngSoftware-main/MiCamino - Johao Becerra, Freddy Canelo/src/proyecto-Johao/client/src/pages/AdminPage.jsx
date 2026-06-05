import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const navigate  = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={{...styles.glow, background: '#4f8ef7'}} />

      <header style={styles.header}>
        <span style={styles.logo}>MiCamino<span style={styles.dot}>.</span></span>
        <div style={styles.headerRight}>
          {user && (
            <span style={styles.userTag}>{user.name} · <em>Administrador</em></span>
          )}
          <button style={styles.backBtn} onClick={() => navigate('/')}>
            ← Inicio
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Salir
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={{...styles.iconBox, borderColor: '#4f8ef720', background: '#4f8ef712'}}>
          <span style={{fontSize: 40}}>🛡️</span>
        </div>

        <h1 style={styles.title}>Panel de <span style={{color: '#4f8ef7'}}>Administrador</span></h1>
        <p style={styles.sub}>
          Bienvenido/a, <strong>{user?.name || 'Administrador'}</strong>. Este es tu espacio de trabajo.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Rol activo</p>
            <p style={styles.cardValue}>admin</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Correo</p>
            <p style={styles.cardValue}>{user?.email || '—'}</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Estado</p>
            <p style={{...styles.cardValue, color: 'var(--success)'}}>● Activo</p>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    background: 'var(--bg)', position: 'relative', overflow: 'hidden',
  },
  glow: {
    position: 'fixed', width: 600, height: 600, borderRadius: '50%',
    filter: 'blur(120px)', top: -100, right: -100, zIndex: 0, pointerEvents: 'none',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 48px', borderBottom: '1px solid var(--border)',
    position: 'relative', zIndex: 1,
  },
  logo: { fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 600 },
  dot:  { color: 'var(--accent)' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 16 },
  userTag: {
    fontSize: 13, color: 'var(--muted)', fontStyle: 'normal',
  },
  backBtn: {
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--text)', padding: '8px 16px', borderRadius: 8,
    cursor: 'pointer', fontFamily: 'var(--font)', fontSize: 13,
  },
  logoutBtn: {
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--muted)', padding: '8px 16px', borderRadius: 8,
    cursor: 'pointer', fontFamily: 'var(--font)', fontSize: 13,
  },
  main: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '60px 24px',
    position: 'relative', zIndex: 1, textAlign: 'center',
  },
  iconBox: {
    width: 88, height: 88, borderRadius: 20, border: '1px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  },
  title: { fontSize: 40, fontWeight: 700, letterSpacing: '-1px', marginBottom: 12 },
  sub:   { color: 'var(--muted)', fontSize: 16, marginBottom: 48 },
  grid:  { display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '24px 32px', minWidth: 160, textAlign: 'left',
  },
  cardLabel: { fontSize: 12, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  cardValue: { fontSize: 16, fontWeight: 600 },
};

export default AdminPage;
