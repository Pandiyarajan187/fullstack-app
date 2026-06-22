const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get("/", async (req, res) => {
      const projects = await Project.find();
      res.json(projects);
});

// @route   POST api/projects
// @desc    Create a new project
// @access  Public
router.post("/", authMiddleware, async (req, res) => {

      const project = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            members: req.body.members,
            createdBy: req.user.id
      }
      const projectData = await Project.create(project);
      res.status(201).json(projectData);
});

// @route   GET api/projects/:id
// @desc    Get a Single project by ID
// @access  Public
router.get("/:id", async (req, res) => {
      const project = await Project.findById(req.params.id);
      if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
      }
      res.json(project);
});

// @route   PUT api/projects/:id
// @desc    Update a project by ID
// @access  Public
router.put("/:id", authMiddleware, async (req, res) => {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
      }
      res.json(project);
});

// @route   DELETE api/projects/:id
// @desc    Delete a project by ID
// @access  Public
router.delete("/:id", authMiddleware, async (req, res) => {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
      }
      res.json({ msg: 'Project deleted', project });
});

module.exports = router;