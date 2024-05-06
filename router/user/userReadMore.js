const express = require('express')
const { readMoreAbout } = require('../../controller/user/userControllerReadMore')
const user_readmore = express.Router()


user_readmore.get('/readmoreabout:id' , readMoreAbout)


module.exports = user_readmore