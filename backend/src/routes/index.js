const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const sermonRoutes = require('./sermons');
const eventRoutes = require('./events');
const prayerRoutes = require('./prayers');
const testimonyRoutes = require('./testimonies');
const devotionRoutes = require('./devotions');
const mediaRoutes = require('./media');
const announcementRoutes = require('./announcements');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sermons', sermonRoutes);
router.use('/events', eventRoutes);
router.use('/prayer-requests', prayerRoutes);
router.use('/testimonies', testimonyRoutes);
router.use('/devotions', devotionRoutes);
router.use('/media', mediaRoutes);
router.use('/announcements', announcementRoutes);

router.get('/', (req, res) => {
  res.json({
    name: 'ZAOGA FIF API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
