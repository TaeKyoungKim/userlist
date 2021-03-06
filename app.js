var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config();
var bodyParser = require('body-parser')

var listRouter = require('./router/index')


app.set('views', path.join(__dirname,'views'));
app.set('view engine' , 'ejs');

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', listRouter)

var port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(` Server is Starting at http://localhost:${port}`)
})