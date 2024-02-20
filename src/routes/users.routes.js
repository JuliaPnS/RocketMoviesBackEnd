const  { Router } = require("express");

const usersRoutes = Router();

const UsersControllers = require("../controllers/UsersControllers");
const usersController = new UsersControllers();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;