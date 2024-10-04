const { Router } = require('express');

const usercontroller = require('../Controllers/userController');
const UserController = new usercontroller();

const userRoute = Router(); 

userRoute.post("/", UserController.create);
userRoute.put("/:id", UserController.update);

module.exports = userRoute;