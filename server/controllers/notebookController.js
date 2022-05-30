import Note from '../models/Note.js'
import Notebook from '../models/Notebook.js'
import asyncWrapper from '../middleware/async.js'

// @desc    Get all notebooks
// @route   GET /api/notebooks
// @access  Private
export const getAllNotebooks = asyncWrapper(async (req, res) => {
    const notebooks = await Notebook.find({})
    res.status(200).json(notebooks)
})

// @desc    Add new notebook
// @route   POST /api/notebooks
// @access  Private
export const addNewNotebook = asyncWrapper(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please provide name for notebook')
    }

    let notebook = {}

    if(req.body.role) {
        notebook = await Notebook.create({
            name: req.body.name,
            role: req.body.role,
        })
    } else {
        notebook = await Notebook.create({
            name: req.body.name,
        })
    }
    

    res.status(200).json(notebook)
})

// @desc    Edit notebook
// @route   PATCH /api/notebooks
// @access  Private
export const editNotebook = asyncWrapper(async (req, res) => {
    const notebook = await Notebook.findById(req.params.id)

    if(!notebook) {
        res.status(400)
        throw new Error('Notebook not found')
    }

    const editedNotebook = await Notebook.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(editedNotebook)
})

// @desc    Delete notebook
// @route   DELETE /api/notebooks/:id
// @access  Private
export const deleteNotebook = asyncWrapper(async (req, res) => {
    const notebook = await Notebook.findById(req.params.id)

    if(!notebook) {
        res.status(400)
        throw new Error('Notebook not found')
    }

    await notebook.remove()
    res.status(200).json(req.params.id)
})

// @desc    Add note to notebook
// @route   POST /api/notebooks/add-note
// @access  Private
export const addNoteToNotebook = asyncWrapper(async (req, res) => {
    const { noteID, notebookID } = req.body
    const notebook = await Notebook.findByIdAndUpdate(
        notebookID, 
        {$push: {"notes": noteID}},
        {new: true})
    res.status(200).json(notebook)
})

// @desc    Delete note in notebook
// @route   PATCH /api/notebooks/delete-note/:id
// @access  Private
export const deleteNoteInNotebook = asyncWrapper(async (req, res) => {
    const { noteID, notebookID } = req.body
    const notebook = await Notebook.findByIdAndUpdate(
        notebookID, 
        {$pull: {"notes": noteID}},
        {new: true})
    res.status(200).json(notebook)
})