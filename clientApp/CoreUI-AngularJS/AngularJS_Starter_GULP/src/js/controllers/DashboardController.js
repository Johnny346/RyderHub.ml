angular.module('app').controller('DashboardController', ['$scope', 'Authentication',
 '$location','SetUser', '$http',
 function($scope, Authentication, $location, SetUser, $http){
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

    $scope.getMainDashboardData = function() {
        var email = localStorage.getItem("userEmail");

        console.log("SetUser email" +email);
              $http({
                url: 'http://192.168.0.122/phpfiles/dashboardGetMainData.php',
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
                    $scope.totalIncome = response.data.totalIncome;
                    $scope.totalHours = response.data.totalHours;
                    $scope.avgWeeklyPay = response.data.avgWeeklyPay;
                    $scope.avgDailyOrders = response.data.avgDailyOrders;
                    
                    //data for large chart
                    $scope.DataDailyOrders = response.data.DataDailyOrders;
                    $scope.DataDailyHours = response.data.DataDailyHours;
                    $scope.DataDailyEarnings = response.data.DataDailyEarnings;
                    
                    // for (let value of Object.values($scope.DataDailyEarnings)) {
                    //     console.log(value);
                    // }
                    trafficDemoCtrl($scope.DataDailyEarnings, $scope.DataDailyHours, $scope.DataDailyOrders );
                    //console.log( "printdaily orders "+ $scope.DataDailyEarnings.pay);
                    
                }else {
                    console.log(response.data.status);
                }
              
            }).catch(function(error){
              console.log(error);
            }); 

            
            function trafficDemoCtrl(DataDailyEarnings,DataDailyHours,DataDailyOrders){

                function random(min,max) {
                    return Math.floor(Math.random()*(max-min+1)+min);
                }
                
                var elements = 27;
                var data1 = [];
                var data2 = [];
                var data3 = [];
                var count = 0;
                for (let value of Object.values(DataDailyEarnings)) {
                    data1.push(parseInt(Object.values(value).toString(), 10));
                    //console.log(parseInt(Object.values(value).toString(), 10));
                }
                for (let value of Object.values(DataDailyHours)) {
                    data2.push(parseInt(Object.values(value).toString(), 10));
                    //console.log(value);
                   
                }
                for (let value of Object.values(DataDailyOrders)) {
                    data3.push(parseInt(Object.values(value).toString(), 10));
                    count += 1;
                    //console.log(value);
                }
                
                var newLables = [];
                for (let index = 0; index < count; index= index +7) {
                    //console.log(i);
                    newLables.push('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
                }
               
                //$scope.labels = ['Monday', 'Tuesday', 'Wednesday'];
                //$scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $scope.labels = newLables;
                $scope.series = ['Daily Earnings', 'Hours', 'Orders'];
                $scope.data = [ data1, data2, data3];
                $scope.colors = [{
                    backgroundColor: convertHex(brandInfo,10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: '#fff'

                }, {
                    backgroundColor: 'transparent',
                    borderColor: brandSuccess,
                    pointHoverBackgroundColor: '#fff'
                },{
                    backgroundColor: 'transparent',
                    borderColor: brandDanger,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 1,
                    borderDash: [8, 5]
                }];
                $scope.options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                    xAxes: [{
                        gridLines: {
                        drawOnChartArea: false,
                        },
                        ticks: {
                        callback: function(value) {
                            return value.charAt(0);
                        }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 05,
                        stepSize: Math.ceil(10 / 2),
                        max: 75
                        }
                    }]
                    },
                    elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                    }
                    },
                }
            }
            
      };
      $scope.getMainDashboardData();

    
}]);