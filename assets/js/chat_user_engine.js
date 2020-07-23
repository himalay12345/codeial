class ChatUserEngine{
    constructor(chatBoxId, userEmail, recieverEmail,fromId,toId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.recieverEmail = recieverEmail;
        this.fromId = fromId;
        this.toId = toId;

        // this.socket = io.connect('http://localhost:5000');
        this.socket = io.connect('http://18.212.108.180:5000');

        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect',function()
        {
            console.log('Connection established using sockets');
            self.socket.emit('handshake',{
                myId:self.userEmail,
                chatroom:'codeial'
            });
        
        });


        self.socket.on('user_joined',function(data)
        {
            console.log('A user has joined',data);
        });
    

        $('#send-message').click(function(e){
            e.preventDefault();
            let msg = $('#chat-message-input').val();
            $('#chat-message-input').val("");
            if(msg != '')
            {
                self.socket.emit('send-message',{
                        message:msg,
                        from:self.userEmail,
                        to:self.recieverEmail,
                        fromId:self.fromId,
                        toId:self.toId,
                        chatroom:'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data){

            // console.log('message recieved',data.message);
            // console.log('userEmail',self.userEmail);
            // console.log('RecieverEmail',data.to);

            if(self.userEmail == data.to)
        {
            let newMessage = $('<li>');

            let messageType = 'other-message';
            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        }

        if(self.userEmail == data.from)
        {
            let newMessage = $('<li>');

            let messageType = 'self-message';
            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-message-list').append(newMessage);
        }
    }
    );

        // self.socket.on('other-message',function(data){
        //     console.log('message recieved',data.message);

        //     let newMessage = $('<li>');

        //     let messageType = 'other-message';
        //     // if(data.from==self.userEmail){
        //     //     messageType = 'self-message';
        //     // }

        //     newMessage.append($('<span>',{
        //         'html':data.message
        //     }));

        //     // span.append($('<span>',{
        //     //     'html':data.user_email
        //     // })); 

        //     newMessage.addClass(messageType);

        //     $('#chat-message-list').append(newMessage);
        // });

        // self.socket.on('self-message',function(data){
        //     console.log('message recieved',data.message);

        //     let newMessage = $('<li>');

        //     let messageType = 'self-message';
        //     // if(data.from==self.userEmail){
        //     //     messageType = 'self-message';
        //     // }

        //     newMessage.append($('<span>',{
        //         'html':data.message
        //     }));

        //     // span.append($('<span>',{
        //     //     'html':data.user_email
        //     // })); 

        //     newMessage.addClass(messageType);

        //     $('#chat-message-list').append(newMessage);
        // });
    }

   
}