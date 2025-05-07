import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Function to generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 User Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password }); // pre-save hook hashes password
    await user.save();

    const token = generateToken(user);

    res.status(201).json({ message: "User registered", token });
    return ;
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: err.message });
    return ;
  }
};

// 🔹 User Login (JWT Auth)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Logged in", token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 🔹 Google Authentication (Redirects to Google)
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// 🔹 Google Callback (Handles OAuth response)
export const googleCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/" }, async (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/");

    try {
      const { email, displayName, id: googleId } = user;

      let existingUser = await User.findOne({ email });

      if (!existingUser) {
        // Ensure the username is unique
        let uniqueUsername = displayName;
        let count = 1;

        while (await User.findOne({ username: uniqueUsername })) {
          uniqueUsername = `${displayName}_${count}`;
          count++;
        }

        // Create a new user
        existingUser = new User({
          email,
          username: uniqueUsername, // Assign unique username
          googleId
        });

        await existingUser.save();
      }

      // Log in the user (for session-based auth)
      req.login(existingUser, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.redirect("/dashboard");
      });

    } catch (error) {
      console.error("OAuth Error:", error);
      res.status(500).send("Internal Server Error");
    }
  })(req, res, next);
};


// 🔹 Dashboard Route (Protected)
export const dashboard = (req, res) => {
  res.json({ user: req.user });
};

// 🔹 User Logout
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Logged out" });
  });
};