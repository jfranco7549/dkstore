const express = require('express');
let {io} = require('../index')

console.log(io)
const router = express.Router();



const multer  = require('multer');
const upload = multer({ dest: "/img" });



router.post('/sendvideo', upload.single('file'),  async (req,res)=>{
  console.log('dddddddddddd',req.file)
      io.emit('ChangerVideo',req.file)
      res.send('envio')
     })

module.exports = router;