import express from 'express'
const router = express.Router()
import { 
    getAllNotebooks,
    getNotebookNotes, 
    addNewNotebook,
    renameNotebook,
    deleteNotebook,
    addNoteToNotebook,
    deleteNoteInNotebook,
} from '../controllers/notebookController.js'

router.route('/').get(getAllNotebooks).post(addNewNotebook)
router.route('/notebook-notes/:id').get(getNotebookNotes)
router.route('/rename/:id').patch(renameNotebook)
router.route('/delete/:id').delete(deleteNotebook)
router.route('/add-note/:id').post(addNoteToNotebook)
router.route('/delete-note/:id').patch(deleteNoteInNotebook)


export default router