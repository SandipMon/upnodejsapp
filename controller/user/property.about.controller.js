const propertyAboutModel = require('../../model/property.about')
const path = require('path')
const fs = require('fs')


const about = async (req,res)=>{
  const allAbout = await propertyAboutModel.find()
  res.json({message : 'All About Data' , About : allAbout})
}

const aboutCreate = async (req,res) =>{
  try {
    const {image,title,sub_title,para} = req.body
    if(!(title && sub_title && para)){
      return res.json({message : "Input fields required"})
    }    
    const newAbout = new propertyAboutModel({
      image,title,sub_title,para
    })
    if(req.file){
      newAbout.image = req.file.path
    }
    const allAboutdata = await newAbout.save()
    if(allAboutdata){      
    return res.status(200).json({status : true, message : "About created successfully", aboutdata : allAboutdata})
    }
  } catch (error) {
    return res.status(500).json({status : false, message : error.message})    
  }
}

const aboutEdit =async(req,res)=>{
  try{
      const id = req.params.id
    const editAbout =await propertyAboutModel.findById(id)
    if(editAbout){
      return res.json({status: true , message:"Edit Testimonial successfully", editAboutdata : editAbout})
    }
  }catch(error){

  }
}

const aboutUpdate =async(req,res)=>{
try{
  const id=req.params.id
  const newImage = req.file.path;
  const oldImage = await propertyAboutModel.findById(id)
    fs.unlinkSync(oldImage.image)
  const updateAbout = await propertyAboutModel.findByIdAndUpdate(id,
    {
      image: newImage,
      title : req.body.title,
      sub_title : req.body.sub_title,
      para : req.body.para
    },
    { new: true }
  )    
      if(updateAbout){
        return res.status(200).json({status:true,message:"Update About successfully", data:updateAbout})
      }
  }catch(error){  
    console.log(error);
    return res.status(500).json({status : false, message : error.message})   
}
}

const aboutDelete = async(req,res)=>{
try{
  const id = req.params.id
      const deleteAbout = await propertyAboutModel.findByIdAndDelete(id)
      if(deleteAbout){
      return res.json({status: true , message:"Delete About successfully"})
      }  
    }catch(error){
      console.log(error);
      return res.status(500).json({status : false, message : error.message})  
    }
}


module.exports  = {
  about,
  aboutCreate,
  aboutEdit,
  aboutUpdate,
  aboutDelete
}