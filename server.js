const express = require('express')
const DotEnv = require('dotenv')
const MongoDBconnected = require('./config/db')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const server = express()
DotEnv.config()
MongoDBconnected()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended : true}))
server.use('/uploads' , express.static('uploads'))
server.use('/public', express.static(path.join(__dirname, 'publci')))

//* user register router
const userRouter = require('./router/user/userRegister.router')
server.use(userRouter)

//* property list
const propertyList = require('./router/user/property.list.router')
server.use(propertyList)

//* property type
const propertyType = require('./router/user/property.type.router')
server.use(propertyType)

//* property agent
const propertyAgent = require('./router/user/property.agent.router')
server.use(propertyAgent)

//* property testimonial
const propertyTestimonial = require('./router/user/property.testimonl.router')
server.use(propertyTestimonial)

//* user contact
const userContact = require('./router/user/userContact.router')
server.use(userContact)

const port = process.env.PORT || 5000
server.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})