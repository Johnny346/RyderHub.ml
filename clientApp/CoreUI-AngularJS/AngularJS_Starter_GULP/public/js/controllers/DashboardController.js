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

    $scope.getMainDashboardData = function(userchart) {
        var email = localStorage.getItem("userEmail");

        
              $http({
                url: 'http://77.68.25.40:443/phpfiles/dashboardGetMainData.php',
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
                    $scope.userstartDate = response.data.earliestWorkDate;
                    console.log("start user date "+ response.data.earliestWorkDate);
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
    $scope.getMainDashboardData($scope.userchart);
    
    $scope.updateMainDashboardData = function(userchart) {
        var email = localStorage.getItem("userEmail");
        var endDate = userchart.finishDate.getFullYear() + "-" + (userchart.finishDate.getMonth()+1)
        + "-" + userchart.finishDate.getDate();
        var startDate = userchart.startDate.getFullYear() + "-" + (userchart.startDate.getMonth()+1)
        + "-" + userchart.startDate.getDate();
        console.log("userchart startdate " +startDate);
        console.log("userchart finishdate " +endDate);
        console.log("user email " +email);
              $http({
                url: 'http://77.68.25.40:443/phpfiles/dashboardGetUpdatedMainData.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'email='+email+'&endDate='+endDate+'&startDate='+startDate
            }).then(function(response){
                console.log("input email "+ response.data.inputEmail);
                console.log("id "+ response.data.id);
                if(response.data.status == 'connected'){ 
                    console.log("working here");
                    ryderID = response.data.id;
                    //console.log(response.data.id);
                    $scope.totalIncome = response.data.totalIncome;
                    $scope.totalHours = response.data.totalHours;
                    $scope.avgWeeklyPay = response.data.avgWeeklyPay;
                    $scope.avgDailyOrders = response.data.avgDailyOrders;
                    console.log("response startDate  "+ response.data.startDate); 
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
                    console.log("updatedGetDashboard"+response.data.status);
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
    
}]);