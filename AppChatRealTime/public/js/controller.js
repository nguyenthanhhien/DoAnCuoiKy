var app = angular.module('myApp', []);

app.config(function($interpolateProvider){
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('AppCtrl',function($scope,$http,$timeout){
    
    $scope.ShowMain = true;
    $scope.ShowChat = false;
    
    var socket = io.connect('http://localhost:3000');
    $scope.showFind = false;
    var user;
    $http.get('/info').then(function(response){
        console.log(response.data);
        user = response.data;
        socket.emit("add-user", {"_id": user._id});
    });
   
    $scope.listFind = {};
    
    $scope.SearchUser = function($event){
        var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                $http.get('/search/'+$scope.key_search).then(function(response){
                    if (response.data)
                        {
                            $scope.listFind = response.data;
                            console.log($scope.listFind);
                            $scope.showFind = true;
                            //console.log(Find_User);
                            
                        }
                    
                });
            }

        
    }
    
    $scope.Chat_user = function(){
        $scope.ShowMain = false;
        $scope.ShowChat = true;
    }
    
    $scope.messages = [];
    $scope.Noti = [];
    //Chat 
    function Send(){
        console.log($scope.Text_chat);
        socket.emit("private-message", {
            "from": user,
            "to": $scope.listFind,
            "content": $scope.Text_chat
        });
        var message = {
            "from": user,
            "to": $scope.listFind,
            "content": $scope.Text_chat
        }
        $scope.messages.push(message);
        $scope.Text_chat = '';
        console.log($scope.messages);
        $timeout(function() {
          var scroller = document.getElementById("section-chat");
          scroller.scrollTop = scroller.scrollHeight;
        }, 0, false);
    }
    $scope.Send_msg = function(){
        Send();
    }
    
    $scope.KeyChat = function($event){
        var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                Send();
            }
    }
    
    $scope.AddFriend = function(){
        console.log('addfr');
        socket.emit("add-friend",{
            "from": user,
            "to": $scope.listFind._id
        });
    }
    
    socket.on("add-message", function(data){
        $scope.$apply(function() {
            $scope.messages.push(data);
        });
        console.log('Tin nhan:'+ data.content);
        $timeout(function() {
          var scroller = document.getElementById("section-chat");
          scroller.scrollTop = scroller.scrollHeight;
        }, 0, false);        
     });
    
    socket.on('recive-notification', function(data){
        $scope.$apply(function() {
            console.log('Invite friend');
        });
        console.log(data.to);
        $scope.Noti.push(data);
    });
    
    
    
});