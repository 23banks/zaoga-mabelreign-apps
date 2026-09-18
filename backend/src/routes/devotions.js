const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(c.getDevotions));
router.get('/today', asyncHandler(c.getTodayDevotion));

module.exports = router;
