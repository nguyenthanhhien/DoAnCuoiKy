var User = require('../models/user');

var Message = require('../models/message');

module.exports = function(io) {
    var clients = {};
    io.sockets.on('connection', function (socket) {
        socket.on('add-user', function(data){
            console.log(data._id);
            clients[data._id] = {
              "socket": socket.id
            };
            console.log(clients[data._id].socket);
        });
        
        socket.on('private-message', function(data){
            //console.log('From ' + data.from.facebook.name + ' to ' + data.to.facebook.name + ' msg ' + data.content);
            console.log(clients[data.to._id]);
           if (clients[data.to._id]) 
               {
                   io.sockets.connected[clients[data.to._id].socket].emit('add-message',data);
                   console.log(data);
                   
               }
            Message.findOne({'user_1': data.from._id, 'user_2': data.to._id}, function(err, message){
                       if(err)
                           throw err;
                       if(message)
                       {
                           console.log(message);
                           var mes_save = 
                           {
                                "from_user": data.from._id,
                                "content_mes": data.content,
                            }  
                           console.log(mes_save);
                            message.mes.push(mes_save);
                            message.save();
                        }
                   });
                    Message.findOne({'user_1': data.to._id, 'user_2': data.from._id}, function(err, message){
                       if(err)
                           throw err;
                       if(message)
                       {
                           console.log(message);
                           var mes_save = 
                           {
                                "from_user": data.from._id,
                                "content_mes": data.content,
                            }            
                            message.mes.push(mes_save);
                            message.save();
                        }
                   });
        });
        
        socket.on('add-friend', function(data){
            var noti;
            console.log(data);
            if (data.from.facebook)
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.facebook.name,
                        "avatar": data.from.facebook.avatar,
                        "classify" : data.classify,
                    }
               }
           else
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.local.name,
                        "avatar": data.from.local.avatar,
                        "classify": data.classify,
                    }
               }
            
            User.findOne({'_id' : data.to}, function(err, user){
                        console.log(noti);
                        user.notification.push(noti);
                        user.save();
                        
                   });
            
           if (clients[data.to])
               {
                   
                   io.sockets.connected[clients[data.to].socket].emit('recive-notification',noti);
               }
            
            
            
        });
        
        socket.on('accept-friend', function(data){
            var noti;
            console.log(data);
            if (data.from.facebook)
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.facebook.name,
                        "avatar": data.from.facebook.avatar,
                        "classify": data.classify,
                    }
               }
           else
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.local.name,
                        "avatar": data.from.local.avatar,
                        "classify": data.classify,
                    }
               }
            User.findOne({'_id' : data.to}, function(err, user){
                        
                        user.friends.push(data.from._id);
//                        user.save();
                        user.notification.push(noti);
                        user.save();
                        
                   });
            User.findOne({'_id' : data.from._id}, function(err, user){
                       user.friends.push(data.to);
                        user.save();
            });
            
            var msg = new Message();
            msg.user_1 = data.from._id;
            msg.user_2 = data.to;
            msg.save();
            if (clients[data.to])
               {
                   io.sockets.connected[clients[data.to].socket].emit('recive-notification',noti);
               }
        });
        
        socket.on('denied-friend', function(data){
            var noti;
            console.log(data);
            if (data.from.facebook)
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.facebook.name,
                        "avatar": data.from.facebook.avatar,
                        "classify": data.classify,
                    }
               }
           else
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.local.name,
                        "avatar": data.from.local.avatar,
                        "classify": data.classify,
                    }
               }
            User.findOne({'_id' : data.to}, function(err, user){
                        user.notification.push(noti);
                        user.save();
                        
                   });
            
            if (clients[data.to])
               {
                   io.sockets.connected[clients[data.to].socket].emit('recive-notification',noti);
               }
        });
        
        console.log('AAA user connected');
        socket.on('disconnect', function() {
         console.log('AAA user disconnected');
        })
    });
}