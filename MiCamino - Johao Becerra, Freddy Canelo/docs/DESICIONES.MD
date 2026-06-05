## Decisión #1

**¿Qué decidí?** 

## Usar el patrón MVC separando el backend (Node/Express) del frontend (React)
 
**¿Por qué?**  

## Para mantener una separación clara de responsabilidades, facilitando el mantenimiento y la escalabilidad del sistema a medida que crecen los módulos de orientación vocacional

**¿Qué artefacto de diseño respalda esta decisión?**  

## El diagrama de arquitectura del sistema y los casos de uso, que muestran la interacción entre la interfaz del estudiante, la lógica de negocio y la base de datos.

&nbsp;

## Decisión #2

**¿Qué decidí?** 

## Implementar autenticación por roles (estudiante, orientador, administrador, acudiente, docente) desde el backend con JWT
 
**¿Por qué?**  

## Porque cada rol accede a información distinta y sensible, y era necesario proteger los endpoints de la API para que ningún usuario acceda a datos que no le corresponden

**¿Qué artefacto de diseño respalda esta decisión?**  

## La matriz de trazabilidad Pantallas → Roles → CU → RF, que define explícitamente qué rol tiene acceso a cada pantalla y funcionalidad del sistema