import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({
        title,
        description,
        user: req.user.id
    });

    try {
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskById = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndUpdate(id, { title, description });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { status });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};