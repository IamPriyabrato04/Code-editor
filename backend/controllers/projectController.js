import Project from '../models/projectModel.js';

export const createProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    const userId = req.user.id; // You must populate req.user via auth middleware

    if (!projectName) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const newProject = new Project({
      name: projectName,
      user: userId,
      tree: [], // empty tree
    });

    await newProject.save();

    res.status(201).json({
      message: 'Project created successfully',
      projectId: newProject._id,
    });
    return;
  } catch (err) {
    console.error('Project creation failed:', err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};
