const mongoose = require('mongoose')

const userRegisterSchema = new mongoose.Schema({

        name : {
          type : String,
          required : true,
        },
        email : {
          type : String,
          required : true,
        },
        password : {
          type : String,
          required : true,
        },
        role : {
          type : String,
        },
        status : {
          type : String,
          default : 1
        }

},{timestamps : true})


module.exports = mongoose.model('user_register', userRegisterSchema)