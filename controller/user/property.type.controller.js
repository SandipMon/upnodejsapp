const propertyTypeModel = require('../../model/property.type')
const path = require('path')
const fs = require('fs')


const propertyType = async (req,res)=>{
  const allproperty = await propertyTypeModel.find()
  res.json({message : 'All Product Type Page' , propertytype : allproperty})
}

const propertyTypeCreate = async (req,res) =>{
  try {
    const {image,title,sub_title} = req.body
    if(!(title && sub_title)){
      return res.json({message : "Input fields required"})
    }    
    const newPropertyType = new propertyTypeModel({
      image,title,sub_title
    })
    if(req.file){
      newPropertyType.image = req.file.path
    }
    const allPropertyType = await newPropertyType.save()
    if(allPropertyType){      
    return res.status(200).json({status : true, message : "Property Type created successfully", propertytTypeData : allPropertyType})
    }
  } catch (error) {
    return res.status(500).json({status : false, message : error.message})    
  }
}

const propertyTypeEdit =async(req,res)=>{
  try{
      const id = req.params.id
    const eduitPropertyType =await propertyTypeModel.findById(id)
    if(eduitPropertyType){
      return res.json({status: true , message:"Edit Product Type ", editProducttype : eduitPropertyType})
    }

  }catch(error){

  }
}

const propertyTypeUpdate =async(req,res)=>{
try{
  const id=req.params.id
  const newImage = req.file.path;
  const oldImage = await propertyTypeModel.findById(id)
    fs.unlinkSync(oldImage.image)
  const updateProductType = await propertyTypeModel.findByIdAndUpdate(id,
    {
      image: newImage,
      title : req.body.title,
      sub_title : req.body.sub_title
    },
    { new: true }
  )    
      if(updateProductType){
        return res.status(200).json({status:true,message:"Update Product Type successfully", data:updateProductType})
      }
  }catch(error){  
    console.log(error);
    return res.status(500).json({status : false, message : error.message})   
}
}

const propertyTypeDelete = async(req,res)=>{
try{
  const id = req.params.id
      const deletePropertyType = await propertyTypeModel.findByIdAndDelete(id)
      if(deletePropertyType){
      return res.json({status: true , message:"Delete Product Type "})
      }  
    }catch(error){
      console.log(error);
      return res.status(500).json({status : false, message : error.message})  
    }
}


module.exports  = {
  propertyType,
  propertyTypeCreate,
  propertyTypeEdit,
  propertyTypeUpdate,
  propertyTypeDelete
}