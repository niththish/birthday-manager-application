const express = require('express')
const router = express.Router()
const {getAllBirthdays, getMonthwiseBirthdays} = require('../controllers/birthdays')

router.get('/',getAllBirthdays)
router.get('/:monthId',getMonthwiseBirthdays)

module.exports = router