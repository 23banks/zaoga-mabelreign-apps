const { query } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const map = (r) => ({
  id: r.id,
  name: r.name,
  title: r.title,
  story: r.story,
  date: r.created_at,
  likes: r.likes,
});

exports.getAll = async (req, res) => {
  const rows = await query('SELECT * FROM testimonies ORDER BY created_at DESC');
  res.json(rows.map(map));
};

exports.create = async (req, res) => {
  const { name, title, story } = req.body;
  const id = uuidv4();

  await query(
    `INSERT INTO testimonies (id, name, title, story) VALUES (@id, @name, @title, @story)`,
    { id, name: name || 'Anonymous Member', title, story }
  );

  const rows = await query('SELECT * FROM testimonies WHERE id = @id', { id });
  res.status(201).json(map(rows[0]));
};

exports.like = async (req, res) => {
  await query('UPDATE testimonies SET likes = likes + 1 WHERE id = @id', { id: req.params.id });
  const rows = await query('SELECT * FROM testimonies WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Testimony not found' });
  res.json(map(rows[0]));
};

exports.remove = async (req, res) => {
  await query('DELETE FROM testimonies WHERE id = @id', { id: req.params.id });
  res.status(204).end();
};
