angular.module('app').controller('RegisterController', ['$scope', function($scope){
    $scope.message = "welcome to my app, here you can register";

    $scope.passwordsMatch = function(pass, repass){
       if (pass !== repass ){
           console.log(pass);
           console.log(repass);
           document.getElementById("repeatpassword1").style.border = "1px solid red";
           return true;
       }else {
            document.getElementById("repeatpassword1").style.border = "";
            return false;
       }
    };
}]);