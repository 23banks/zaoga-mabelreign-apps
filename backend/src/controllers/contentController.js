const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/database');

// ---------------------------------------------------------------- sermons

exports.getSermons = async (req, res) => {
  const rows = await query('SELECT * FROM sermons ORDER BY sermon_date DESC');
  res.json(rows.map(mapSermon));
};

exports.getSermonById = async (req, res) => {
  const rows = await query('SELECT * FROM sermons WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Sermon not found' });
  res.json(mapSermon(rows[0]));
};

exports.createSermon = async (req, res) => {
  const { title, speaker, date, category, duration, type, description } = req.body;
  const id = uuidv4();
  await query(
    `INSERT INTO sermons (id, title, speaker, sermon_date, category, duration, type, description)
     VALUES (@id, @title, @speaker, @date, @category, @duration, @type, @description)`,
    { id, title, speaker, date, category, duration, type, description }
  );
  const rows = await query('SELECT * FROM sermons WHERE id = @id', { id });
  res.status(201).json(mapSermon(rows[0]));
};

exports.updateSermon = async (req, res) => {
  const { title, speaker, date, category, duration, type, description } = req.body;
  await query(
    `UPDATE sermons SET title=@title, speaker=@speaker, sermon_date=@date, category=@category,
       duration=@duration, type=@type, description=@description WHERE id=@id`,
    { id: req.params.id, title, speaker, date, category, duration, type, description }
  );
  const rows = await query('SELECT * FROM sermons WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Sermon not found' });
  res.json(mapSermon(rows[0]));
};

exports.deleteSermon = async (req, res) => {
  await query('DELETE FROM sermons WHERE id = @id', { id: req.params.id });
  res.status(204).end();
};

// ----------------------------------------------------------------- events

exports.getEvents = async (req, res) => {
  const rows = await query(`
    SELECT e.*, (SELECT COUNT(*) FROM event_registrations r WHERE r.event_id = e.id) AS attendee_count
    FROM events e ORDER BY event_date ASC
  `);
  let registeredIds = new Set();
  if (req.user) {
    const mine = await query(
      'SELECT event_id FROM event_registrations WHERE user_id = @userId',
      { userId: req.user.id }
    );
    registeredIds = new Set(mine.map((m) => m.event_id));
  }
  res.json(rows.map((r) => mapEvent(r, registeredIds.has(r.id))));
};

exports.getEventById = async (req, res) => {
  const rows = await query(`
    SELECT e.*, (SELECT COUNT(*) FROM event_registrations r WHERE r.event_id = e.id) AS attendee_count
    FROM events e WHERE e.id = @id
  `, { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });

  let isRegistered = false;
  if (req.user) {
    const mine = await query(
      'SELECT 1 AS found FROM event_registrations WHERE event_id = @eventId AND user_id = @userId',
      { eventId: req.params.id, userId: req.user.id }
    );
    isRegistered = mine.length > 0;
  }
  res.json(mapEvent(rows[0], isRegistered));
};

exports.createEvent = async (req, res) => {
  const { title, date, time, location, category, description } = req.body;
  const id = uuidv4();
  await query(
    `INSERT INTO events (id, title, event_date, event_time, location, category, description)
     VALUES (@id, @title, @date, @time, @location, @category, @description)`,
    { id, title, date, time, location, category, description }
  );
  const rows = await query('SELECT * FROM events WHERE id = @id', { id });
  res.status(201).json(mapEvent(rows[0], false));
};

exports.updateEvent = async (req, res) => {
  const { title, date, time, location, category, description } = req.body;
  await query(
    `UPDATE events SET title=@title, event_date=@date, event_time=@time, location=@location,
       category=@category, description=@description WHERE id=@id`,
    { id: req.params.id, title, date, time, location, category, description }
  );
  const rows = await query('SELECT * FROM events WHERE id = @id', { id: req.params.id });
  if (rows.length === 0) return res.status(404).json({ message: 'Event not found' });
  res.json(mapEvent(rows[0], false));
};

exports.deleteEvent = async (req, res) => {
  await query('DELETE FROM events WHERE id = @id', { id: req.params.id });
  res.status(204).end();
};

exports.registerForEvent = async (req, res) => {
  const eventId = req.params.id;
  const existing = await query(
    'SELECT id FROM event_registrations WHERE event_id = @eventId AND user_id = @userId',
    { eventId, userId: req.user.id }
  );
  if (existing.length === 0) {
    await query(
      'INSERT INTO event_registrations (id, event_id, user_id) VALUES (@id, @eventId, @userId)',
      { id: uuidv4(), eventId, userId: req.user.id }
    );
  }
  const countRows = await query(
    'SELECT COUNT(*) AS attendee_count FROM event_registrations WHERE event_id = @eventId',
    { eventId }
  );
  res.json({ isRegistered: true, attendeeCount: countRows[0].attendee_count });
};

exports.unregisterFromEvent = async (req, res) => {
  const eventId = req.params.id;
  await query(
    'DELETE FROM event_registrations WHERE event_id = @eventId AND user_id = @userId',
    { eventId, userId: req.user.id }
  );
  const countRows = await query(
    'SELECT COUNT(*) AS attendee_count FROM event_registrations WHERE event_id = @eventId',
    { eventId }
  );
  res.json({ isRegistered: false, attendeeCount: countRows[0].attendee_count });
};

// --------------------------------------------------------- announcements

exports.getAnnouncements = async (req, res) => {
  const rows = await query('SELECT * FROM announcements ORDER BY created_at DESC');
  res.json(rows.map(mapAnnouncement));
};

exports.createAnnouncement = async (req, res) => {
  const { title, body, urgent } = req.body;
  const id = uuidv4();
  await query(
    'INSERT INTO announcements (id, title, body, is_urgent) VALUES (@id, @title, @body, @urgent)',
    { id, title, body, urgent: !!urgent }
  );
  const rows = await query('SELECT * FROM announcements WHERE id = @id', { id });
  res.status(201).json(mapAnnouncement(rows[0]));
};

exports.deleteAnnouncement = async (req, res) => {
  await query('DELETE FROM announcements WHERE id = @id', { id: req.params.id });
  res.status(204).end();
};

// ------------------------------------------------------------- devotions

exports.getDevotions = async (req, res) => {
  const rows = await query('SELECT * FROM devotions ORDER BY devotion_date DESC');
  res.json(rows.map(mapDevotion));
};

exports.getTodayDevotion = async (req, res) => {
  const rows = await query('SELECT TOP 1 * FROM devotions ORDER BY devotion_date DESC');
  if (rows.length === 0) return res.status(404).json({ message: 'No devotion available' });
  res.json(mapDevotion(rows[0]));
};

exports.createDevotion = async (req, res) => {
  const { date, title, verse, reflection } = req.body;
  const id = uuidv4();
  await query(
    `INSERT INTO devotions (id, devotion_date, title, verse, reflection)
     VALUES (@id, @date, @title, @verse, @reflection)`,
    { id, date, title, verse, reflection }
  );
  const rows = await query('SELECT * FROM devotions WHERE id = @id', { id });
  res.status(201).json(mapDevotion(rows[0]));
};

exports.deleteDevotion = async (req, res) => {
  await query('DELETE FROM devotions WHERE id = @id', { id: req.params.id });
  res.status(204).end();
};

// ------------------------------------------------------------------ maps

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

function mapEvent(r, isRegistered) {
  return {
    id: r.id,
    title: r.title,
    date: r.event_date,
    time: r.event_time,
    location: r.location,
    category: r.category,
    description: r.description,
    attendeeCount: r.attendee_count ?? 0,
    isRegistered: !!isRegistered,
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
