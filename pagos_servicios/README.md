# API REST - Pagos Servicios

API REST desarrollada con Node.js + Express + MySQL para gestionar el registro de pagos de servicios.  
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
pagos_servicios/
└── backend/
    ├── controllers/
    │   └── pagosController.js       # Lógica de negocio (CRUD)
    ├── routes/
    │   └── pagos.js                 # Definición de rutas
    ├── postman/
    │   └── API Pagos.json
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
cd pagos_servicios/backend
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

CREATE TABLE pagos_servicios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  servicio VARCHAR(100) NOT NULL,
  referencia VARCHAR(50) NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  fecha_pago DATE NOT NULL,
  metodo VARCHAR(40) NOT NULL,
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
http://localhost:3000/pagos
```

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/pagos` | Crear un nuevo pago |
| GET | `/pagos` | Listar todos los pagos |
| GET | `/pagos/:id` | Obtener un pago por ID |
| PUT | `/pagos/:id` | Actualizar un pago |
| DELETE | `/pagos/:id` | Eliminar un pago |

---

# Endpoints detallados

---

# POST /pagos

Crea un nuevo pago de servicio.

## Body (JSON)

```json
{
    "servicio": "Agua potable",
    "referencia": "REF-2024-001",
    "monto": 15000.00,
    "fecha_pago": "2024-03-10",
    "metodo": "transferencia",
}
```

## Respuesta exitosa (201)

```json
{
    "mensaje": "Pago guardado con éxito",
    "id": 1
}
```

---

# GET /pagos

Retorna todos los pagos registrados.

## Respuesta exitosa (200)

```json
[
    {
        "id": 1,
        "servicio": "Agua potable",
        "referencia": "REF-2024-001",
        "monto": "15000.00",
        "fecha_pago": "2024-03-10",
        "metodo": "transferencia",
    }
]
```

---

# GET /pagos/:id

Retorna un pago específico por su ID.

## Respuesta exitosa (200)

```json
{
    "id": 1,
    "servicio": "Agua potable",
    "referencia": "REF-2024-001",
    "monto": "15000.00",
    "fecha_pago": "2024-03-10",
    "metodo": "transferencia",
}
```

---

# PUT /pagos/:id

Actualiza un pago completo por su ID.

## Body (JSON)

```json
{
    "servicio": "Luz actualizado",
    "referencia": "REF-2025-001",
    "monto": 18500.00,
    "fecha_pago": "2024-03-15",
    "metodo": "tarjeta",
}
```

## Respuesta exitosa (200)

```json
{
    "mensaje": "Pago actualizado con éxito"
}
```

---

# DELETE /pagos/:id

Elimina un pago por su ID.

## Respuesta exitosa (200)

```json
{
    "mensaje": "Pago eliminado con éxito"
}
```

---

# Pruebas con Postman

Se incluye la colección de Postman en:

```bash
postman/API Pagos.json
```

## Para importarla:

1. Abrir Postman  
2. Click en **Import**  
3. Seleccionar el archivo `API Pagos.json`  
4. Ejecutar los endpoints en orden:

```bash
POST → GET → GET/id → PUT/id → DELETE/id
```

---

# Validaciones implementadas

- Todos los campos son obligatorios en `POST` y `PUT`.
- Se retorna `400 Bad Request` si faltan datos.
- Se retorna `404 Not Found` si el pago no existe.
- Se retorna `500 Internal Server Error` ante errores de base de datos.
- Conexión a MySQL mediante pool usando variables de entorno.

---

# Códigos HTTP utilizados

| Código | Significado |
|---|---|
| 200 | OK — operación exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos inválidos o faltantes |
| 404 | Not Found — pago no encontrado |
| 500 | Internal Server Error — error del servidor |

---

# Autor

Proyecto desarrollado para EVA 2 — Programación Web  
Rocío Arévalo
