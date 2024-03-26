const { Router } = require("express");

const moviesRoutes = Router();

const MoviesController = require("../controllers/MoviesController")
const moviesController = new MoviesController();

moviesRoutes.post("/", moviesController.create);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);
moviesRoutes.put("/:id", moviesController.update);

module.exports = moviesRoutes;
