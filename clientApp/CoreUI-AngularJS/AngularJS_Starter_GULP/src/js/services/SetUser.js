angular.module("app")
    .factory("SetUser", function() {
  var service = {};

  var email;
  var loggedin = false;

  service.setEmail = function(email){
      email = email;
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

  return service;
});