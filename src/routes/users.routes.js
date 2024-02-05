const  { Router } = require=("express");

const UsersControllers = require("../controllers/UsersControllers");
const usersController = new UsersControllers();

const usersRoutes = Router();


usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;