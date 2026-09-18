const express = require('express');
const testimonyController = require('../controllers/testimonyController');
const { validate, schemas } = require('../utils/validators');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', asyncHandler(testimonyController.getAll));
router.post('/', validate(schemas.testimony), asyncHandler(testimonyController.create));
router.post('/:id/like', asyncHandler(testimonyController.like));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(testimonyController.remove));

module.exports = router;
