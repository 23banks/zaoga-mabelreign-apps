const express = require('express');
const prayerController = require('../controllers/prayerController');
const { validate, schemas } = require('../utils/validators');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(prayerController.getAll));
router.post('/', validate(schemas.prayerRequest), asyncHandler(prayerController.create));
router.post('/:id/pray', asyncHandler(prayerController.pray));

module.exports = router;
