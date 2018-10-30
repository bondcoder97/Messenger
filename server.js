var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();





app.get('/', function(req,res) {
    res.sendFile(__dirname+'/main.html');
});



app.use(express.static(__dirname));




io.on('connection', function(socket){
    
    
  socket.on('user message', function(msg){
    
      socket.emit('my message', msg);
      socket.broadcast.emit('my message',msg);
    
  });
    
    
    
    
   
    
    
});



 




http.listen(3000,function() {
    console.log("Соединение прошло успешно!");
    
  
});
  
    
    



//"45.77.184.185"