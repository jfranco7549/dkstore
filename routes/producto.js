const express = require('express');
const Producto = require('../models/producto.js')
const articulo = require('../models/articulo.js')
const router = express.Router();
const Marca = require('../models/marca.js')
const categoria = require('../models/categoria.js')
const caracteristica = require('../models/caracteristica.js')
const multer  = require('multer');


//devuelve la marca
router.get('/marca',  async (req,res)=>{
  try{
    let list = [];
    let val = await  Marca.find()
    console.log(val[45])
    res.json(val)

  }catch(err){
    res.json({})
  }

})
router.get('/caracterisctica/:sap',  async (req,res)=>{
try{

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

}catch(err){
  console.log(err)
res.json({"valor":'s',"ico":'se'})
}
})
router.get('/categoria/:atributo',  async (req,res)=>{
try{
  let list = [];
  let val = await  categoria.findOne({atributo:req.params.atributo})
  console.log(val)
  res.json(val)
}catch(err){
  res.json({})
}
})
router.get('/destacado',  async (req,res)=>{
 try{
  let list = [];
  let val = await  articulo.find({status:true}).limit(4)
  for(let i of val){

    list.push(i.sap)
    
  }
 
  res.json(list)
 }catch(err){
  console.log(err)
 }
})
router.get('/lineas/:linea',  async (req,res)=>{
  try{
    let list = [];
  let cant  =  await  articulo.find({familia:req.params.linea,status:true}).count()

  cant = cant - 4
  cant = Math.round(Math.random() * cant)
  console.log(cant)
  console.log(cant+4)
  let val = await  articulo.find({familia:req.params.linea,status:true}).skip(cant).limit(4)
  
  for(let i of val){

    list.push(i.sap)
    
  }
  console.log(list,req.params.linea)
  res.json(list)

  }catch(err){
    console.log(err)
    res.json({})

  }
  
})

router.get('/list',  async (req,res)=>{
try{
  let list = [];
  let val = await  articulo.find({status:true}).limit(20)
  let cant =  await  articulo.find({status:true}).count() 

  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
     
      if(ar){
        list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
      }
    }
     
  }

     res.json({list:list,cant:cant})
}catch(err){
  console.log(err)
  res.json({list:[],cant:0})
}
      })
      router.get('/list/:inicio/:fin',  async (req,res)=>{
        try{
          if(req.params.inicio < 0){
            req.params.inicio = 0
          }
          if(req.params.fin < 0){
            req.params.fin = 0
          }
          console.log(req.params.inicio,req.params.fin)
          let list = [];
          let val = await  articulo.find({status:true}).skip(req.params.inicio).limit(req.params.fin)
          let cont = await  articulo.find({status:true}).skip(req.params.inicio).limit(req.params.fin).count()
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

        }catch(err){
          console.log(err)
          res.json(list)

        }
            })
      
//162 lista con descripcion 
      router.get('/list_des/:desp/:inicio/:fin',  async (req,res)=>{

            try{
                     //descripcion para la busqueda
        /*{descripcion: { $regex: '.*' +  + '.*' } }  */
        let descrip = req.params.desp
        console.log(descrip)
        let list = [];
      
        let prod = await  Producto.find( {descripcion: { $regex: '.*' + descrip + '.*' },status:true }).skip(req.params.inicio).limit(req.params.fin)
     
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

            }catch(err){
              console.log(err,"162")
              res.json([])
            }
            })
            router.get('/list_linea/:desp/:inicio/:fin',  async (req,res)=>{

              try{
                       //descripcion para la busqueda
          /*{descripcion: { $regex: '.*' +  + '.*' } }  */
          let descrip = req.params.desp
          console.log(descrip)
          let list = [];
        
          let ar = await  articulo.find({familia:descrip,status:true}).skip(req.params.inicio).limit(req.params.fin)
       console.log(ar)
          for( let p of ar ){ Producto
            let prod = await  Producto.findOne({sap:p.sap})
                
             
             
              if(prod){
                list.push({sap:p.sap,categoria:p.categoria,precio:p.precio,descripcion:prod.descripcion,marca:p.marca,familia:p.familia,view:true})
            }
             
          }
          console.log(list)
             res.json(list)
  
              }catch(err){
                console.log(err,"162")
                res.json([])
              }
              })
      
//194 listado por categoria
      router.get('/list/:categoria',  async (req,res)=>{
      try{
        let list = [];
        let val = await  articulo.find({status:true})
        for( let articulo of val ){
          if(articulo.status && articulo.categoria == req.params.categoria){
            let ar = await  Producto.findOne({sap:articulo.sap})
            if(ar){
              list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
            }
          }
           
        }
          
           res.json(list)
      }catch(err){
        console.log(err,"194")
        res.json({})
      }
            })
//214 listado de articulos completo
      router.get('/lists',  async (req,res)=>{
 try{
  let list = [];
  let val = await  articulo.find( {status:true} )
  for( let articulo of val ){
    if(articulo.status){
      let ar = await  Producto.findOne({sap:articulo.sap})
      if(ar){
        list.push({sap:articulo.sap,categoria:articulo.categoria,precio:articulo.precio,descripcion:ar.descripcion,marca:articulo.marca,familia:articulo.familia,view:true})
      }
    }
     
  }
    
     res.json(list)
 }catch(err){
  console.log(err,"214")
  res.json({})
 }
            })
           
       
 
//237 optiene informacion del [producto ]
router.get('/getproducto/:sap',  async (req,res)=>{
try{
  console.log(req.params.sap)
  let articulos = await  articulo.findOne({sap:req.params.sap})
  console.log(articulos)
  let ar = await  Producto.findOne({sap:req.params.sap})
  console.log(ar)
     res.json({sap:articulos.sap,categoria:articulos.categoria,precio:articulos.precio,descripcion:ar.descripcion,marca:articulos.marca,familia:articulos.familia,view:true})
    
}catch(err){
  console.log(err,'237')
  res.json({})
}
  })

module.exports = router;