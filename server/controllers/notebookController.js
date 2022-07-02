import Note from '../models/Note.js'
import Notebook from '../models/Notebook.js'
import asyncWrapper from '../middleware/async.js'

// @desc    Get all notebooks
// @route   GET /api/notebooks
// @access  Private
export const getAllNotebooks = asyncWrapper(async (req, res) => {
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }


    const notebooks = await Notebook.find({user: req.user.id})
    res.status(200).json(notebooks)
})

// @desc    Get notebook notes
// @route   GET /api/notebook-notes/:id
// @access  Private
export const getNotebookNotes = asyncWrapper(async (req, res) => {
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    const notebook = await Notebook.findById(req.params.id).populate('notes') 

    if(!notebook) {
        res.status(400)
        throw new Error('Notebook not found')
    }
    res.status(200).json(notebook.notes)
})

// @desc    Add new notebook
// @route   POST /api/notebooks
// @access  Private
export const addNewNotebook = asyncWrapper(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please provide name for notebook')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    let notebook = {}

    if(req.body.role) {
        notebook = await Notebook.create({
            user: req.user.id,
            name: req.body.name,
            role: req.body.role,
        })
    } else {
        notebook = await Notebook.create({
            user: req.user.id,
            name: req.body.name,
        })
    }
    

    res.status(200).json(notebook)
})

// @desc    Rename notebook
// @route   PATCH /api/notebooks/rename/:id
// @access  Private
export const renameNotebook = asyncWrapper(async (req, res) => {
    const notebook = await Notebook.findById(req.params.id)

    if(!notebook) {
        res.status(400)
        throw new Error('Notebook not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(notebook.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedNotebook = await Notebook.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNotebook)
})

// @desc    Delete notebook
// @route   DELETE /api/notebooks/delete/:id
// @access  Private
export const deleteNotebook = asyncWrapper(async (req, res) => {
    const notebook = await Notebook.findById(req.params.id)

    if(!notebook) {
        res.status(400)
        throw new Error('Notebook not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(notebook.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await notebook.remove()
    res.status(200).json(req.params.id)
})

// @desc    Add note to notebook
// @route   POST /api/notebooks/add-note/:id
// @access  Private
export const addNoteToNotebook = asyncWrapper(async (req, res) => {
    const { noteID, notebookID } = req.body
    const notebook = await Notebook.findById(notebookID)

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(notebook.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const notebookUpdated = await Notebook.findByIdAndUpdate(
        notebookID, 
        {$push: {"notes": noteID}},
        {new: true})

    res.status(200).json(notebookUpdated)
})

// @desc    Delete note in notebook
// @route   PATCH /api/notebooks/delete-note/:id
// @access  Private
export const deleteNoteInNotebook = asyncWrapper(async (req, res) => {
    const { noteID, notebookID } = req.body
    const notebook = await Notebook.findById(notebookID)

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the task user
    if(notebook.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const notebookUpdated = await Notebook.findByIdAndUpdate(
        notebookID, 
        {$pull: {"notes": noteID}},
        {new: true}).populate('notes')
    res.status(200).json({notebookUpdated, noteID})
})