const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', async (req, res) => {
    const todos = await knex('todos').select();
    res.render('all', {title: 'All todos', todos});
});

router.get('/new', (req, res) => {
    res.render('new', {title: 'New todo'});
});

router.post('/', async (req, res) => {
    if (isTodoValid(req.body)) {
        const todo = {title, description, priority} = req.body;
        const id = await knex('todos').insert(todo, 'id');
        res.redirect(`/todos/${id}`);
    } else {
        res.status(400);
        res.render('error', {
            message: 'Invalid input'
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await knex('todos').select().where({id}).first();
    if (todo) {
        todo.created_at = todo.created_at.toLocaleString();
        res.render('todo', {title: `Todo #${id}`, todo});
    } else {
        res.status(404);
        res.render('error', {
            message: `Cannot find todo with id ${id}`
        });
    }
});

function isTodoValid(todo) {
    return todo.title && todo.priority;
}

module.exports = router;
