const express = require('express');
let {io} = require('../index')

console.log(io)
const router = express.Router();



const multer  = require('multer');
const upload = multer({ dest: "/img" });

router.get('/c2p',  async (req,res)=>{
  res.render('c2p')
     })

router.get('/',  async (req,res)=>{
  
  res.render('index')
  //res.redirect('index.html')
     })
    

module.exports = router;