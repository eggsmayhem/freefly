const express = require('express')
const router = express.Router()
const fetchController = require('../controllers/fetch')

router.get('/', fetchController.getFetch)

router.post('/', fetchController.fetchSong)

module.exports = router 