const express = require('express');
let {io} = require('../index')

console.log(io)
const router = express.Router();



const multer  = require('multer');
const upload = multer({ dest: "/img" });



router.get('/',  async (req,res)=>{
  res.redirect('/postventa')
     })

module.exports = router;