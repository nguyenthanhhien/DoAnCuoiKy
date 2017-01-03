$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

//var app = angular.module('myApp', []);
//app.controller('myCtrl', function($scope, $http){
//    $scope.name = "Hien";
//    $scope.SignUpAccount = function(){
//        console.log($scope.newaccount);
//        $http.post('/signup',$scope.newaccount).then(function(response){
//           console.log(response.data);
//            alert("Đăng ký thành công!")
//        });
//    };
//    
//    $scope.LogInAccount = function(){
//        console.log($scope.account);
//        $http.post('/login',$scope.account).then(function(response){
//           console.log(response.status);
//        });
//    };
//});