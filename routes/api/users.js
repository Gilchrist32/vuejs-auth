const express = require('express')
const UserController = require('../../controllers/UserController')
const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:_id', UserController.getUserById)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/dashboard', UserController.dashboard)

module.exports = router