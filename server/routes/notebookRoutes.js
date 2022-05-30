import express from 'express'
const router = express.Router()
import { 
    getAllNotebooks, 
    addNewNotebook,
    editNotebook,
    deleteNotebook,
    addNoteToNotebook,
    deleteNoteInNotebook,
} from '../controllers/notebookController.js'

router.route('/').get(getAllNotebooks).post(addNewNotebook)
router.route('/edit/:id').patch(editNotebook)
router.route('/delete/:id').delete(deleteNotebook)
router.route('/add-note').post(addNoteToNotebook)
router.route('/delete-note').patch(deleteNoteInNotebook)


export default router