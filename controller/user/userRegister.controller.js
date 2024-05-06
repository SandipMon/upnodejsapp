const { hashedpassword, comparedpassword } = require('../../middleware/auth')
const userRegisterModel = require('../../model/userRegister.model')
const jwt = require('jsonwebtoken')


const registerCreate = async (req,res)=>{
  try {
      const {name,email,password} = req.body
      if(!(name,email,password)){
        return res.json({message : "Input field required"})
      }
      const user = await userRegisterModel.findOne({email})
      if(user){
        return res.status(500).json({status : false, message : "Email already exists"})
      }
      const hashpassword = await hashedpassword(password)
        const newData = new userRegisterModel({
          name,email,password : hashpassword, role : 'User'
        })
        newData.save()
        return res.status(200).json({status : true, message : "User register successfully", data : newData})

      } catch (error) {
        res.status(500).json({status : false, message : error.message})
      }
}

const loginCreate = async (req,res)=>{
    try {
      const {email,password} = req.body
      if(!(email && password)){
        return res.json({message : "Input field required"})
      }
      const user = await userRegisterModel.findOne({email})
      if(!user){
        return res.status(500).json({status : false, message : "Incorrect email id"})
      }
      const matchPassword = await comparedpassword(password, user.password)
      if(!matchPassword){
        return res.status(500).json({status : false, message : "Incorrect password"})
      }
      const token = await jwt.sign({
        name : user.name,
        email : user.email,
        role : user.role,
      }, process.env.JWT_SECRET,{ expiresIn : "12h" })
      return res.status(200).json({status : true, message : "User Login successfully",
        user : {
        name : user.name,
        email : user.email,
        role : user.role,
        },
        token
    })    
    } catch (error) {
      return res.status(500).json({status : false, message : error})      
    }
}

const dashboard = async (req,res)=>{
  return res.status(200).json({status : true, message : 'Welcome to User Dashboard', data : req.user})      

}

const updateUser = async (req,res)=>{
  try {
    const {user_id,name,email,password} = req.body
    if(!(user_id && name && email && password)){
      return res.json({message : "Input field required"})
    }
    const user = await userRegisterModel.findOne({_id:user_id})
    if(user){
      const hashpassword = await hashedpassword(password)
      await userRegisterModel.findByIdAndUpdate({_id : user_id},{
        $set : {

          name : req.body.name,
          email : req.body.email,
          password : hashpassword,

        }
      })
      return res.status(200).json({status : false, message : "Update successfully"})
    }
  } catch (error) {
    return res.status(500).json({status : false, message : error.message}) 
    
  }
}

const forgetUser = async (req,res)=>{
  try {
    const {name,email,newPassword} = req.body
    if(!(name,email,newPassword)){
      res.json({message : "Input field required"})
    }
    const user = await userRegisterModel.findOne({name,email})
    if(!user){
      res.status(500).json({status : false, message : "Wrong name or email"})
    }
    const hashpassword = await hashedpassword(newPassword)
    await userRegisterModel.findByIdAndUpdate(user._id,{
      $set : {
        name : req.body.name,
        email : req.body.email,
        password : hashpassword,
      }
    })
    res.status(200).json({status : true, message : "Data update successfully!!"})

  } catch (error) {
    res.status(500).json({status : false, message : error})
    
  }
}


module.exports = {
  registerCreate,
  loginCreate,
  dashboard,
  updateUser,
  forgetUser
}