# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.4 Matriz de Trazabilidad: Nodos de Despliegue → Protocolos → RNF → Componentes

| Nodo de Despliegue | Protocolo | RNF | Componente |
|---|---|---|---|
| Dispositivo Cliente (Navegador Web) | HTTP/HTTPS | RNF-01 (Usabilidad), RNF-17 (Compatibilidad) | Interfaz de usuario (Frontend Web — React/HTML5) |
| Dispositivo Cliente (Móvil) | HTTP/HTTPS | RNF-01 (Usabilidad), RNF-17 (Compatibilidad), RNF-16 (Rendimiento baja gama) | Interfaz de usuario responsiva (Frontend adaptado a móvil) |
| Servidor de Aplicaciones | HTTP/REST | RNF-02 (Disponibilidad), RNF-03 (Rendimiento), RNF-08 (Escalabilidad) | API REST — Lógica de negocio (Backend) |
| Servidor de Aplicaciones | JWT (JSON Web Token) | RNF-05 (Autenticación), RNF-06 (Autorización) | Módulo de autenticación y gestión de sesiones |
| Servidor de Base de Datos | TCP/IP (MySQL Protocol) | RNF-09 (Integridad), RNF-10 (Persistencia), RNF-11 (Confidencialidad) | Motor de base de datos MySQL — Tablas relacionales |
| Servidor de Base de Datos | SSL/TLS | RNF-11 (Confidencialidad), RNF-12 (Cifrado en tránsito) | Conexión cifrada entre servidor de aplicaciones y BD |
| Servidor de Archivos / CDN | HTTPS | RNF-03 (Rendimiento), RNF-14 (Disponibilidad de recursos estáticos) | Almacenamiento de reportes PDF y recursos estáticos |
| Canal de Comunicación (Internet) | HTTPS / TLS 1.2+ | RNF-12 (Cifrado), RNF-13 (Seguridad en tránsito) | Capa de transporte seguro entre cliente y servidor |
| Servidor de Correo (SMTP) | SMTP / TLS | RNF-15 (Notificaciones), RNF-06 (Autorización) | Módulo de notificaciones por correo electrónico |
| Entorno de Despliegue (Cloud) | SSH / HTTPS | RNF-02 (Disponibilidad), RNF-08 (Escalabilidad), RNF-18 (Mantenibilidad) | Infraestructura cloud (servidor virtual, balanceador de carga) |
| Entorno de Despliegue (Cloud) | HTTP/REST | RNF-19 (Portabilidad), RNF-20 (Interoperabilidad) | Contenedores Docker / Orquestación de servicios |