require("express-async-errors");

const express = require("express");
const app = express();

const migrationsUsers = require("./src/database/sqlite/migrations/index");
const ServerError = require("./src/AppError/AppError");
const Routes = require("./src/Rotas/index");

app.use(express.json());

app.use(Routes);
migrationsUsers();

app.use((error, request, response, next) => {
    
    if(error instanceof ServerError) {
        return response.status(error.statuscode).json({
            statuscode: "error",
            message: error.message
        });
    }
    
    console.error(error);
    
    return response.statuscode(500).json({
        statuscode: "error",
        message: "erro interno do servidor"
    });
    
});

app.listen(3000, () => console.log('ola mundo!'));