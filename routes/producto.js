const express = require('express');
const Producto = require('../models/producto.js')
const articulo = require('../models/articulo.js')
const router = express.Router();



const multer  = require('multer');

router.get('/list',  async (req,res)=>{
  let list = [];
  let val = await  articulo.find().limit(200)
  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
      if(ar){
        list.push({sap:articulo.sap,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
      }
    }
     
  }
    
     res.json(list)
      })
 

router.get('/getproducto/:sap',  async (req,res)=>{
  console.log(req.params.sap)
 let val = await  Producto.find({sap:req.params.sap})

     console.log(val)
    res.json(val[0])
     })

module.exports = router;