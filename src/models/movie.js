import dataJSON from "../utillitaries/readJSON.cjs"
import { randomUUID } from "node:crypto"

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const filterData = dataJSON[0].filter(movie => {
                return movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
            })
            if (filterData.length === 0) {
                return false
            }
            return filterData
        }
        return dataJSON[0]
    }
    static async getById({ id }) {
        const index = dataJSON[0].findIndex(movie => movie.id == id)
        if (index === -1) {
            return false
        }
        const findedMovie = dataJSON[0][index]
        return findedMovie
    }
    static async create({ input }) {
        console.log(input)
        const newMovie = {
            id: randomUUID(),
            ...input
        }
        dataJSON[0].push(newMovie)
        return newMovie
    }
    static async update({ id, input }) {
        const index = dataJSON[0].findIndex(movie => movie.id == id)
        if (index < 0) {
            return false
        }
        const updateMovie = {
            ...dataJSON[0][index],
            ...input
        }
        dataJSON[0][index] = updateMovie
        return updateMovie
    }
    static async delete({ id }) {
        const index = dataJSON[0].findIndex(movies => movies.id == id)
        if (index < 0) {
            return false
        }
        const deletedMovie = dataJSON[0].splice(index, 1)
        return deletedMovie
    }
}