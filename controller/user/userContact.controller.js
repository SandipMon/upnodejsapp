const contactModel = require('../../model/userContact')

const userContactcreate = async (req,res)=>{
  try {
    const {name,email,subject,message} = req.body
    const newContact = new contactModel({
      name,email,subject,message
    })
    const allcontact = await newContact.save()
    if(allcontact){
      res.status(200).json({status : true, message : "Contact created successfully", data : allcontact})
    }
  } catch (error) {
    
  }
}

module.exports = userContactcreate