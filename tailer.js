Tail = require('tail').Tail;

tail = new Tail("/home/casper/casper/tailer/foo.txt");
//tail = new Tail("/var/opt/MarkLogic/Logs/ErrorLog.txt");

  tail.on("line", function(data){
     console.log(data);
  });

express = require('express');
var app = express.createServer();
app.register('.html', require('jade'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.render('index.jade');
});

app.listen(3000);

var io = require('socket.io').listen(9000);

io.sockets.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
  });
  tail.on("line", function(data){
     console.log(data);
     socket.emit('tail', {line: data});
  });
});
