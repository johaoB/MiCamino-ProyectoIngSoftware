# Mi Camino - Módulo A (Orientación Vocacional)

Aplicación web completa para el **Módulo A - Orientación Vocacional** del proyecto *Mi Camino*.

> **Modo demo activo** — no requiere PostgreSQL. Los datos (preguntas, áreas, carreras) están en memoria.

---

## 🚀 Levantar todo en 1 solo comando

### Paso 1 — Instalar dependencias (solo la primera vez)

```bash
npm install
npm run install:all
```

### Paso 2 — Iniciar frontend + backend juntos

```bash
npm start
```

Esto levanta automáticamente:
- **Backend** → http://localhost:4000
- **Frontend** → http://localhost:3000  ← abrir en el navegador

---

## Estructura del proyecto

```
mi_camino_modulo_a/
├── package.json          ← lanzador unificado (AQUÍ se corre npm start)
├── backend/
│   ├── controllers/cuestionarioController.js  ← lógica con datos mock
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    └── package.json
```

---

## Requisitos

- Node.js 18+
- npm 9+
- **No se necesita PostgreSQL**

---

## Flujo funcional

1. **Introducción** — explicación del test y botón *Iniciar Cuestionario*
2. **Cuestionario** — 8 preguntas, 4 opciones por pregunta, progreso visual
3. **Resultados** — muestra afinidad principal (área y porcentaje) + explicación personalizada
4. **Recomendaciones** — top 3 carreras de ingeniería ordenadas por afinidad
