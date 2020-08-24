const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', async (req, res) => {
  const todos = await knex('todos').select();
  console.log(todos);
  res.render('all', { title: 'All todos', todos});
});

module.exports = router;
