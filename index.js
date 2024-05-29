const express = require('express');

const app = express();

const http = require('http');
const https = require('https');

const server = http.createServer(app);
const fs = require('fs');
var options = {
    key: fs.readFileSync('./ssl/code.key'),
    cert: fs.readFileSync('./ssl/code.crt')
  };
  https.createServer(options, app).listen(443);
var compression = require('compression')

const router = express.Router();

 const multer  = require('multer');

 const mongoose = require('mongoose')
 //const mongouri = 'mongodb://software:gAB0n5P6&D@149.50.135.10:54210/dkstore'
 const mongouri = 'mongodb://software:gAB0n5P6&D@149.50.135.10:54210/dkstore'
 //const mongouri = 'mongodb://localhost:27017/dkstore'
 
 // const mongouri = "mongodb+srv://jfranco:musiuito@cluster0.ogvcv9d.mongodb.net/?retryWrites=true&w=majority"
 mongoose.connect(mongouri).then(db => console.log('DB is Conneted')).catch( err => {
     console.log(err)
 })


 app.set('view engine', 'ejs');
app.use(compression())

app.use('/', require('./routes/socket.js'));
app.use('/direccion', require('./routes/direccion.js'));
app.use('/producto', require('./routes/producto.js'));
app.use('/postventa', require('./routes/tc.js'));


app.use(express.static( __dirname+'/public' ))
//app.use('/socket', require('./routes/socket'));

server.listen(80, () => {
 console.log('listening on *:8085');
});


