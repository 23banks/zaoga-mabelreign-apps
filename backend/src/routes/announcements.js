const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(c.getAnnouncements));
router.post('/', authMiddleware, adminMiddleware, asyncHandler(c.createAnnouncement));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(c.deleteAnnouncement));

module.exports = router;
