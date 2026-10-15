const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

const map = (r) => ({
  id: r.id,
  title: r.title,
  type: r.type,
  event: r.event_name,
  url: r.file_url || null,
});

exports.getAll = async (req, res) => {
  const rows = await query('SELECT * FROM media ORDER BY created_at DESC');
  res.json(rows.map(map));
};

exports.upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { title, event } = req.body;
  const type = req.file.mimetype.startsWith('video') ? 'video' : 'photo';
  const id = uuidv4();
  const fileUrl = `/uploads/${req.file.filename}`;

  await query(
    `INSERT INTO media (id, title, type, event_name, file_url)
     VALUES (@id, @title, @type, @event, @fileUrl)`,
    { id, title: title || req.file.originalname, type, event: event || 'General', fileUrl }
  );

  const rows = await query('SELECT * FROM media WHERE id = @id', { id });
  res.status(201).json(map(rows[0]));
};

exports.remove = async (req, res) => {
  const rows = await query('SELECT * FROM media WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Media not found' });

  await query('DELETE FROM media WHERE id = @id', { id: req.params.id });

  if (rows[0].file_url) {
    const filePath = path.join(UPLOAD_DIR, path.basename(rows[0].file_url));
    fs.unlink(filePath, () => {});
  }

  res.status(204).end();
};
