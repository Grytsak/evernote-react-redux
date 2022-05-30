import express from "express"
import connectDB from "./db/connect.js"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import noteRoutes from './routes/noteRoutes.js'
import notebookRoutes from './routes/notebookRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/notes', noteRoutes)
app.use('/api/notebooks', notebookRoutes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
