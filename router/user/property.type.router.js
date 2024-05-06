const express = require('express')
const property_type = express.Router()
const uploadsImage = require('../../utils/uploadsImages')
const { propertyType, propertyTypeCreate, propertyTypeEdit, propertyTypeUpdate, propertyTypeDelete } = require('../../controller/user/property.type.controller')
const { authUserjwt } = require('../../middleware/auth')

property_type.get('/propertytype' , authUserjwt, propertyType)
property_type.post('/create/propertytype' , uploadsImage.single('image'), propertyTypeCreate)
property_type.get('/editpropertytype/:id' ,  propertyTypeEdit)
property_type.post('/updatepropertytype/:id' , uploadsImage.single('image'), propertyTypeUpdate)
property_type.get('/deletepropertytype/:id' ,  propertyTypeDelete)

module.exports= property_type

