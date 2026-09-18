const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

const router = express.Router();

router.get('/', optionalAuth, asyncHandler(c.getEvents));
router.get('/:id', optionalAuth, asyncHandler(c.getEventById));
router.post('/', authMiddleware, adminMiddleware, asyncHandler(c.createEvent));
router.put('/:id', authMiddleware, adminMiddleware, asyncHandler(c.updateEvent));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(c.deleteEvent));
router.post('/:id/register', authMiddleware, asyncHandler(c.registerForEvent));
router.post('/:id/unregister', authMiddleware, asyncHandler(c.unregisterFromEvent));

module.exports = router;
