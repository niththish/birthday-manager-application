const express = require('express')
const router = express.Router()
const { getAllBirthdays, insertBirthday } = require('../controllers/birthdays')

router.get('/',getAllBirthdays)
router.post('/',insertBirthday)

module.exports = router