const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashedpassword = async (password)=>{
  try {
    return await bcrypt.hash(password,10)
  } catch (error) {
    console.log(error);
  }
}

const comparedpassword = (password, hashedpassword)=>{
  return bcrypt.compare(password, hashedpassword)
}

const authUserjwt = async (req,res,next)=>{
  const token = 
  req.body.token || req.query.token || req.headers['x-access-token']
  if(!token){
    return res.status(500).json({status : false, message : "You are not authenticate user"})
  }try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode
  } catch (error) {
    return res.status(500).josn({status : false, message : "Invalid token"})
  }
  next()
}

module.exports = {
  hashedpassword,
  comparedpassword,
  authUserjwt
}