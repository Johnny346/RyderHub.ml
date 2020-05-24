angular.module('app').controller('LoginController', ['$scope','Authentication', '$location', 
    	function($scope, Authentication, $location){
            $scope.message = "welcome test weather";
            $scope.login = function() {
                Authentication.login($scope.user);
            };

            $scope.logout = function() {
                console.log("pussing button in logincontroller");
                Authentication.logout($scope.user);
            };
}]);
