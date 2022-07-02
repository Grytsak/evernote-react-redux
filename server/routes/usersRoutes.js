import express from 'express'
const router = express.Router()
import protect from '../middleware/auth.js'
import { 
    registerUser, 
    loginUser,
    getMe
} from '../controllers/usersControllers.js'

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router