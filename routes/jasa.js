const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')

const AuthController = require('../controllers/Jasa')

router.get('/', AuthController.fetchAllData)
router.get('/:id', AuthController.fetchData)
router.get('/layanan/:id', AuthController.fetchDataLayanan)

router.post('/', upload.single('thumbnail'), AuthController.addData)
router.delete('/:id', AuthController.deleteData)

router.patch('/:id', AuthController.modifData)

router.delete('/thumbnail/:id', AuthController.deleteThumbnail)
router.post('/thumbnail/:id', upload.single('thumbnail'), AuthController.addThumbnail)


module.exports = router