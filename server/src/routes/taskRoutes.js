/*
Create server/src/routes/taskRoutes.js
Build these routes:
POST /api/tasks — create a task
GET /api/tasks — get all tasks
GET /api/tasks/:id — get a single task
PUT /api/tasks/:id — update a task (also used to change status)
DELETE /api/tasks/:id — delete a task
*/

// check project not projectId in task model and routes

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @route   POST api/tasks
// @desc    Create a new task
// @access  Public
router.post('/', async (req, res) => {
    const { title, description, status, project, assignedTo } = req.body;

    try {
        const newTask = new Task({ title, description, status, project, assignedTo });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/tasks   
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/tasks/:id
// @desc    Get a single task by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/tasks/:id
// @desc    Update a task by ID
// @access  Public
router.put('/:id', async (req, res) => {
    const { title, description, status, project, assignedTo } = req.body;

    try {
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
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task by ID
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.json({ msg: 'Task deleted', task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;