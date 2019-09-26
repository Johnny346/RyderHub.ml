angular.module("app")
    .factory("SetUser",[ "$http", function($http) {
  
  var service = {};
  var ryderID;
  var email;
  var loggedin = false;

  service.setEmail = function(email){
      email = email;
      console.log("email is set"+ email);
      return email;
  };
  service.isUserLoggedIn = function() {
      return loggedin;
  };
  service.userLoggedIn = function() {
      loggedin = true;
  };
  service.userLoggedOut = function() {
    loggedin = false;
  };
  service.getEmail = function() {
    console.log("hi"+ email);
    return email;
  };
  service.getRyderID = function(email) {
    console.log("SetUser email" +email);
          $http({
            url: 'http://192.168.0.122/phpfiles/getRyderID.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'email='+email
        }).then(function(response){
            if(response.data.status == 'connected'){ 
                console.log("working here");
                ryderID = response.data.id;
                console.log(response.data.id);
                console.log(response.data.email);
                
            }else {
                console.log(response.data.status);
                console.log(response.data.email);
            }
          
        }).catch(function(error){
          console.log(error);
        }); 
        return ryderID;
  };

  return service;
}]);