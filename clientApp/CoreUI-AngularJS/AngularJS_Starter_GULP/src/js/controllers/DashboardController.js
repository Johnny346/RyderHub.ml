angular.module('app').controller('DashboardController', ['$scope', 'Authentication', '$location','SetUser',
 function($scope, Authentication, $location, SetUser){
    $scope.message = "welcome to my app";

    // if(!SetUser.isUserLoggedIn()){
    //     console.log("-----------------------------------------------------------" + SetUser.isUserLoggedIn());
    //     $location.path('views/pages/login.html');
    // }else {
    //     console.log("dashboardcntl userlogged in--------------------------------------------" + SetUser.isUserLoggedIn());
    // }

    $scope.logout = function() {
        Authentication.logout($scope.user);
    };

    
}]);