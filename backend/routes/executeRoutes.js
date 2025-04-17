import express from "express";
import { executeController } from '../controllers/executeController.js';


const router = express.Router();
// Route to execute code
router.post("/execute", executeController,()=>{
    console.log("Request received:", req.body);
});

export default router;