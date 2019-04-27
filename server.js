var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");
var mysql = require('mysql');

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();




var conn = mysql.createConnection({
    database: 'andrey',
    host: "localhost",
    user: "root",
    password: "password",
    insecureAuth : true
  });

  
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });






app.get('/', function(req,res) {
    res.sendFile(__dirname+'/auth.html');
});



app.use(express.static(__dirname));




io.on('connection', function(socket){
    
    
  socket.on('user message', function(msg){
    
      socket.emit('my message', msg);
      socket.broadcast.emit('my message',msg);
    
  });
    
  socket.on('auth',function(message){
      
      conn.query(`SELECT password FROM auth WHERE name ='${message.login}'`,function(err,result){
             
                
             if(result.length>0){
             if(result[0].password == message.password){
                socket.emit('status query');
             app.get('/main', function(req,res) {
                res.sendFile(__dirname+'/main.html');
            });
        }

          else{
            socket.emit('status query',"Неправильный логин или пароль");
          }

    }
            else{
               
            socket.emit('status query',"Неправильный логин или пароль");
            }
        
     


      });//конец запроса
  });
  
    
    
   
    
    
});



 




http.listen(3000,function() {
    console.log("Соединение прошло успешно!");
    
  
});
  
    
    



//"45.77.184.185"
