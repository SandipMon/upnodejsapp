const express = require('express')
const property_agent = express.Router()
const uploadsImage = require('../../utils/uploadsImages')
const { authUserjwt } = require('../../middleware/auth')
const { propertyAgent, propertyAgentCreate, propertyAgentEdit, propertyAgentUpdate, propertyAgentDelete } = require('../../controller/user/property.agent.controller')


property_agent.get('/propertagent' , authUserjwt, propertyAgent)
property_agent.post('/create/propertyagent' , uploadsImage.single('image'), propertyAgentCreate)
property_agent.get('/editpropertyagent/:id' ,  propertyAgentEdit)
property_agent.post('/updatepropertyagent/:id' , uploadsImage.single('image'), propertyAgentUpdate)
property_agent.get('/deletepropertyagent/:id' ,  propertyAgentDelete)

module.exports= property_agent

