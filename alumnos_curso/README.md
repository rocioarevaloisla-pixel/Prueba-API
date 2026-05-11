# API REST - Alumnos Curso

API REST desarrollada con Node.js + Express + MySQL para gestionar el registro de alumnos de un curso.  
Proyecto desarrollado para la asignatura Programación Web.
Ingeniería en Informática, Santo Tomás, Puerto Montt.

---

# Tecnologías utilizadas

- Node.js
- Express 5
- MySQL2
- dotenv
- nodemon 

---

# Estructura del proyecto

```bash
alumnos_curso/
└── backend/
    ├── controllers/
    │   └── alumnosController.js     # Lógica de negocio (CRUD)
    ├── routes/
    │   └── alumnos.js               # Definición de rutas
    ├── postman/
    │   └── API Alumnos.json
    ├── .env                         # Variables de entorno (no subir)
    ├── app.js                       # Entry point del servidor
    ├── db.js                        # Conexión a MySQL
    ├── package.json
    └── package-lock.json
```

---

# Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js
- MySQL Server
- MySQL Workbench 
- Postman (para pruebas)

---

# Configuración

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd alumnos_curso/backend
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Crear el archivo `.env`

Crear un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tablas_api
```

---

## 4. Crear la base de datos y tabla

Ejecutar el siguiente script SQL en MySQL Workbench o tu cliente SQL:

```sql
CREATE DATABASE IF NOT EXISTS tablas_api;

USE tablas_api;

CREATE TABLE alumnos_curso (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_completo VARCHAR(150) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  promedio DECIMAL(4,2) NOT NULL,
  asistencia_porcentaje DECIMAL(5,2) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);
```

---

## 5. Iniciar el servidor

### Desarrollo (hot reload)

```bash
npm run dev
```

### Producción

```bash
npm start
```

El servidor correrá en:

```bash
http://localhost:3000
```

---

# Endpoints disponibles

## Base URL

```bash
http://localhost:3000/alumnos
```

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/alumnos` | Crear un nuevo alumno |
| GET | `/alumnos` | Listar todos los alumnos |
| GET | `/alumnos/:id` | Obtener un alumno por ID |
| PUT | `/alumnos/:id` | Actualizar un alumno |
| DELETE | `/alumnos/:id` | Eliminar un alumno |

---

# Endpoints detallados

---

# POST /alumnos

Crea un nuevo alumno.

## Body (JSON)

```json
{
    "nombre_completo": "Juan Pérez González",
    "correo": "juan.perez@mail.com",
    "fecha_nacimiento": "2000-05-15",
    "promedio": 6.50,
    "asistencia_porcentaje": 88.50,
    "activo": true
}
```

## Respuesta exitosa (201)

```json
{
    "mensaje": "Alumno creado con éxito",
    "id": 1
}
```

---

# GET /alumnos

Retorna todos los alumnos registrados.

## Respuesta exitosa (200)

```json
[
    {
        "id": 1,
        "nombre_completo": "Juan Pérez González",
        "correo": "juan.perez@mail.com",
        "fecha_nacimiento": "2000-05-15",
        "promedio": "6.50",
        "asistencia_porcentaje": "88.50",
        "activo": 1
    }
]
```

---

# GET /alumnos/:id

Retorna un alumno específico por su ID.

## Respuesta exitosa (200)

```json
{
    "id": 1,
    "nombre_completo": "Juan Pérez González",
    "correo": "juan.perez@mail.com",
    "fecha_nacimiento": "2000-05-15",
    "promedio": "6.50",
    "asistencia_porcentaje": "88.50",
    "activo": 1
}
```

---

# PUT /alumnos/:id

Actualiza un alumno completo por su ID.

## Body (JSON)

```json
{
    "nombre_completo": "Juan Pérez Actualizado",
    "correo": "juan.nuevo@mail.com",
    "fecha_nacimiento": "2000-05-15",
    "promedio": 7.20,
    "asistencia_porcentaje": 92.00,
    "activo": true
}
```

## Respuesta exitosa (200)

```json
{
    "mensaje": "Alumno actualizado con éxito"
}
```

---

# DELETE /alumnos/:id

Elimina un alumno por su ID.

## Respuesta exitosa (200)

```json
{
    "mensaje": "Alumno eliminado con éxito"
}
```

---

# Pruebas con Postman

Se incluye la colección de Postman en:

```bash
postman/API Alumnos.json
```

## Para importarla:

1. Abrir Postman  
2. Click en **Import**  
3. Seleccionar el archivo `API Alumnos.json`  
4. Ejecutar los endpoints en orden:

```bash
POST → GET → GET/id → PUT/id → DELETE/id
```

---

# Validaciones implementadas

- Todos los campos son obligatorios en `POST` y `PUT`.
- Se retorna `400 Bad Request` si faltan datos.
- Se retorna `404 Not Found` si el alumno no existe.
- Se retorna `500 Internal Server Error` ante errores de base de datos.
- Conexión a MySQL mediante pool usando variables de entorno.

---

# Códigos HTTP utilizados

| Código | Significado |
|---|---|
| 200 | OK — operación exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos inválidos o faltantes |
| 404 | Not Found — alumno no encontrado |
| 500 | Internal Server Error — error del servidor |

---

# Autor

Proyecto desarrollado para EVA 2 — Programación Web  
Rocío Arévalo
