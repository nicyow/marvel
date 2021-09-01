const express = require('express')
const characterController = require('../controllers/character-controller')

const router = express.Router()

router.get('/', characterController.get)
router.get('/:id', characterController.getById)

module.exports = router