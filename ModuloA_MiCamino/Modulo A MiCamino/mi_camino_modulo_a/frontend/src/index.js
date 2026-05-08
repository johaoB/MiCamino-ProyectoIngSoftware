// Importamos React para renderizado de componentes.
import React from 'react';
// Importamos createRoot para montar la app en React 18.
import { createRoot } from 'react-dom/client';
// Importamos componente principal con rutas.
import App from './App';
// Importamos estilos globales de la aplicación.
import './styles/main.css';

// Obtenemos el nodo raíz del HTML donde vive la app.
const container = document.getElementById('root');

// Creamos root de React sobre el contenedor.
const root = createRoot(container);

// Renderizamos la aplicación completa dentro de StrictMode para buenas prácticas.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
