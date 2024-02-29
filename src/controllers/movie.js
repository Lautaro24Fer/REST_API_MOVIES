import { validateMovieSchema, validatePartialMovieSchema } from "../schemas/movie.js";
import { MovieModel } from "../models/movie.js";

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.params
        const result = await MovieModel.getAll({ genre })
        if (!result) {
            return res.status(400).json({ GENRE_ERROR: "genre not founded", GENRE: genre })
        }
        res.status(200).send(result)
    }
    static async getById(req, res) {
        const { id } = req.params
        const result = await MovieModel.getById({ id })
        if (!result) {
            return res.status(400).json({ ID_ERROR: "Id not founded", ID: id })
        }
        return res.status(200).send(result)
    }
    static async create(req, res) {
        const newMovie = req.body
        const validate = validateMovieSchema(newMovie)
        if (validate.error) {
            return res.status(400).json({ VALIDATE_ERROR: validate.error })
        }
        const result = await MovieModel.create({ input: newMovie })
        if (!result) {
            return res.status(400).json({ CREATE_ERROR: "Create recurse failed" })
        }
        return res.status(200).send(result)
    }
    static async update(req, res) {
        const input = req.body
        const partialValidate = validatePartialMovieSchema(input)
        if (partialValidate.error) {
            return res.status(400).json({ error: partialValidate.error })
        }
        const { id } = req.params
        const updatedMovie = await MovieModel.update({ id: id, input: input })
        if (!updatedMovie) {
            return res.status(400).json({ ID_ERROR: "Id not founded", ID: id })
        }
        return res.status(200).json({ result: updatedMovie })
    }
    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id: id })
        if (!result) {
            return res.status(400).json({ ID_ERROR: "Id not founded", ID: id })
        }
        return res.status(200).json({ deleted: result })
    }
}