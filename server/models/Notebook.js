import mongoose from 'mongoose'
import Note from './Note.js'

const notebookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'must provide name']
        },
        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Note'
        }],
        role: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Notebook = mongoose.model('Notebook', notebookSchema)
export default Notebook