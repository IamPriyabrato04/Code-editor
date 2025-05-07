// models/Project.js
import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['file', 'folder'], required: true },
  path: String,
  children: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tree: { type: [FileSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Project', ProjectSchema);
