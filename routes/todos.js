const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', async (req, res) => {
  const todos = await knex('todos').select();
  res.render('all', { title: 'All todos', todos});
});

router.get('/new', (req, res) => {
  res.render('new', {title: 'New todo'});
});

module.exports = router;
