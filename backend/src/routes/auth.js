const express = require('express');
const authController = require('../controllers/authController');
const { validate, schemas } = require('../utils/validators');
const { authMiddleware } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/register', validate(schemas.userRegister), asyncHandler(authController.register));
router.post('/login', validate(schemas.userLogin), asyncHandler(authController.login));
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, asyncHandler(authController.me));

module.exports = router;
