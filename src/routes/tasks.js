const express = require('express');
const router = express.Router();
const pool = require('../db');

//get all tasks
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
});

//get single task
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [1]);

        if(result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found'});
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error'});
    }
});

//create task
router.post('/', async (req, res) => {
    try {
        const {title, description} = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required'});
        }

        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error'});
    }
});

//update task
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;

        const result = await pool.query(
            'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), completed = COALESCE($3, completed) WHERE id = $4 RETURNING *',
            [title, description, completed, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found'});
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error'});
    }
});

//delete task
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'TASK not found'});
        }

        res.json({ message: 'Task deleted successfully', task: result.rows[0]});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error'});
    }
});

module.exports = router;