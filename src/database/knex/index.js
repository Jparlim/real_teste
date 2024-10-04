const config = require("../../../knexfile");
const knex = require("knex");

const connectionknex = knex(config.development);
//aqui vou falar que minha conexão e uma conexão knex e vou passar quais são as configurações de conexão;
// a configuração é a pasta knexfile onde eu fiz a conexão do knex na minha biblioteca database.db;


module.exports = connectionknex;