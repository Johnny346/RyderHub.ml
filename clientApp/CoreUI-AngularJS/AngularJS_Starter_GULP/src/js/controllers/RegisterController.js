angular.module('app').controller('RegisterController', ['$scope', 'Authentication',
    function($scope, Authentication){
        
        $scope.passwordsMatch = function(pass, repass){
        if (pass !== repass ){
            // console.log(pass);
            // console.log(repass);
            document.getElementById("repeatpassword1").style.border = "1px solid red";
            return true;
        }else {
                document.getElementById("repeatpassword1").style.border = "";
                return false;
        }
    };
    $scope.register = function() {
        //$scope.message = "welcome to my app " + $scope.registerUser.email;
        Authentication.register($scope.registerUser);
    };
}]);