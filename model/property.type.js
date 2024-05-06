const mongoose = require('mongoose')

const propertyTypeSchema = new mongoose.Schema({

      image : {
        type : String,
        required : true,
      },
      title : {
        type : String,
        required : true,
      },      
      sub_title : {
        type : String,
        required : true,
      },
      status : {
        type : String,
        default : 1
      }

},{timestamps : true})

module.exports = mongoose.model('property_type_model' , propertyTypeSchema)