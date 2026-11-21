import { createBrowserRouter } from 'react-router-dom';
import Home          from '../pages/Home';
import Login         from '../pages/Login';
import Register      from '../pages/Register';
import AdminPage     from '../pages/AdminPage';
import UsuarioPage   from '../pages/UsuarioPage';
import ProfesorPage  from '../pages/ProfesorPage';
import OrientadorPage from '../pages/OrientadorPage';
import PadrePage     from '../pages/PadrePage';
// UNIFICACIÓN: Módulo A (Freddy) integrado detrás del botón "Realizar prueba" del estudiante
import ModuloAPage   from '../pages/ModuloA/ModuloAPage';

const router = createBrowserRouter([
  { path: '/',           element: <Home /> },
  { path: '/login',      element: <Login /> },
  { path: '/register',   element: <Register /> },
  { path: '/admin',      element: <AdminPage /> },
  { path: '/usuario',    element: <UsuarioPage /> },
  { path: '/usuario/prueba/*', element: <ModuloAPage /> },
  { path: '/profesor',   element: <ProfesorPage /> },
  { path: '/orientador', element: <OrientadorPage /> },
  { path: '/padre',      element: <PadrePage /> },
]);

export default router;
