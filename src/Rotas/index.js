const { Router } = require("express");

const userRoute = require('./user.Routes');

const Routes = Router();

Routes.use("/usuario", userRoute);



module.exports = Routes;