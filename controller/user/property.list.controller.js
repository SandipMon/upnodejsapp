const propertyListModel = require('../../model/property.list')
const path = require('path')
const fs = require('fs')


const propertyList = async (req,res)=>{
  const allpropertylist = await propertyListModel.find()
  res.json({message : 'All Product Type Page' , propertylist : allpropertylist})
}

const propertyListCreate = async (req,res) =>{
  try {
    const {image,title,amount,header,address,measuremant,type,bath,categories} = req.body
    if(!(title && amount && header && address && measuremant && type && bath && categories)){
      return res.json({message : "Input fields required"})
    }    
    const newProperty = new propertyListModel({
      image,title,amount,header,address,measuremant,type,bath,categories
    })
    if(req.file){
      newProperty.image = req.file.path
    }
    const allProperty = await newProperty.save()
    if(allProperty){      
    return res.status(200).json({status : true, message : "Property created successfully", propertytData : allProperty})
    }
  } catch (error) {
    res.status(500).json({status : false, message : error.message})    
  }
}

const propertyListEdit =async(req,res)=>{
  try{
    const id = req.params.id
    const eduitPropertyList =await propertyListModel.findById(id)
    if(eduitPropertyList){
      return res.json({status: true , message:"Edit Product List ", editProductlist : eduitPropertyList})
    }

  }catch(error){

  }
}

const propertyListUpdate =async(req,res)=>{
  try{
    const id=req.params.id
    const newImage = req.file.path;
    const oldImage = await propertyListModel.findById(id)
      fs.unlinkSync(oldImage.image)
    const updateProductList = await propertyListModel.findByIdAndUpdate(id,
      {
        image : newImage,
        title : req.body.title,
        amount : req.body.amount,
        header : req.body.header,
        address : req.body.address,
        measuremant : req.body.measuremant,
        type : req.body.type,
        bath : req.body.bath,
        categories : req.body.categories
      },
      { new: true }
    )    
        if(updateProductList){
          return res.status(200).json({status:true,message:"Update Product List successfully", data:updateProductList})
        }
    }catch(error){  
      console.log(error);
      return res.status(500).json({status : false, message : error.message})   
  }
  }

const propertyListDelete = async(req,res)=>{
    try{
      const id = req.params.id
          const deletePropertyList = await propertyListModel.findByIdAndDelete(id)
          if(deletePropertyList){
          return res.json({status: true , message:"Delete Product Type "})
          }  
        }catch(error){
          console.log(error);
          return res.status(500).json({status : false, message : error.message})  
        }
    }

const propertyListForSell = async (req,res)=>{
      const sellList = await propertyListModel.findOne({categories : "Sell"})
      if(sellList){
        res.json({message : 'All Sell Property List', sellList})
      }  
  }

const propertyListForRent = async (req,res)=>{
  const rentList = await propertyListModel.findOne({categories : "Rent"})
  if(rentList){
    res.json({message : 'All Rent Property List', rentList})
  }
}


module.exports  = {
  propertyList,
  propertyListCreate,
  propertyListEdit,
  propertyListUpdate,
  propertyListDelete,
  propertyListForSell,
  propertyListForRent
}