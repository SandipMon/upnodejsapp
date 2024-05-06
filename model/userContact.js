const mongoose = require('mongoose')

const userContactModel = new mongoose.Schema({

      name : {
        type : String,
      },
      email : {
        type : String,
      },
      subject : {
        type : String,
      },
      message : {
        type : String,
      },
      status : {
        type : String,
        default : 1
      }

})

module.exports = mongoose.model('usercontact' , userContactModel)