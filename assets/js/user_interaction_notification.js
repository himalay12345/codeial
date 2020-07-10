class UserNotification
{
    constructor(userId ,recieverId)
    {
        this.userId = userId;
        this.recieverId = recieverId;

        this.socket = io.connect('http://localhost:5000');

        if(this.userId)
        {
            this.connectionHandler();
        }
    }

    connectionHandler()
    {
        let self = this;
        this.socket.on('connect',function()
        {
            console.log('Connection established using sockets');
            self.socket.emit('handshake',{
                myId:self.userId,
                chatroom:'codeial'
            });
        
        });

        self.socket.on('user_joined',function(data)
        {
            console.log('A user has joined',data);
        });


        self.socket.emit('send-notification',{
            content:self.userId + 'has upvoted your answer.',
            from:self.userId,
            to:self.recieverId,
            chatroom:'codeial'
            });

        self.socket.on('receive_message',function(data){
                if(self.userId == data.to)
                {
                    let newMessage = $('<p>');

                    newMessage.append($('<span>',{
                        'html':data.content
                    }));
        
                    $('#Feed').append(newMessage);
                }
        });
    }

}