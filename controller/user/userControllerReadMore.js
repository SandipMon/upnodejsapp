const propertyAboutModel = require('../../model/property.about')


const readMoreAbout = async (req,res)=>{
  try {
  const id = req.params.id
  const allData = await propertyAboutModel.findById(id)
  if(allData){    
    res.status(200).json({status : true, message : 'Read More', data : allData})
  }
  } catch (error) {
    console.log(error);
  }  
}


module.exports = {
  readMoreAbout
}