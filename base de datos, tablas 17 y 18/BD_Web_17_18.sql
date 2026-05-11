show databases;

CREATE DATABASE IF NOT EXISTS tablas_api;
USE tablas_api;

Select * from alumnos_curso;

CREATE TABLE alumnos_curso (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_completo VARCHAR(150) NOT NULL,
  correo VARCHAR(150) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  promedio DECIMAL(4,2) NOT NULL,
  asistencia_porcentaje DECIMAL(5,2) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  documento_identidad VARCHAR(30) UNIQUE
);
 
CREATE TABLE pagos_servicios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  servicio VARCHAR(100) NOT NULL,
  referencia VARCHAR(50) NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  fecha_pago DATE NOT NULL,
  metodo VARCHAR(40) NOT NULL
);
 
