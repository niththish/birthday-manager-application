const express = require('express')
const router = express.Router()
const { getAllBirthdays, insertBirthday, updateBirthday, deleteBirthday } = require('../controllers/birthdays')

router.get('/',getAllBirthdays)
router.post('/',insertBirthday)
router.patch('/:id',updateBirthday)
router.delete('/:id',deleteBirthday)
module.exports = router