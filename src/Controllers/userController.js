const ServerError = require("../AppError/AppError");
const connectiondatabase = require("../database/sqlite/index");
const { hash, compare } = require("bcryptjs");

class usercontroller {
    async create(request, response) {
        const { name, email, senha } = request.body;

        const database = await connectiondatabase();
        
        const userexist = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userexist) {
            throw new ServerError("este email ja está em uso!");
        }

        const passwordexist = await database.get("SELECT * FROM users WHERE password = (?)", [senha]);

        if(passwordexist) {
            throw new ServerError("essa senha ja está em uso!");
        }

        const passwordcrypt = await hash(senha, 10);

        await database.run("INSERT INTO users (nome, email, password) VALUES (?, ?, ?)", [name, email, passwordcrypt]);

        return response.json();
    }

    async update(request, response) {
        const { nome, email, senha, oldpassword } = request.body;
        const { id } = request.params;

        const database = await connectiondatabase();
        
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new ServerError("usuário não encontrado!");
        }

        const updateemailexist = await database.get("SELECT * FROM users  WHERE email = (?)", [email]);

        if(updateemailexist && updateemailexist.id !== user.id) {
            throw new ServerError("este email ja está em uso!");
            // este é para confirmar se o novo email inserido é um email que ja esta em uso por outro cliente
        }
        
        user.nome = nome || user.nome;
        user.email = email || user.email;

        if(senha && !oldpassword) {
            throw new ServerError("é necessário inserir a senha antiga para atualizar sua senha!");
        }

        if(senha && oldpassword) {
            const checkingpassword = await compare(oldpassword, user.password);

            if(!checkingpassword) {
                throw new ServerError("as senhas não conferem");
            }

            user.password = await hash(senha, 10);
        }
 
        await database.run("UPDATE users SET nome = (?), email = (?), password = (?), updated_at = (?) WHERE id = (?)", [user.nome, user.email, user.password, Date.now(), id]);

        return response.json();
    };
}


module.exports = usercontroller;