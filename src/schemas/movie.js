import z from "zod"

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "The title movie must be a string",
        required_error: "The title movie must be required"
    }),
    director: z.string({
        invalid_type_error: "The director name must be a string",
        required_error: "The director name must be required"
    }),
    releaseYear: z.number().int().min(1900),
    genres: z.array(z.enum(["Crime", "Drama", "Action", "Romance", "Adventure", "Sci-Fi"])),
    criticScore: z.number().int().positive().max(100),
    description: z.string()
})

export function validateMovieSchema(object) {
    return movieSchema.safeParse(object)
}

export function validatePartialMovieSchema(object) {
    return movieSchema.partial().safeParse(object)
}