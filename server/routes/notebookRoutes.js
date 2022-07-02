import express from 'express'
const router = express.Router()
import protect from '../middleware/auth.js'
import { 
    getAllNotebooks,
    getNotebookNotes, 
    addNewNotebook,
    renameNotebook,
    deleteNotebook,
    addNoteToNotebook,
    deleteNoteInNotebook,
} from '../controllers/notebookController.js'

router.route('/').get(protect, getAllNotebooks).post(protect, addNewNotebook)
router.route('/notebook-notes/:id').get(protect, getNotebookNotes)
router.route('/rename/:id').patch(protect, renameNotebook)
router.route('/delete/:id').delete(protect, deleteNotebook)
router.route('/add-note/:id').post(protect, addNoteToNotebook)
router.route('/delete-note/:id').patch(protect, deleteNoteInNotebook)


export default router