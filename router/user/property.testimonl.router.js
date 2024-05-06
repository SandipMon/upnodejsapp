const express = require('express')
const property_testimonial = express.Router()
const uploadsImage = require('../../utils/uploadsImages')
const { authUserjwt } = require('../../middleware/auth')
const { testimonial, testimonialCreate, testimonialEdit, testimonialUpdate, testimonialDelete } = require('../../controller/user/property.testimonl.controller')

property_testimonial.get('/testimonialdata' , authUserjwt, testimonial)
property_testimonial.post('/create/testimonial' , uploadsImage.single('image'), testimonialCreate)
property_testimonial.get('/edittestimonial/:id' ,  testimonialEdit)
property_testimonial.post('/updatetestimonial/:id' , uploadsImage.single('image'), testimonialUpdate)
property_testimonial.get('/deletetestimonial/:id' ,  testimonialDelete)

module.exports= property_testimonial

