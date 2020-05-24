

angular.module('app').controller('WeatherDataController', ['$scope', '$http',
 function($scope, $http){
    $scope.message = "check weather forecast";

    $scope.getWeatherData = function() {
          /*    $http({
                url: 'api.openweathermap.org/data/2.5/weather?q={cork}&appid={781af7d05f213936961c5ad9c209242b}',
                method: 'GET',
            }).then(function(response){
                console.log("input email "+ response);

            }).catch(function(error){
              console.log(error);
            });*/
	console.log("test button");
      };
}]);
