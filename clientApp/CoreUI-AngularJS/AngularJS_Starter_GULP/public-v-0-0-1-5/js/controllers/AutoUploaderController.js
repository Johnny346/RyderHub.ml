angular.module('app').controller('AutoUploaderController',
 ['$scope', 'Authentication', '$location','SetUser', '$http',
 function($scope, Authentication, $location, SetUser, $http){
    //$scope.message = "welcome to my app";
    $scope.autoUpload = {
      id: SetUser.getRyderID($scope.email),
      password: "",
      email: localStorage.getItem("userEmail")
  }

    $scope.runUploader = function() {
        var email = $scope.autoUpload.email;
        var password = $scope.autoUpload.password;
        var ryderID = $scope.autoUpload.id;
        var endDate = $scope.autoUpload.endDate.getFullYear() + "-" + ($scope.autoUpload.endDate.getMonth()+1)
                      + "-" + $scope.autoUpload.endDate.getDate();
        var startDate = $scope.autoUpload.startDate.getFullYear() + "-" + ($scope.autoUpload.startDate.getMonth()+1)
                      + "-" + $scope.autoUpload.startDate.getDate();
       
        var data = {
          userEmail: email,
          password: password,
          ryderID: ryderID,
          endDate: endDate,
          startDate: startDate
        }
   
       
        $http({
          url: 'http://77.68.25.40/Upload',
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: data
      }).then(function (httpResponse) {
          console.log('response works:', httpResponse);
      }).catch(function(error){
        console.log('response error:', error);
    });
    
    }
}]);


angular.module('app').directive('checkRequired', function(){
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$validators.checkRequired = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        var match = scope.$eval(attrs.ngTrueValue) || true;
        return value && match === value;
      };
    }
  }; 
});