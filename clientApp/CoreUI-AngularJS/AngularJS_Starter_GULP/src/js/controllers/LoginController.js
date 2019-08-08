angular.module('app').controller('LoginController', ['$scope', 
    	function($scope){
            //$scope.message = "welcome to my app";
            $scope.login = function() {
                $scope.message = "welcome to my app " + $scope.user.email;
            }
}]);