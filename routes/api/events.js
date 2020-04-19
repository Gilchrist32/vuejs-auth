const express = require('express')
const EventController = require('../../controllers/EventController')
const router = express.Router()

router.get('/', EventController.getEvents)
router.post('/', EventController.addEvent)

module.exports = router