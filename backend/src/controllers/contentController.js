const { query } = require('../config/database');

exports.getSermons = async (req, res) => {
  const rows = await query('SELECT * FROM sermons ORDER BY sermon_date DESC');
  res.json(rows.map(mapSermon));
};

exports.getSermonById = async (req, res) => {
  const rows = await query('SELECT * FROM sermons WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Sermon not found' });
  res.json(mapSermon(rows[0]));
};

exports.getEvents = async (req, res) => {
  const rows = await query('SELECT * FROM events ORDER BY event_date ASC');
  res.json(rows.map(mapEvent));
};

exports.getEventById = async (req, res) => {
  const rows = await query('SELECT * FROM events WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
  res.json(mapEvent(rows[0]));
};

exports.getAnnouncements = async (req, res) => {
  const rows = await query('SELECT * FROM announcements ORDER BY created_at DESC');
  res.json(rows.map(mapAnnouncement));
};

exports.getDevotions = async (req, res) => {
  const rows = await query('SELECT * FROM devotions ORDER BY devotion_date DESC');
  res.json(rows.map(mapDevotion));
};

exports.getTodayDevotion = async (req, res) => {
  const rows = await query('SELECT TOP 1 * FROM devotions ORDER BY devotion_date DESC');
  if (rows.length === 0) return res.status(404).json({ message: 'No devotion available' });
  res.json(mapDevotion(rows[0]));
};

exports.getMedia = async (req, res) => {
  const rows = await query('SELECT * FROM media ORDER BY created_at DESC');
  res.json(rows.map(mapMedia));
};

function mapSermon(r) {
  return {
    id: r.id,
    title: r.title,
    speaker: r.speaker,
    date: r.sermon_date,
    category: r.category,
    duration: r.duration,
    type: r.type,
    description: r.description,
  };
}

function mapEvent(r) {
  return {
    id: r.id,
    title: r.title,
    date: r.event_date,
    time: r.event_time,
    location: r.location,
    category: r.category,
    description: r.description,
  };
}

function mapAnnouncement(r) {
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    urgent: r.is_urgent,
    date: r.created_at,
  };
}

function mapDevotion(r) {
  return {
    id: r.id,
    date: r.devotion_date,
    title: r.title,
    verse: r.verse,
    reflection: r.reflection,
  };
}

function mapMedia(r) {
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    event: r.event_name,
  };
}
