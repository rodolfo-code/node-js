exports.up = function (knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      // .onDelete('CASCADE')
      // .onUpdate('CASCADE')
      .notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accounts');
};
