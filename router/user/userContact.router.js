const express = require('express')
const userContactcreate = require('../../controller/user/userContact.controller')
const user_contact = express.Router()
const { authUserjwt } = require('../../middleware/auth')


user_contact.post('/create/contact' , userContactcreate)


module.exports = user_contact