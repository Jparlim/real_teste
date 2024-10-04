exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.integer("noote_id").references("id").inTable("users").onDelete("CASCADE");
    table.text("url");

    table.timestamp("created_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("links");
