const express = require('express')
const router = express.Router()
const { getAllBirthdays, getMonthwiseBirthdays, insertBirthday } = require('../controllers/birthdays')

router.get('/',getAllBirthdays)
router.get('/:monthId',getMonthwiseBirthdays)
router.post('/',insertBirthday)

module.exports = router