const express = require('express');
const Producto = require('../models/producto.js')
const articulo = require('../models/articulo.js')
const router = express.Router();
const Marca = require('../models/marca.js')
const categoria = require('../models/categoria.js')
const caracteristica = require('../models/caracteristica.js')
const multer  = require('multer');

router.get('/marca',  async (req,res)=>{
  let list = [];
  let val = await  Marca.find()
  console.log(val[45])
  res.json(val)
})
router.get('/caracterisctica/:sap',  async (req,res)=>{
  let list = [];
  console.log(req.params.sap)
  let val = await  caracteristica.find({q:req.params.sap})
  let ico = {}
  console.log(val)
  for( let caracteristicas of val){

    
    let val2 = await  categoria.findOne({atributo:caracteristicas.atributo})
    
    if(val2){
      console.log(val2.icono)
      ico[caracteristicas.atributo] = val2.icono
     
     
    }else{
      
      ico[caracteristicas.atributo] =  "mdi-tools"
     
    }

  }
  
  console.log(ico)
  res.json({"valor":val,"ico":ico})
})
router.get('/categoria/:atributo',  async (req,res)=>{
  let list = [];
  let val = await  categoria.findOne({atributo:req.params.atributo})
  console.log(val)
  res.json(val)
})

router.get('/list',  async (req,res)=>{
  let list = [];
  let val = await  articulo.find().limit(20)
  let cant =  await  articulo.find().count() 

  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
     
      if(ar){
        list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
      }
    }
     
  }

     res.json({list:list,cant:cant})
      })
      router.get('/list/:inicio/:fin',  async (req,res)=>{
        if(req.params.inicio < 0){
          req.params.inicio = 0
        }
        if(req.params.fin < 0){
          req.params.fin = 0
        }
        console.log(req.params.inicio,req.params.fin)
        let list = [];
        let val = await  articulo.find().skip(req.params.inicio).limit(req.params.fin)
        let cont = await  articulo.find().skip(req.params.inicio).limit(req.params.fin).count()
        console.log("fueron "+ cont)
        for( let articulo of val ){
          if(articulo.status){
            let ar = await  Producto.findOne({sap:articulo.sap})
          
            if(ar){
              list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
            }
          }
           
        }
      
           res.json(list)
            })
      

      router.get('/list_des/:desp/:inicio/:fin',  async (req,res)=>{
        //descripcion para la busqueda
        /*{descripcion: { $regex: '.*' +  + '.*' } }  */
        let descrip = req.params.desp
        console.log(descrip)
        let list = [];
      
        let prod = await  Producto.find( {descripcion: { $regex: '.*' + descrip + '.*' } }).skip(req.params.inicio).limit(req.params.fin)
     
        for( let p of prod ){
          let ar = await  articulo.findOne({sap:p.sap})
              
           
           
            if(ar){
              if(ar.status){
              list.push({sap:ar.sap,categoria:ar.categoria,precio:ar.precio,descripcion:p.descripcion,marca:ar.marca,familia:ar.familia,view:true})
            }
          }
           
        }
        console.log(list)
           res.json(list)
            })
      

      router.get('/list/:categoria',  async (req,res)=>{
        let list = [];
        let val = await  articulo.find()
        for( let articulo of val ){
          if(articulo.status && articulo.categoria == req.params.categoria){
            let ar = await  Producto.findOne({sap:articulo.sap})
            if(ar){
              list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
            }
          }
           
        }
          
           res.json(list)
            })

      router.get('/lists',  async (req,res)=>{
        let list = [];
        let val = await  articulo.find()
        for( let articulo of val ){
          if(articulo.status){
            let ar = await  Producto.findOne({sap:articulo.sap})
            if(ar){
              list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
            }
          }
           
        }
          
           res.json(list)
            })
           
       
 

router.get('/getproducto/:sap',  async (req,res)=>{
  console.log(req.params.sap)
 let articulos = await  articulo.findOne({sap:req.params.sap})
 console.log(articulos)
 let ar = await  Producto.findOne({sap:req.params.sap})
 console.log(ar)
    res.json({sap:articulos.sap,categoria:articulos.categoria,precio:articulos.precio,descripcion:ar.descripcion,marca:articulos.marca,familia:articulos.familia,view:true})
     })

module.exports = router;