const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(c.getDevotions));
router.get('/today', asyncHandler(c.getTodayDevotion));
router.post('/', authMiddleware, adminMiddleware, asyncHandler(c.createDevotion));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(c.deleteDevotion));

module.exports = router;
