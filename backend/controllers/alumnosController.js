const db = require('../db');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumnos_curso');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    var id = req.params.id;
    const query = 'SELECT * FROM alumnos_curso WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  const { nombre_completo, correo, fecha_nacimiento, promedio, asistencia_porcentaje, activo } = req.body;
  if (!nombre_completo || !correo || !fecha_nacimiento || promedio === undefined || asistencia_porcentaje === undefined || activo === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const query = 'INSERT INTO alumnos_curso (nombre_completo, correo, fecha_nacimiento, promedio, asistencia_porcentaje, activo) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [nombre_completo, correo, fecha_nacimiento, promedio, asistencia_porcentaje, activo]);
    res.status(201).json({ mensaje: 'Alumno creado con éxito', id: result.insertId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  const { nombre_completo, correo, fecha_nacimiento, promedio, asistencia_porcentaje, activo } = req.body;
  if (!nombre_completo || !correo || !fecha_nacimiento || promedio === undefined || asistencia_porcentaje === undefined || activo === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const query = 'UPDATE alumnos_curso SET nombre_completo=?, correo=?, fecha_nacimiento=?, promedio=?, asistencia_porcentaje=?, activo=? WHERE id=?';
    const [result] = await db.query(query, [nombre_completo, correo, fecha_nacimiento, promedio, asistencia_porcentaje, activo, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno actualizado con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM alumnos_curso WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAll, getById, create, update, remove };