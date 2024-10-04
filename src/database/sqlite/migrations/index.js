const connectiondatabase = require("../index");
const createUsers = require("./createUsers");

async function migrationsUsers() {
    const schemas = [
        createUsers
    ].join('')

    connectiondatabase().then(db => db.exec(schemas)).catch(error => console.error(error));
}

module.exports = migrationsUsers;