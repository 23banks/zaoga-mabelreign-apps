const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/me', authMiddleware, asyncHandler(userController.getMe));
router.put('/me', authMiddleware, asyncHandler(userController.updateMe));

module.exports = router;
