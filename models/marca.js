const mongoose = require('mongoose')
const { Schema } = mongoose;

const marca = new  Schema({
 nombre:String,
 telefono:Number,
 web:String,
 tipo:String,
})

module.exports = mongoose.model('marca',marca,'marca');