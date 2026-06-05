import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.noise} />

      <header style={styles.header}>
        <span style={styles.logo}>MiCamino<span style={styles.dot}>.</span></span>
        {user && (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </header>

      <main style={styles.main}>
        <div style={styles.badge}>Sistema de orientación vocacional</div>

        <h1 style={styles.title}>
          Descubre tu<br />
          <span style={styles.gradient}>camino profesional</span>
        </h1>

        <p style={styles.subtitle}>
          Una plataforma diseñada para guiar a estudiantes de secundaria
          en Medellín hacia su vocación.
        </p>

        {user ? (
          <div style={styles.welcomeBox}>
            <p style={styles.welcomeText}>
              Bienvenido de nuevo, <strong>{user.name}</strong>
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate(`/${user.role}`)}
            >
              Ir a mi panel →
            </button>
          </div>
        ) : (
          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={() => navigate('/login')}>
              Iniciar sesión
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate('/register')}>
              Registrarse
            </button>
          </div>
        )}
      </main>

      <div style={styles.glow1} />
      <div style={styles.glow2} />
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    background: 'var(--bg)',
  },
  noise: {
    position: 'fixed', inset: 0, zIndex: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
    opacity: 0.4, pointerEvents: 'none',
  },
  glow1: {
    position: 'fixed', width: 600, height: 600,
    borderRadius: '50%', background: 'rgba(79,142,247,0.08)',
    filter: 'blur(100px)', top: -200, right: -100, zIndex: 0, pointerEvents: 'none',
  },
  glow2: {
    position: 'fixed', width: 500, height: 500,
    borderRadius: '50%', background: 'rgba(167,139,250,0.07)',
    filter: 'blur(120px)', bottom: -150, left: -100, zIndex: 0, pointerEvents: 'none',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '24px 48px', position: 'relative', zIndex: 1,
    borderBottom: '1px solid var(--border)',
  },
  logo: {
    fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 600,
    color: 'var(--text)', letterSpacing: '-0.5px',
  },
  dot: { color: 'var(--accent)' },
  logoutBtn: {
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--muted)', padding: '8px 16px', borderRadius: 8,
    cursor: 'pointer', fontFamily: 'var(--font)', fontSize: 13,
    transition: 'all 0.2s',
  },
  main: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '80px 24px', position: 'relative', zIndex: 1, textAlign: 'center',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)',
    color: 'var(--accent)', borderRadius: 100, padding: '6px 16px',
    fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 32,
  },
  title: {
    fontSize: 'clamp(42px, 6vw, 80px)', fontWeight: 700,
    lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24,
    color: 'var(--text)',
  },
  gradient: {
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 18, color: 'var(--muted)', maxWidth: 480,
    lineHeight: 1.7, marginBottom: 48,
  },
  btnGroup: { display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },
  primaryBtn: {
    background: 'var(--accent)', color: '#fff', border: 'none',
    padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600,
    fontFamily: 'var(--font)', cursor: 'pointer', transition: 'opacity 0.2s',
  },
  secondaryBtn: {
    background: 'transparent', color: 'var(--text)',
    border: '1px solid var(--border)', padding: '14px 32px',
    borderRadius: 10, fontSize: 15, fontFamily: 'var(--font)',
    cursor: 'pointer', transition: 'border-color 0.2s',
  },
  welcomeBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 16, padding: '32px 48px',
  },
  welcomeText: { fontSize: 16, color: 'var(--muted)' },
};

export default Home;
