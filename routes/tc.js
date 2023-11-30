const express = require('express');

const router = express.Router();



const multer  = require('multer');



router.get('/',  async (req,res)=>{
  res.redirect('test.html')
     })

module.exports = router;