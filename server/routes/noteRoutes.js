import express from 'express'
const router = express.Router()
import { 
    getAllNotes, 
    addNewNote,
    editNote,
    deleteNote
} from '../controllers/noteControllers.js'

router.route('/').get(getAllNotes).post(addNewNote)
router.route('/edit/:id').patch(editNote)
router.route('/delete/:id').delete(deleteNote)


export default router