import Note from '../models/Note.js'
import Notebook from '../models/Notebook.js'
import asyncWrapper from '../middleware/async.js'

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
export const getAllNotes = asyncWrapper(async (req, res) => {
    const notes = await Note.find({})
    res.status(200).json(notes)
})

// @desc    Add new note
// @route   POST /api/notes
// @access  Private
export const addNewNote = asyncWrapper(async (req, res) => {
    if(!req.body.title) {
        res.status(400)
        throw new Error('Please provide title for note')
    }

    const note = await Note.create({
        title: req.body.title,
        content: req.body.content,
        notebook: req.body.notebook
    })

    const notebook = await Notebook.findByIdAndUpdate(req.body.notebook, req.body.notebook, {new: true})

    res.status(200).json(note)
})

// @desc    Edit note
// @route   PATCH /api/notes/edit/:id
// @access  Private
export const editNote = asyncWrapper(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(401)
        throw new Error('Note not found')
    }

    const editedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNote)
})

// @desc    Delete note
// @route   DELETE /api/notes/delete/:id
// @access  Private
export const deleteNote = asyncWrapper(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(400)
        throw new Error('Note not found')
    }

    await note.remove()
    res.status(200).json(req.params.id)
})