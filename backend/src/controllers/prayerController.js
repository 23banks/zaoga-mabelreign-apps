const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const map = (r) => ({
  id: r.id,
  name: r.name,
  request: r.request,
  date: r.created_at,
  prayedFor: r.prayed_count,
  status: r.status,
});

exports.getAll = async (req, res) => {
  const rows = await query('SELECT * FROM prayer_requests ORDER BY created_at DESC');
  res.json(rows.map(map));
};

exports.create = async (req, res) => {
  const { name, request } = req.body;
  const id = uuidv4();

  await query(
    `INSERT INTO prayer_requests (id, name, request) VALUES (@id, @name, @request)`,
    { id, name: name || 'Anonymous Member', request }
  );

  const rows = await query('SELECT * FROM prayer_requests WHERE id = @id', { id });
  res.status(201).json(map(rows[0]));
};

exports.pray = async (req, res) => {
  await query(
    'UPDATE prayer_requests SET prayed_count = prayed_count + 1 WHERE id = @id',
    { id: req.params.id }
  );
  const rows = await query('SELECT * FROM prayer_requests WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Prayer request not found' });
  res.json(map(rows[0]));
};
