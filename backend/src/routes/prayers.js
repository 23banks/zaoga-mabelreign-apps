const express = require('express');
const prayerController = require('../controllers/prayerController');
const { validate, schemas } = require('../utils/validators');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(prayerController.getAll));
router.post('/', validate(schemas.prayerRequest), asyncHandler(prayerController.create));
router.post('/:id/pray', asyncHandler(prayerController.pray));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(prayerController.remove));

module.exports = router;
