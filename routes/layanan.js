const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const AuthController = require('../controllers/Layanan')

router.get('/', AuthController.fetchAllData)
router.get('/:id', AuthController.fetchLayanan)

router.post('/', AuthController.addData)


module.exports = router