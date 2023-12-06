const express = require('express');

const router = express.Router();



const multer  = require('multer');

router.get('/',  async (req,res)=>{
  
    res.render('condicion')
  
     })

router.get('/:id',  async (req,res)=>{
  if(!req.params.id){
    res.render('condicion')
  }else{
    res.render('condicion'+req.params.id)
  }
     })

module.exports = router;