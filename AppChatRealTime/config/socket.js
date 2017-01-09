var User = require('../models/user');

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
               }
        });
        
        socket.on('add-friend', function(data){
            var noti;
            if (data.from.facebook)
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.facebook.name,
                        "avatar": data.from.facebook.avatar,
                    }
               }
           else
               {
                   noti = {
                        "_id": data.from._id,
                        "name": data.from.local.name,
                        "avatar": data.from.local.avatar,
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
            console.log(noti);
            
            
        });
        console.log('AAA user connected');
        socket.on('disconnect', function() {
         console.log('AAA user disconnected');
        })
    });
}