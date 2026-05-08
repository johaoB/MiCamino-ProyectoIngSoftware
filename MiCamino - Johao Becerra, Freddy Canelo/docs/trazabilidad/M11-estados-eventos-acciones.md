# MATRICES DE TRAZABILIDAD
**Proyecto: Mi Camino — Orientación Vocacional**

## 9.11 Matriz de Trazabilidad: Estados → Eventos → Acciones → RF / Reglas de Negocio

| Entidad / Objeto | Estado Origen | Evento | Acción del Sistema | Estado Destino | RF | Regla de Negocio |
|---|---|---|---|---|---|---|
| Cuenta de Usuario | Pendiente | Administrador aprueba registro | El sistema activa la cuenta y notifica al usuario por correo | Activa | RF-005 | RN-03: Solo se activan cuentas de instituciones públicas de Medellín |
| Cuenta de Usuario | Pendiente | Administrador rechaza registro | El sistema marca la cuenta como rechazada y notifica al usuario | Rechazada | RF-005 | RN-03: El rechazo se registra con motivo para auditoría |
| Cuenta de Usuario | Activa | 5 intentos fallidos de login | El sistema bloquea la cuenta temporalmente por 15 minutos | Bloqueada | RF-002 | RN-04: Bloqueo temporal de 15 min tras 5 intentos fallidos |
| Cuenta de Usuario | Bloqueada | Transcurren 15 minutos | El sistema desbloquea automáticamente la cuenta | Activa | RF-002 | RN-04: El desbloqueo es automático sin intervención del administrador |
| Cuenta de Usuario | Activa | Administrador desactiva cuenta | El sistema revoca el acceso y cierra sesiones activas | Inactiva | RF-006 | RN-01: Solo el administrador puede desactivar cuentas de usuario |
| Cuestionario | Borrador | Administrador publica cuestionario | El sistema valida que tenga mínimo 10 preguntas activas y cambia estado | Publicado | RF-011 | RN-08: El cuestionario debe tener al menos 10 preguntas activas para publicarse |
| Cuestionario | Publicado | Administrador desactiva cuestionario | El sistema marca el cuestionario como inactivo; los en progreso pueden completarse | Inactivo | RF-011 | RN-08: Los cuestionarios en progreso no se interrumpen al desactivar |
| Progreso del Cuestionario | No iniciado | Estudiante inicia cuestionario | El sistema carga las preguntas y registra el inicio de sesión del cuestionario | En progreso | RF-007 | RN-09: El progreso se guarda automáticamente al responder cada pregunta |
| Progreso del Cuestionario | En progreso | Estudiante guarda y sale | El sistema almacena las respuestas parciales y libera la sesión | Guardado parcialmente | RF-008 | RN-09: El estudiante puede retomar desde la última pregunta respondida |
| Progreso del Cuestionario | En progreso | Estudiante responde última pregunta | El sistema detecta el 100% completado y genera el resultado automáticamente | Completado | RF-012 | RN-12: El resultado se genera solo al completar el 100% del cuestionario |
| Resultado Vocacional | No generado | Cuestionario completado al 100% | El sistema calcula porcentajes de afinidad y genera el perfil vocacional | Generado | RF-012, RF-013 | RN-12, RN-13: La suma de porcentajes debe ser igual al 100% |
| Resultado Vocacional | Generado | Estudiante solicita descarga PDF | El sistema genera el informe PDF con el perfil vocacional completo | Descargado | RF-015 | RN-12: El PDF solo se genera si el resultado está en estado 'Generado' |
| Vinculación Padre-Estudiante | Código generado | Padre ingresa código de vinculación | El sistema valida el código y establece la vinculación entre padre e hijo | Activa | RF-001 | RN-16: El código de vinculación expira a las 72 horas si no es utilizado |
| Vinculación Padre-Estudiante | Código generado | Transcurren 72 horas sin uso | El sistema marca el código como expirado | Expirada | RF-001 | RN-16: El estudiante puede solicitar un nuevo código si el anterior expiró |
| Encuesta | Borrador | Administrador publica encuesta | El sistema cambia el estado a 'publicada' y la habilita para asignación | Publicada | RF-031 | RN-18: Solo encuestas publicadas pueden asignarse a orientadores |
| Encuesta | Publicada | Administrador asigna a orientadores | El sistema envía acceso a los orientadores seleccionados | Asignada | RF-034 | RN-18: Solo orientadores con permisos suficientes reciben la asignación |
| Encuesta | Publicada | Administrador desactiva encuesta | El sistema marca la encuesta como inactiva; las respuestas previas se conservan | Inactiva | RF-032 | RN-17: Si tiene respuestas, solo puede desactivarse, no eliminarse |
| Respuesta de Encuesta | Pendiente | Orientador envía respuestas | El sistema valida preguntas obligatorias y registra las respuestas | Completada | RF-035 | RN-19: El orientador solo puede responder una vez cada encuesta asignada |
| Tendencia Laboral | Actualizada | Transcurren 6 meses sin actualización | El sistema muestra aviso de datos desactualizados al consultar | Desactualizada | RF-019, RF-022 | RN-15: Los datos deben actualizarse al menos una vez por semestre |
| Tendencia Laboral | Desactualizada | Administrador actualiza datos | El sistema registra la nueva información y actualiza la fecha de actualización | Actualizada | RF-022 | RN-15: El sistema muestra la fecha de última actualización al usuario |