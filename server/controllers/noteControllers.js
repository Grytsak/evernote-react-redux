import Note from '../models/Note.js'
import Notebook from '../models/Notebook.js'
import asyncWrapper from '../middleware/async.js'

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
export const getAllNotes = asyncWrapper(async (req, res) => {
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const notes = await Note.find({user: req.user.id})
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

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const note = await Note.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        notebook: req.body.notebook
    })

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

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNote)
})

// @desc    Change notes nodebook
// @route   PATCH /api/notes/change-notebook/:id
// @access  Private
export const changeNotebook = asyncWrapper(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(401)
        throw new Error('Note not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNote)
})

// @desc    Move note to trash
// @route   PATCH /api/trash/edit/:id
// @access  Private
export const moveNoteToTrash = asyncWrapper(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(401)
        throw new Error('Note not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNote)
})

// @desc    Restore note
// @route   PATCH /api/restore/edit/:id
// @access  Private
export const restoreNote = asyncWrapper(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(401)
        throw new Error('Note not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
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

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await note.remove()
    res.status(200).json(req.params.id)
})