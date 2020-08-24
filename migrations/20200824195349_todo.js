exports.up = function (knex) {
    return knex.schema.createTable('todos', table => {
        table.increments();
        table.string('title').notNullable();
        table.text('description');
        table.boolean('priority').notNullable().defaultTo(false);
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('todos');
};
