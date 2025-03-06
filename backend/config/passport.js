import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Local Strategy (Email & Password Authentication)
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      // 🔹 Generate JWT Token on successful login
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return done(null, user, { token });
    } catch (error) {
      return done(error, false);
    }
  })
);

// 🔹 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        // 🔹 Generate JWT Token for Google-authenticated users
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return done(null, user, { token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// 🔹 JWT Strategy (Protecting Routes)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// 🔹 Serialize & Deserialize User (for session handling, not needed for JWT)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
