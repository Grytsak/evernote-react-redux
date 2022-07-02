import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncWrapper from '../middleware/async.js'
import User from '../models/User.js'
import Notebook from '../models/Notebook.js'


// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncWrapper(async (req, res) => {
    const { name, email, password } = req.body

    // Check if all fields are filled
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =  await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (user) {
        await Notebook.create({
            user,
            name: 'Common',
            notes: [],
            role: 'common'
        })
    
        await Notebook.create({
            user,
            name: 'Trash',
            notes: [],
            role: 'trash'
        })

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
}) 

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncWrapper(async (req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}