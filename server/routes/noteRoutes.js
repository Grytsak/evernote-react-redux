import express from 'express'
const router = express.Router()
import protect from '../middleware/auth.js'
import { 
    getAllNotes, 
    addNewNote,
    editNote,
    changeNotebook,
    moveNoteToTrash,
    restoreNote,
    deleteNote,
} from '../controllers/noteControllers.js'

router.route('/').get(protect, getAllNotes).post(protect, addNewNote)
router.route('/edit/:id').patch(protect, editNote)
router.route('/change-notebook/:id').patch(protect, changeNotebook)
router.route('/trash/:id').patch(protect, moveNoteToTrash)
router.route('/restore/:id').patch(protect, restoreNote)
router.route('/delete/:id').delete(protect, deleteNote)


export default router