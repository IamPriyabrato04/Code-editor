import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: false }, // only Google OAuth users will have this
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { 
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if Google ID is not present
        }
    },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);