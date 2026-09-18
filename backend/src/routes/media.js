const express = require('express');
const mediaController = require('../controllers/mediaController');
const asyncHandler = require('../utils/asyncHandler');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', asyncHandler(mediaController.getAll));
router.post('/', authMiddleware, adminMiddleware, upload.single('file'), asyncHandler(mediaController.upload));
router.delete('/:id', authMiddleware, adminMiddleware, asyncHandler(mediaController.remove));

module.exports = router;
