const db = require('../db');

const formatearFecha = (fecha) => fecha.toISOString().split('T')[0];

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pagos_servicios');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    var id = req.params.id;
    const query = 'SELECT * FROM pagos_servicios WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    if (!rows[0]) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  const { servicio, referencia, monto, fecha_pago, metodo, confirmado } = req.body;
  if (!servicio || !referencia || !monto || !fecha_pago || !metodo || confirmado === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const query = 'INSERT INTO pagos_servicios (servicio, referencia, monto, fecha_pago, metodo, confirmado) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [servicio, referencia, monto, fecha_pago, metodo, confirmado]);
    res.status(201).json({ mensaje: 'Pago guardado con éxito', id: result.insertId });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const update = async (req, res) => {
  const { servicio, referencia, monto, fecha_pago, metodo, confirmado } = req.body;
  if (!servicio || !referencia || !monto || !fecha_pago || !metodo || confirmado === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const query = 'UPDATE pagos_servicios SET servicio=?, referencia=?, monto=?, fecha_pago=?, metodo=?, confirmado=? WHERE id=?';
    const [result] = await db.query(query, [servicio, referencia, monto, fecha_pago, metodo, confirmado, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ mensaje: 'Pago actualizado con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM pagos_servicios WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Pago no encontrado' });
    res.json({ mensaje: 'Pago eliminado con éxito' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAll, getById, create, update, remove };