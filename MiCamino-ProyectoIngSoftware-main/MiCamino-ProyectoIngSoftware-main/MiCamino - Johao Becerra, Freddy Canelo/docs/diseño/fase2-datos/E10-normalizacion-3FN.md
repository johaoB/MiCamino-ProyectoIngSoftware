# Proceso de Normalización de la Tabla `Usuario` – Proyecto **Mi Camino**

> **Nota:** El archivo de Excel (`MER.xlsx`) contiene el modelo como una imagen incrustada, por lo que no fue posible extraer automáticamente los nombres exactos de los atributos. Con base en el contexto del proyecto **Mi Camino** y la estructura habitual de la entidad `Usuario`, se presenta un proceso de normalización completo y formal que puedes adaptar a los campos exactos de tu modelo.

---

## 1. Tabla Inicial No Normalizada (UNF)

En una primera versión del sistema, la información del usuario podría almacenarse en una sola tabla con datos personales, credenciales y roles:

| id_usuario | nombres | apellidos | correo | contraseña | fecha_nacimiento | género | teléfono | ciudad | departamento | país | roles |
|----------:|----------|-----------|--------|-----------|----------------|--------|----------|--------|-------------|------|-------|
| 1 | Juan David | Pérez Gómez | juan@gmail.com | abc123 | 2007-05-12 | Masculino | 3001234567 | Medellín | Antioquia | Colombia | Estudiante, Administrador |

### Problemas Detectados

- El campo `roles` contiene múltiples valores.
- Existen datos repetitivos como ciudad, departamento y país.
- La información de roles puede duplicarse para varios usuarios.
- Dificulta consultas y actualizaciones.

---

## 2. Primera Forma Normal (1FN)

La Primera Forma Normal exige que todos los atributos sean **atómicos**, es decir, que cada celda contenga un solo valor.

### Cambios Realizados

- Se elimina el campo multivaluado `roles`.
- Se crea una tabla independiente `Rol`.
- Se crea la tabla intermedia `Usuario_Rol`.

### Tabla `Usuario` en 1FN

| Campo | Tipo |
|------|------|
| id_usuario (PK) | INT |
| nombres | VARCHAR |
| apellidos | VARCHAR |
| correo | VARCHAR |
| contraseña | VARCHAR |
| fecha_nacimiento | DATE |
| género | VARCHAR |
| teléfono | VARCHAR |
| ciudad | VARCHAR |
| departamento | VARCHAR |
| país | VARCHAR |

### Tabla `Rol`

| Campo | Tipo |
|------|------|
| id_rol (PK) | INT |
| nombre_rol | VARCHAR |

### Tabla `Usuario_Rol`

| Campo | Tipo |
|------|------|
| id_usuario (FK) | INT |
| id_rol (FK) | INT |

---

## 3. Segunda Forma Normal (2FN)

La Segunda Forma Normal exige que todos los atributos dependan completamente de la clave primaria.

### Análisis

En `Usuario`, todos los atributos dependen de `id_usuario`.

En `Usuario_Rol`, la clave primaria compuesta es:

```text
(id_usuario, id_rol)
```

No existen atributos adicionales que dependan solo de una parte de la clave.

### Resultado

El modelo cumple la 2FN.

---

## 4. Tercera Forma Normal (3FN)

La Tercera Forma Normal exige que no existan dependencias transitivas.

### Dependencias Transitivas Detectadas

En la tabla `Usuario`:

```text
id_usuario → ciudad → departamento → país
```

Esto implica que `departamento` y `país` no dependen directamente del usuario, sino de la ciudad.

### Solución

Se separa la información geográfica en una entidad independiente `Ubicacion`.

---

## 5. Modelo Final en 3FN

### Tabla `Ubicacion`

| Campo | Tipo |
|------|------|
| id_ubicacion (PK) | INT |
| ciudad | VARCHAR |
| departamento | VARCHAR |
| país | VARCHAR |

### Tabla `Usuario`

| Campo | Tipo |
|------|------|
| id_usuario (PK) | INT |
| nombres | VARCHAR |
| apellidos | VARCHAR |
| correo | VARCHAR UNIQUE |
| contraseña | VARCHAR |
| fecha_nacimiento | DATE |
| género | VARCHAR |
| teléfono | VARCHAR |
| id_ubicacion (FK) | INT |
| fecha_registro | DATETIME |
| estado | ENUM('Activo','Inactivo','Suspendido') |

### Tabla `Rol`

| Campo | Tipo |
|------|------|
| id_rol (PK) | INT |
| nombre_rol | VARCHAR |
| descripcion | VARCHAR |

### Tabla `Usuario_Rol`

| Campo | Tipo |
|------|------|
| id_usuario (FK) | INT |
| id_rol (FK) | INT |

---

## 6. Dependencias Funcionales Finales

### Tabla `Usuario`

```text
id_usuario → nombres, apellidos, correo, contraseña,
             fecha_nacimiento, género, teléfono,
             id_ubicacion, fecha_registro, estado
```

### Tabla `Ubicacion`

```text
id_ubicacion → ciudad, departamento, país
```

### Tabla `Rol`

```text
id_rol → nombre_rol, descripcion
```

### Tabla `Usuario_Rol`

```text
(id_usuario, id_rol)
```

---

## 7. Justificación de la Primera Forma Normal (1FN)

La tabla `Usuario` cumple con la Primera Forma Normal porque todos los atributos contienen valores atómicos. No existen campos con múltiples valores o listas dentro de una sola columna. Por ejemplo, los roles del usuario se separaron en las tablas `Rol` y `Usuario_Rol`, garantizando que cada dato se almacene individualmente.

---

## 8. Justificación de la Segunda Forma Normal (2FN)

La estructura cumple con la Segunda Forma Normal porque todos los atributos dependen completamente de la clave primaria de cada tabla. En `Usuario`, cada campo depende únicamente de `id_usuario`. En la tabla intermedia `Usuario_Rol`, no existen atributos adicionales que dependan parcialmente de la clave compuesta.

---

## 9. Justificación de la Tercera Forma Normal (3FN)

La tabla `Usuario` se encuentra en Tercera Forma Normal porque no existen dependencias transitivas. Inicialmente, los atributos `ciudad`, `departamento` y `país` generaban redundancia, ya que el departamento y el país dependían de la ciudad y no directamente del usuario. Para solucionar esto, se creó la entidad `Ubicacion`, y la tabla `Usuario` conserva únicamente la clave foránea `id_ubicacion`.

Además, la asignación de roles se normalizó mediante las tablas `Rol` y `Usuario_Rol`, evitando duplicidad y facilitando la gestión de permisos.

En consecuencia, todos los atributos no clave dependen exclusivamente de la clave primaria, garantizando integridad referencial, reducción de redundancia y mayor eficiencia en el sistema.

---

## 10. Conclusión

El proceso de normalización de la tabla `Usuario` permitió transformar una estructura inicial con redundancias y datos multivaluados en un modelo relacional organizado y eficiente.

El resultado final cumple con:

- **Primera Forma Normal (1FN):** atributos atómicos.
- **Segunda Forma Normal (2FN):** dependencia total de la clave primaria.
- **Tercera Forma Normal (3FN):** ausencia de dependencias transitivas.

Esta estructura asegura:

- Integridad de los datos.
- Reducción de redundancia.
- Facilidad de mantenimiento.
- Escalabilidad del sistema.
- Mejor rendimiento en consultas y actualizaciones.

Por lo tanto, la entidad `Usuario` del proyecto **Mi Camino** está correctamente normalizada y preparada para su implementación en una base de datos relacional.
