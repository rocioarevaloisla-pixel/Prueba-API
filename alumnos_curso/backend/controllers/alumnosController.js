const db = require('../db');

const formatearFecha = (fecha) => {
  if (!fecha) return null;

  return new Date(fecha)
    .toISOString()
    .split('T')[0];
};

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alumnos_curso');

    const datos = rows.map(alumno => ({
      ...alumno,
      fecha_nacimiento: formatearFecha(alumno.fecha_nacimiento)
    }));

    res.json(datos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

const getById = async (req, res) => {
  try {

    const id = req.params.id;

    const query = 'SELECT * FROM alumnos_curso WHERE id = ?';

    const [rows] = await db.query(query, [id]);

    if (!rows[0]) {
      return res.status(404).json({
        error: 'Alumno no encontrado'
      });
    }

    const alumno = {
      ...rows[0],
      fecha_nacimiento: formatearFecha(rows[0].fecha_nacimiento)
    };

    res.json(alumno);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

const create = async (req, res) => {

  const {
    nombre_completo,
    correo,
    fecha_nacimiento,
    promedio,
    asistencia_porcentaje,
    activo,
    documento_identidad
  } = req.body;

  if (
    !nombre_completo ||
    !correo ||
    !fecha_nacimiento ||
    promedio === undefined ||
    asistencia_porcentaje === undefined ||
    activo === undefined ||
    documento_identidad === undefined
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  try {

    const query = `
      INSERT INTO alumnos_curso
      (
        nombre_completo,
        correo,
        fecha_nacimiento,
        promedio,
        asistencia_porcentaje,
        activo,
        documento_identidad
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      nombre_completo,
      correo,
      fecha_nacimiento,
      promedio,
      asistencia_porcentaje,
      activo,
      documento_identidad
    ]);

    res.status(201).json({
      mensaje: 'Alumno creado con éxito',
      id: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

const update = async (req, res) => {

  const {
    nombre_completo,
    correo,
    fecha_nacimiento,
    promedio,
    asistencia_porcentaje,
    activo, 
    documento_identidad
  } = req.body;

  if (
    !nombre_completo ||
    !correo ||
    !fecha_nacimiento ||
    promedio === undefined ||
    asistencia_porcentaje === undefined ||
    activo === undefined ||
    documento_identidad === undefined
  ) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  try {

    const query = `
      UPDATE alumnos_curso
      SET
        nombre_completo = ?,
        correo = ?,
        fecha_nacimiento = ?,
        promedio = ?,
        asistencia_porcentaje = ?,
        activo = ?,
        documento_identidad = ? 
      WHERE id = ?
    `;

    const [result] = await db.query(query, [
      nombre_completo,
      correo,
      fecha_nacimiento,
      promedio,
      asistencia_porcentaje,
      activo,
      documento_identidad,
      req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alumno no encontrado'
      });
    }

    res.json({
      mensaje: 'Alumno actualizado con éxito'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

const remove = async (req, res) => {
  try {

    const [result] = await db.query(
      'DELETE FROM alumnos_curso WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alumno no encontrado'
      });
    }

    res.json({
      mensaje: 'Alumno eliminado con éxito'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};