const express = require('express');
const c = require('../controllers/contentController');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(c.getEvents));
router.get('/:id', asyncHandler(c.getEventById));

module.exports = router;
