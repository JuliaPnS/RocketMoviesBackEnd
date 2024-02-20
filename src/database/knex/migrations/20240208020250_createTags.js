exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name");
    table.integer("movie_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");


});

exports.down = knex => knex.schema.dropTable("tags");