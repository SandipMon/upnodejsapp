const express = require('express')
const { registerCreate, loginCreate, dashboard, updateUser, forgetUser } = require('../../controller/user/userRegister.controller')
const { authUserjwt } = require('../../middleware/auth')
const user_register = express.Router()


user_register.post('/register' , registerCreate)
user_register.post('/login' , loginCreate)
user_register.get('/dashboard' ,authUserjwt, dashboard)
user_register.post('/update' ,authUserjwt, updateUser)
user_register.post('/forget' , forgetUser)


module.exports = user_register