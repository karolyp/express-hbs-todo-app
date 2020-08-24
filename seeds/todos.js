exports.seed = function (knex) {
    return knex('todos').del()
        .then(function () {
            const todos = [
                {
                    title: 'Boltba menni',
                    priority: 1
                },
                {
                    title: 'Mosogatni',
                    priority: 2
                },
                {
                    title: 'Full stack appot fejleszteni',
                    priority: 5
                },
                {
                    title: 'Főzni',
                    priority: 3
                }
            ];
            return knex('todos').insert(todos);
        });
};
