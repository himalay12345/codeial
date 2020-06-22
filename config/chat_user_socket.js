const User = require('../models/users');
const Message = require('../models/message');

module.exports.chatUserSockets = function(socketServer)
{
    let userSocket = [];
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection', function(socket){
        console.log('New Connection recieved',socket.id);

    socket.on('disconnect',function(){
        console.log('Socket Disconnected');
    });

    socket.on('handshake',function(user)
    {
        console.log('Handshake request recieved',user.myId);
        if (userSocket[user.myId] === undefined) 
        { 
            userSocket[user.myId] = [];
            userSocket[user.myId].push(socket.id);
            // console.log();
        }

        socket.join(user.chatroom);
        io.in(user.chatroom).emit('user_joined',user.myId);

    });

    socket.on('send-message', function (msg) {
        // for (var i = 0 ; i < userSocket[msg.to].length ; i++ ) {
        //   io.to(userSocket[msg.to][i]).emit('other-message', msg);
        // //   console.log(msg.message);
        // }

        // for (var i = 0 ; i < userSocket[msg.from].length ; i++ ) {
        //     io.to(userSocket[msg.from][i]).emit('self-message', msg);
        //   //   console.log(msg.message);
        //   }

        io.in(msg.chatroom).emit('receive_message',msg);

        // io.to(userSocket[msg.to].emit('chat-message', msg));
        
      });
});

}