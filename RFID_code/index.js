const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM3', baudRate: 9600 })
const express=require("express");
var cors = require('cors')
const bodyParser = require('body-parser')
const app=express();

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('open',function(){
    console.log('connection is opened');
})

app.listen(5000, ()=>{
    console.log("Server is up at 5000");
});

var num = false

parser.on('data',function(data){
    num = data
    console.log(num)
});

app.get("/",(req,res)=>{
    res.send(num)
})

parser.on('error',function(err){
    console.log(err.message);
});