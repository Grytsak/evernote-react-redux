import express from 'express'
const router = express.Router()
import { 
    getAllNotes, 
    addNewNote,
    editNote,
    changeNotebook,
    moveNoteToTrash,
    restoreNote,
    deleteNote,
} from '../controllers/noteControllers.js'

router.route('/').get(getAllNotes).post(addNewNote)
router.route('/edit/:id').patch(editNote)
router.route('/change-notebook/:id').patch(changeNotebook)
router.route('/trash/:id').patch(moveNoteToTrash)
router.route('/restore/:id').patch(restoreNote)
router.route('/delete/:id').delete(deleteNote)


export default router