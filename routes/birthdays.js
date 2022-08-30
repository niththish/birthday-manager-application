const express = require('express')
const router = express.Router()
const { getAllBirthdays, insertBirthday, updateBirthday } = require('../controllers/birthdays')

router.get('/',getAllBirthdays)
router.post('/',insertBirthday)
router.patch('/:id',updateBirthday)

module.exports = router