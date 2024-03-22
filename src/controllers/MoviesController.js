const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        
        const [movie_id] = await knex("movies").insert({
            title,
            description, 
            rating
        });

        const tagsInsert = tags.map(name => {
            return {
                movie_id,
                name
            }
        });

        await knex("tags").insert(tagsInsert);

        return response.json({ id: movie_id});

    }

    async show(request, response) {
        const { id } = request.params;

        const movie = await knex("movies").where({ id }).first();
        const tags =  await knex("tags").where({ movie_id: id }).orderBy("name");
        
        return response.json({
            ...movie,
            tags
        });
    }


};

module.exports = MoviesController;
