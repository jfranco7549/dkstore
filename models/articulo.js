const mongoose = require('mongoose')
const { Schema } = mongoose;

const articulo = new  Schema({
 sap:String,
 status:Boolean,
 precio:Number,
 marca:String,
 familia:String,
 promo:String
})

module.exports = mongoose.model('articulo',articulo,'articulo');