const mongoose = require('mongoose')

const propertyListSchema = new mongoose.Schema({

      image : {
        type : String,
        required : true,
      },
      title : {
        type : String,
        required : true,
      },
      amount : {
        type : String,
        required : true,
      },
      header : {
        type : String,
        required : true,
      },
      address : {
        type : String,
        required : true,
      },
      measuremant : {
        type : String,
        required : true,
      },
      type : {
        type : String,
        required : true,
      },
      bath : {
        type : String,
        required : true,
      },
      categories : {
        type : String,
      },
      status : {
        type : String,
        default : 1,
      }

},{timestamps : true})

module.exports = mongoose.model('property_list_model' , propertyListSchema)