# Requisitos No Funcionales

---

## Rendimiento

### RNF-01: Tiempo de carga en baja velocidad
- **Métrica:** La aplicación debe cargar completamente en menos de 5 segundos en conexiones de baja velocidad.
- **Evidencia:** Captura de pantalla de las herramientas de desarrollador del navegador (pestaña Network) simulando red lenta.
- **Verificación:** Prueba en al menos 3 dispositivos distintos con simulación de red lenta; se promedia el tiempo de carga total.

### RNF-02: Guardado en tiempo real
- **Métrica:** El cuestionario debe guardar respuestas en tiempo real para prevenir pérdida de datos.
- **Evidencia:** Registro en consola o base de datos mostrando almacenamiento inmediato tras cada respuesta.
- **Verificación:** Prueba completando parcialmente el cuestionario y recargando la página para comprobar persistencia de datos.

### RNF-03: Funcionamiento en dispositivos de baja gama
- **Métrica:** Los módulos deben operar correctamente en dispositivos de baja gama utilizados en colegios públicos.
- **Evidencia:** Registro de pruebas ejecutadas en dispositivos con especificaciones mínimas (ej. 2GB RAM, procesador básico).
- **Verificación:** Ejecución funcional completa de cada módulo en al menos 2 dispositivos de baja gama.

---

## Usabilidad y Accesibilidad

### RNF-04: Interfaz intuitiva para jóvenes
- **Métrica:** La interfaz debe ser intuitiva, clara y adecuada para jóvenes de 14 a 18 años.
- **Evidencia:** Resultados de encuesta de usabilidad aplicada a grupo piloto dentro del rango de edad.
- **Verificación:** Prueba con mínimo 10 usuarios del rango objetivo, logrando al menos 80% de comprensión y facilidad de uso.

### RNF-05: Diseño responsivo
- **Métrica:** El diseño debe ser responsivo y funcional tanto en dispositivos móviles como en computadores.
- **Evidencia:** Capturas de pantalla en diferentes resoluciones (móvil, tablet y escritorio).
- **Verificación:** Prueba en mínimo 3 resoluciones distintas comprobando correcta adaptación de la interfaz.

### RNF-06: Accesibilidad mínima
- **Métrica:** La aplicación debe cumplir criterios mínimos de accesibilidad (lectores de pantalla, contraste adecuado).
- **Evidencia:** Resultado de evaluación con herramientas como Lighthouse o WAVE.
- **Verificación:** Validación de contraste de colores y navegación compatible con lector de pantalla.

### RNF-07: Gráficos comprensibles e interactivos
- **Métrica:** Los gráficos y estadísticas deben ser visualmente comprensibles e interactivos.
- **Evidencia:** Demostración funcional de gráficos con interacción (hover, clic, filtros).
- **Verificación:** Prueba con usuarios donde al menos el 80% interprete correctamente la información mostrada.

---

## Confiabilidad y Disponibilidad

### RNF-08: Disponibilidad del sistema
- **Métrica:** El sistema debe estar disponible un 95% del tiempo.
- **Evidencia:** Reporte de monitoreo del servidor (uptime mensual).
- **Verificación:** Cálculo mensual del porcentaje de disponibilidad.

### RNF-10: Integridad de datos
- **Métrica:** Los datos deben guardarse con integridad para evitar pérdidas o duplicidades.
- **Evidencia:** Registro en base de datos sin duplicados tras múltiples envíos.
- **Verificación:** Prueba de inserción repetida y validación de restricciones (llaves primarias, validaciones).

---

## Seguridad

### RNF-11: Protección de datos personales
- **Métrica:** La aplicación debe proteger los datos personales de usuarios menores de edad conforme a la Ley 1581 de 2012 (Colombia).
- **Evidencia:** Documento de políticas de tratamiento de datos y configuración de permisos.
- **Verificación:** Auditoría básica de cumplimiento normativo y revisión de consentimiento informado.

### RNF-12: Encriptación de contraseñas y comunicaciones
- **Métrica:** El sistema debe encriptar contraseñas y comunicaciones entre cliente y servidor.
- **Evidencia:** Verificación de uso de HTTPS y almacenamiento cifrado en base de datos.
- **Verificación:** Inspección de certificados SSL y validación de hash en contraseñas almacenadas.

### RNF-13: Acceso restringido a perfiles
- **Métrica:** Solo usuarios autorizados podrán acceder a perfiles y resultados de estudiantes.
- **Evidencia:** Prueba de acceso con distintos tipos de usuario.
- **Verificación:** Intento de acceso no autorizado y validación de bloqueo del sistema.

### RNF-14: Gestión segura de roles
- **Métrica:** La gestión de roles debe restringir y garantizar acceso seguro a los módulos.
- **Evidencia:** Matriz de roles y permisos implementada.
- **Verificación:** Pruebas cruzadas de acceso según rol asignado.

---

## Mantenibilidad y Escalabilidad

### RNF-15: Actualización de datos del mercado laboral
- **Métrica:** El sistema debe permitir la actualización de datos del mercado laboral sin alterar su funcionamiento.
- **Evidencia:** Registro de actualización exitosa sin interrupción del servicio.
- **Verificación:** Prueba de actualización en entorno de pruebas verificando estabilidad.

### RNF-16: Escalabilidad modular
- **Métrica:** La arquitectura debe permitir la adición de nuevos módulos sin reestructurar los existentes.
- **Evidencia:** Documentación de arquitectura modular.
- **Verificación:** Implementación de módulo adicional en entorno de prueba sin modificar módulos previos.

### RNF-17: Documentación del código
- **Métrica:** El código debe documentarse adecuadamente para facilitar mantenimiento.
- **Evidencia:** Revisión de comentarios y documentación técnica disponible.
- **Verificación:** Evaluación mediante checklist de estándares de documentación.

---

## Compatibilidad y Restricciones Tecnológicas

### RNF-18: Tecnologías base
- **Métrica:** El sistema debe ser desarrollado utilizando tecnologías HTML, CSS y JavaScript como base principal.
- **Evidencia:** Revisión del repositorio del proyecto.
- **Verificación:** Inspección del código fuente.

### RNF-19: Sin instalación en móviles
- **Métrica:** La aplicación debe funcionar sin necesidad de instalación en dispositivos móviles.
- **Evidencia:** Acceso exitoso desde navegador móvil.
- **Verificación:** Prueba en al menos 2 navegadores móviles distintos.

### RNF-20: Integración con fuentes públicas
- **Métrica:** El sistema debe integrarse únicamente con fuentes de datos públicas en esta fase (DANE, OLE, MEN).
- **Evidencia:** Registro de consumo de APIs o bases de datos públicas.
- **Verificación:** Validación de que no existen integraciones con fuentes privadas.
