angular.module('app').factory('Authentication',
['$rootScope','$location', '$http', 'SetUser',
    function($rootScope, $location, $http, SetUser){
        
    return {
        login: function(user){
            //$rootScope.message = "welcome to my app " + user.email;
            
            $http({
                url: 'http://77.68.25.40/phpfiles/server.php',
                method: 'Post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'email='+user.email+'&password='+user.password
            }).then(function(response){
                if(response.data.status == 'loggedin'){ 
                    console.log("working here");
                    $rootScope.message = "welcome to my app " + response.data.status;
                    $rootScope.currentUser = user.email;
                    SetUser.userLoggedIn();
                    localStorage.setItem("userEmail",user.email);
                    
                    localStorage.setItem("ryderID",SetUser.getRyderID(user.email));
                    $rootScope.email = SetUser.setEmail(user.email);
                    console.log("user email "+SetUser.getEmail());
                    console.log("is user logged in ---" + SetUser.isUserLoggedIn());
                    
                    console.log(response.data);
                    $location.path('/dashboard');
                }else {
                    console.log(response.data);
                    $rootScope.message = response.data.status;
                    $rootScope.currentUser = '';
                }
               
            }).catch(function(error){
                $rootScope.message = error.message;
            }); 
        },
        requireAuth: function(){
            // console.log("working here----------------------------------" + $rootScope.currentUser);
            // if (!SetUser.isUserLoggedIn() && $rootScope.currentUser ==undefined){
            //     console.log("running ---" + SetUser.isUserLoggedIn());
            //     $location.path('/login');
            //     return false;
            // }else {
            //     console.log("running false");
            //     return true;
            // }
            
        },
        logout: function() {
            console.log("pushing button in auth service");
            SetUser.userLoggedOut();
            console.log("logging out user"+ SetUser.isUserLoggedIn() + " currentuser " + $rootScope.currentUser);
            $rootScope.currentUser = ' ';
            $location.path('/login');
        },
        register: function(registerUser) {
            $http({
                url: 'http://77.68.25.40/phpfiles/serverRegisterUser.php',
                method: 'Post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 
                    'ryderid='+registerUser.ryderid
                    +'&email='+ registerUser.email
                    +'&password='+ registerUser.password
                    +'&repass='+ registerUser.repass
                
            }).then(function(response){
                if(response.data.status == 'registered'){ 
                    console.log("working here");
                    $rootScope.message = "Welcome to the RyderHub App, you are now a member!, Login now.";
                   function f1ChangePath() {
                        console.log("should redirect now");
                        $location.path('/login');
                   }
                    setTimeout(f1ChangePath(),3000);
                }else {
                    console.log("error in else");
                    $rootScope.message = "There was an error with your registration, contact JohnMulcahy346@gmail.com";
                    //$rootScope.currentUser = '';
                }
               
            }).catch(function(error){
                $rootScope.message = error.message;
            }); 
        }
    }
}]);