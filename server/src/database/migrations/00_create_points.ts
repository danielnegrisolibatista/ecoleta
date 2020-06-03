import Knex from 'knex'; // tipo knex

export async function up(knex: Knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whataspp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('logintude').notNullable();
    table.string('uf', 2).notNullable();
    table.string('city').notNullable();
  });
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('point');
}