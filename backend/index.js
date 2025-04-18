// server.js
import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import executeRoutes from './routes/executeRoutes.js';

import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


  
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


// Routes
app.use("/auth", authRoutes);
app.use("/api", executeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));
