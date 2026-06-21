import express from 'express';
import Project from '../models/Project.js';
import protect from '../middlewares/auth.js';
import { cacheMiddleware, clearCache } from '../middlewares/cache.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all portfolio projects (Public)
router.get('/', cacheMiddleware('projects_list', 300), async (req, res) => {
  try {
    // Queries database sorted by newest first
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/projects
// @desc    Create a new project (Admin Only)
router.post('/', protect, async (req, res) => {
  const { title, subtitle, category, image, year, badge, githubUrl, liveUrl } = req.body;

  try {
    const newProject = await Project.create({
      title,
      subtitle,
      category,
      image,
      year,
      badge,
      githubUrl,
      liveUrl
    });

    clearCache('projects_list');
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update an existing project (Admin Only)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Returns the modified document, and runs validation on input
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    clearCache('projects_list');
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project (Admin Only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    clearCache('projects_list');
    res.json({ message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
