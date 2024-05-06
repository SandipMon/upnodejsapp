const express = require('express')
const { propertyListCreate, propertyList, propertyListEdit, propertyListUpdate, propertyListDelete, propertyListForSell, propertyListForRent } = require('../../controller/user/property.list.controller')
const property_list = express.Router()
const uploadsImage = require('../../utils/uploadsImages')
const { authUserjwt } = require('../../middleware/auth')


property_list.get('/propertylist' ,authUserjwt, propertyList)
property_list.post('/create/propertylist' , uploadsImage.single('image'), propertyListCreate)
property_list.get('/editpropertylist/:id' ,  propertyListEdit)
property_list.post('/updatepropertylist/:id' , uploadsImage.single('image'), propertyListUpdate)
property_list.get('/deletepropertylist/:id' ,  propertyListDelete)
property_list.get('/propertylist/sell' ,authUserjwt, propertyListForSell)
property_list.get('/propertylist/rent' ,authUserjwt, propertyListForRent)


module.exports= property_list

