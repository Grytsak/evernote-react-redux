import mongoose from 'mongoose'
import Notebook from './Notebook.js'

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'must provide title']
        },
        content: {
            type: String,
        },
        notebook: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'note must have notebook'],
            ref: 'Notebook',
        },
        inTrash: {
            type: Boolean,
            default: false
        },
        beforeTrashNotebook: {
            type: String,
            ref: 'Notebook'
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model('Note', noteSchema)
export default Note