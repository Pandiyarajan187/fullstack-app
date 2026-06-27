const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/tasks
// @desc    Create a new task
// @access  Public
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, status, project, assignedTo } = req.body;

    const newTask = new Task({ title, description, status, project, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
});

// @route   GET api/tasks   
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// GET /api/tasks/project/:projectId  →  find all tasks where project === projectId
// @route   GET api/tasks/project/:projectId
// @desc    Get all tasks for a specific project
// @access  Public
router.get('/project/:projectId', async (req, res) => {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
});

// @route   GET api/tasks/:id
// @desc    Get a single task by ID
// @access  Public
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.json(task);
});

// @route   PUT api/tasks/:id
// @desc    Update a task by ID
// @access  Public
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, status, project, assignedTo } = req.body;

    const taskData = await Task.findById(req.params.id);
    if (!taskData) {
        return res.status(404).json({ msg: 'Task not found' });
    }

    taskData.title = title || taskData.title;
    taskData.description = description || taskData.description;
    taskData.status = status || taskData.status;
    taskData.project = project || taskData.project;
    taskData.assignedTo = assignedTo || taskData.assignedTo;

    const createdTask = await taskData.save();
    res.json(createdTask);
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task by ID
// @access  Public
router.delete('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.json({ msg: 'Task deleted', task });
});

module.exports = router;