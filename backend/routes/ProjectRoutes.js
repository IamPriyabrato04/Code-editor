import express from 'express';
import ensureAuthenticated from '../middlewares/authMiddleware.js';
import {createProject} from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', ensureAuthenticated, createProject);

export default router;
