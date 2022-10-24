import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import express from "express"
import connectDB from "./db/connect.js"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import noteRoutes from './routes/noteRoutes.js'
import notebookRoutes from './routes/notebookRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/users', usersRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/notebooks', notebookRoutes)

// if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  )
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
// }

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
