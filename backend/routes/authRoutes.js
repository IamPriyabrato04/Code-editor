import express from 'express';
// import passport from 'passport';
import ensureAuthenticated from '../middlewares/authMiddleware.js';
import { signup, login, logout, googleAuth, googleCallback, dashboard } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/dashboard', ensureAuthenticated, dashboard);

export default router;