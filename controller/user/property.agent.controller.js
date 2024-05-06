const propertyAgentModel = require('../../model/property.agent')
const path = require('path')
const fs = require('fs')


const propertyAgent = async (req,res)=>{
  const allagent = await propertyAgentModel.find()
  res.json({message : 'All Agent Page' , propertyagent : allagent})
}

const propertyAgentCreate = async (req,res) =>{
  try {
    const {image,title,sub_title} = req.body
    if(!(title && sub_title)){
      return res.json({message : "Input fields required"})
    }    
    const newAgentType = new propertyAgentModel({
      image,title,sub_title
    })
    if(req.file){
      newAgentType.image = req.file.path
    }
    const allAgentType = await newAgentType.save()
    if(allAgentType){      
    return res.status(200).json({status : true, message : "Property Type created successfully", agentdata : allAgentType})
    }
  } catch (error) {
    return res.status(500).json({status : false, message : error.message})    
  }
}

const propertyAgentEdit =async(req,res)=>{
  try{
      const id = req.params.id
    const eduitPropertyType =await propertyAgentModel.findById(id)
    if(eduitPropertyType){
      return res.json({status: true , message:"Edit Product Type ", editProducttype : eduitPropertyType})
    }

  }catch(error){

  }
}

const propertyAgentUpdate =async(req,res)=>{
try{
  const id=req.params.id
  const newImage = req.file.path;
  const oldImage = await propertyAgentModel.findById(id)
    fs.unlinkSync(oldImage.image)
  const updateProductType = await propertyAgentModel.findByIdAndUpdate(id,
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

const propertyAgentDelete = async(req,res)=>{
try{
  const id = req.params.id
      const deletePropertyType = await propertyAgentModel.findByIdAndDelete(id)
      if(deletePropertyType){
      return res.json({status: true , message:"Delete Product Type "})
      }  
    }catch(error){
      console.log(error);
      return res.status(500).json({status : false, message : error.message})  
    }
}


module.exports  = {
  propertyAgent,
  propertyAgentCreate,
  propertyAgentEdit,
  propertyAgentUpdate,
  propertyAgentDelete
}