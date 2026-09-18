const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/me', authMiddleware, asyncHandler(userController.getMe));
router.put('/me', authMiddleware, asyncHandler(userController.updateMe));
router.get('/', authMiddleware, adminMiddleware, asyncHandler(userController.getAll));
router.put('/:id/role', authMiddleware, adminMiddleware, asyncHandler(userController.updateRole));

module.exports = router;
