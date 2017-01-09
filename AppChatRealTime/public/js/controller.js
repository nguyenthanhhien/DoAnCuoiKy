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
        user = response.data;
        socket.emit("add-user", {"_id": user._id});
        $scope.me = user;
    });
    
    
    $scope.listFind = {};
    
    $scope.SearchUser = function($event){
        var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                $http.get('/search/'+$scope.key_search).then(function(response){
                    if (response.data)
                        {
                            $scope.listFind = response.data;
                            $scope.showFind = true;
                        }
                    
                });
            }
   
    }
    
     $scope.messages = [];
    $scope.Noti = [];
    $scope.AllFriends = [];
    
    $scope.Chat_user = function(friend){
        $scope.MSG = [];
        $scope.messages = [];
        $scope.ShowMain = false;
        $scope.ShowChat = true;
        var fr = friend[0][0];
        $scope.Header_Friend = fr;
        console.log($scope.Header_Friend._id);
        $http.get('/message/' + $scope.Header_Friend._id).then(function(response){
           console.log(response.data); 
            $scope.MSG = response.data;
            SetTimeout();
        });
        console.log($scope.MSG);
        
    }
    
   
    //Chat 
    function Send(){
        socket.emit("private-message", {
            "from": user,
            "to": $scope.Header_Friend,
            "content": $scope.Text_chat
        });
        var message = {
            "from": user,
            "to": $scope.Header_Friend,
            "content": $scope.Text_chat
        }
        $scope.messages.push(message);
        $scope.Text_chat = '';
        SetTimeout();
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
        $scope.test = "request friend";
        socket.emit("add-friend",{
            "from": user,
            "to": $scope.listFind._id,
            "classify": $scope.test,
        });
    }
    
    $scope.Click_Noti = function(){
        $http.get('/notification').then(function(response){
            var data = response.data;
            $scope.Noti = data;
        });
    }
    
    $scope.Click_Contact = function(){
        $http.get('/allfriends').then(function(response){
           $scope.AllFriends = response.data;
        });
    }
    
    $scope.Accept_Friend = function(item){
        socket.emit("accept-friend",{
           "from": user,
            "to": item[0][0],
            "classify": "accept friend request"
        });
    }
    
    $scope.Denied_Friend = function(item){
        socket.emit("denied-friend",{
           "from": user,
            "to": item[0][0],
            "classify": "denied friend request"
        });
    }
    
    
    socket.on("add-message", function(data){
         if ($scope.Header_Friend._id == data.from._id)
            {
                $scope.$apply(function() {
                    $scope.messages.push(data);
                });
            }
        
        
        SetTimeout();
     });
    
    socket.on('recive-notification', function(data){
        $scope.$apply(function() {
            $scope.Noti.push(data);
        });
        
    });
    
    function SetTimeout(){
        $timeout(function() {
          var scroller = document.getElementById("section-chat");
          scroller.scrollTop = scroller.scrollHeight;
        }, 0, false);
    }
    
    
    
});