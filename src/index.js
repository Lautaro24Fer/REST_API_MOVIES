import express from "express"
import { moviesRouter } from "./pages/movie.js"
import { corsMiddleware } from "./middlewares/cors.js"

const app = express()

app.use(express.json())
app.disable("x-powered-by")
app.use(corsMiddleware)
app.use("/movies", moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})