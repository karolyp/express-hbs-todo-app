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
    await respondAndRenderTodo(req, res, 'todo', 'Todo');
});

router.get('/:id/edit', async (req, res) => {
    await respondAndRenderTodo(req, res, 'edit', 'Edit todo');
});

router.put('/:id', async (req, res) => {
    if (isTodoValid(req.body)) {
        const id = req.params.id;
        const todo = {title, description, priority} = req.body;
        await knex('todos')
            .where({id})
            .update(todo, 'id');
        res.redirect(`/todos/${id}`)
    } else {
        res.sendStatus(404);
    }
});

async function respondAndRenderTodo(req, res, viewName, title) {
    const id = req.params.id;
    const todo = await knex('todos').select().where({id}).first();
    if (todo) {
        todo.created_at = todo.created_at.toLocaleString();
        res.render(viewName, {title, todo});
    } else {
        res.sendStatus(404);
    }
}

function isTodoValid(todo) {
    return todo.title && todo.priority;
}

module.exports = router;
