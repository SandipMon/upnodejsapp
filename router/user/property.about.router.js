const express = require('express')
const property_about = express.Router()
const uploadsImage = require('../../utils/uploadsImages')
const { authUserjwt } = require('../../middleware/auth')
const { about, aboutCreate, aboutEdit, aboutUpdate, aboutDelete } = require('../../controller/user/property.about.controller')


property_about.get('/about' , authUserjwt, about)
property_about.post('/create/about' , uploadsImage.single('image'), aboutCreate)
property_about.get('/editabout/:id' ,  aboutEdit)
property_about.post('/updateabout/:id' , uploadsImage.single('image'), aboutUpdate)
property_about.get('/deleteabout/:id' ,  aboutDelete)

module.exports= property_about

