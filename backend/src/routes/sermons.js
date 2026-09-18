const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(c.getSermons));
router.get('/:id', asyncHandler(c.getSermonById));
router.post('/', authMiddleware, adminMiddleware, asyncHandler(c.createSermon));
router.put('/:id', authMiddleware, adminMiddleware, asyncHandler(c.updateSermon));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(c.deleteSermon));

module.exports = router;
