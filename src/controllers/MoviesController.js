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

    async delete(request, response) {
        const { id } = request.params;

        await knex("movies").where({ id }).delete();

        return response.json();
    }

    async update(request, response) {
        const { id } = request.params;
        const  { title, description, rating, tags } = request.body;

        await knex("movies").where({ id }).update({
            title,
            description,
            rating
        });

        if(tags) {
            const tagsInsert = tags.map(name => {
                return {
                    movie_id: id,
                    name
                }
            });
        

        await knex("tags").where({ movie_id: id}).del();
        await knex("tags").insert(tagsInsert);

        }

        return response.json({ id: id});
    }

    async index(request, response) {
        const { search } = request.query;

        let movies;

        if(search) {
            movies = await knex("movies")
                .select([
                    "movies.id",
                    "movies.title",
                    "movies.description",
                    "movies.rating"
                ])
                .whereLike("title", `%${search}%`).orWhereLike("name", `%${search}%`)
                .innerJoin("tags", "movies.id", "tags.movie_id").distinct()
        } 
        else {
            movies = await knex("movies").orderBy("title");
        }


        let tags = await knex("tags")
        movies = movies.map(movie => {
            let filteredTags = tags.filter(tag => {
                return tag.movie_id == movie.id
                    })

            return {
                "id": movie.id,
                "title": movie.title,
                "tags": filteredTags,
                "description": movie.description,
                "rating": movie.rating
            }
        })
        return response.json(movies);

    }


};

module.exports = MoviesController;
