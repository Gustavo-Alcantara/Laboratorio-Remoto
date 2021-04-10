const fs = require('fs');
const express = require('express');
const cmd = require('node-cmd');
const Avrgirl = require('avrgirl-arduino');
const { stringify } = require('querystring');
const app = express();
const ip = "localhost";
var link_video;

var avrgirl = new Avrgirl({
  board: 'leonardo',
  manualReset: false,
});

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question('IP do host:', ip => {
  io_link = 'http://' + ip + ':3000/';
  console.log(`Entre em ${ip}:3000`);
  readline.question('IP do streaming de vídeo:', video => {
    link_video = 'http://' + video + '/video';
    console.log(`Câmera em: ${link_video}`);
    readline.close();

    var server = require('http').createServer(app);
    
    app.use(express.static(__dirname));  
    app.get('/', function(req, res,next) {  
        res.sendFile(__dirname + '/index.html');
    });
    
    server.listen(3000,ip);
    const io = require('socket.io')(server);
    
    io.on('connection', socket => {

      console.log('connect');

      socket.emit('IP',link_video);
      socket.on('codigo', (arg1) =>{
        console.log('Chegou');
        socket.emit('estagio', 'Entregue');
        console.log(arg1);
        fs.writeFile('main.c', arg1.texto, (err)=>{
          socket.emit('Erro', err)
        });
        cmd.run('avr-gcc -Wall -g -Os -mmcu=atmega32u4 -o main.bin main.c', (err, data, stderr) =>{
          if(err){
            console.log(err);
            socket.emit('compilation_rel', err);
          }
          else{
            socket.emit('estagio', 'Compilado');
            cmd.run('avr-size -C main.bin', (err,data) =>{
              console.log(data);
              socket.emit('compilation_rel', data)
            })
            cmd.run('avr-objcopy -j .text -j .data -O ihex main.bin main.hex', (err)=>{
              if(err){
                console.log(err);
              }
              else{
                avrgirl.flash('main.hex',(err) =>{
                  if(err){
                    console.log(err);
                    socket.emit('estagio', 'Erro ao carregar para placa')
                    socket.emit('compilation_rel', err);
                  }
                  else{
                    socket.emit('estagio' , 'Pronto');
                  }
                });
              }
            });
          }
        });
      });
    });
  })
});