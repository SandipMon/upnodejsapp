const propertyTestimonialModel = require('../../model/property.testimonial')
const path = require('path')
const fs = require('fs')


const testimonial = async (req,res)=>{
  const allTestimonial = await propertyTestimonialModel.find()
  res.json({message : 'All Testimonial Data' , testimonial : allTestimonial})
}

const testimonialCreate = async (req,res) =>{
  try {
    const {image,title,sub_title,para} = req.body
    if(!(title && sub_title && para)){
      return res.json({message : "Input fields required"})
    }    
    const newTestimonial = new propertyTestimonialModel({
      image,title,sub_title,para
    })
    if(req.file){
      newTestimonial.image = req.file.path
    }
    const allTestimonialdata = await newTestimonial.save()
    if(allTestimonialdata){      
    return res.status(200).json({status : true, message : "Testimonial created successfully", testimonialdata : allTestimonialdata})
    }
  } catch (error) {
    return res.status(500).json({status : false, message : error.message})    
  }
}

const testimonialEdit =async(req,res)=>{
  try{
      const id = req.params.id
    const editTestimonial =await propertyTestimonialModel.findById(id)
    if(editTestimonial){
      return res.json({status: true , message:"Edit Testimonial successfully", editTestimonialdata : editTestimonial})
    }
  }catch(error){

  }
}

const testimonialUpdate =async(req,res)=>{
try{
  const id=req.params.id
  const newImage = req.file.path;
  const oldImage = await propertyTestimonialModel.findById(id)
    fs.unlinkSync(oldImage.image)
  const updateTestimonial = await propertyTestimonialModel.findByIdAndUpdate(id,
    {
      image: newImage,
      title : req.body.title,
      sub_title : req.body.sub_title
    },
    { new: true }
  )    
      if(updateTestimonial){
        return res.status(200).json({status:true,message:"Update Testimonial successfully", data:updateTestimonial})
      }
  }catch(error){  
    console.log(error);
    return res.status(500).json({status : false, message : error.message})   
}
}

const testimonialDelete = async(req,res)=>{
try{
  const id = req.params.id
      const deleteTestimonial = await propertyTestimonialModel.findByIdAndDelete(id)
      if(deleteTestimonial){
      return res.json({status: true , message:"Delete Testimonial successfully"})
      }  
    }catch(error){
      console.log(error);
      return res.status(500).json({status : false, message : error.message})  
    }
}


module.exports  = {
  testimonial,
  testimonialCreate,
  testimonialEdit,
  testimonialUpdate,
  testimonialDelete
}