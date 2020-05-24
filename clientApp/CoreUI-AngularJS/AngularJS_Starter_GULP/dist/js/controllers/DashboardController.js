angular.module('app').controller('DashboardController', ['$scope', 'Authentication',
 '$location','SetUser', '$http',
 function($scope, Authentication, $location, SetUser, $http){
    $scope.message = "welcome to my app";
     $scope.incomeTax;
        $scope.usc;
        $scope.prsi;

    var testUserLogIn = localStorage.getItem("userLoggedIn");
    if (!testUserLogIn == "true"){
        console.log("-----------------------------------------------------------" + SetUser.isUserLoggedIn());
        $location.path('views/pages/login.html');
    }else {
        console.log("dashboardcntl userlogged in--------------------------------------------" + SetUser.isUserLoggedIn());
    }

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
                    taxCalc($scope.totalIncome);
      		    
                    $scope.totalHours = response.data.totalHours;
                    $scope.avgWeeklyPay = response.data.avgWeeklyPay;
                    $scope.avgDailyOrders = response.data.avgDailyOrders;
                    $scope.userstartDate = response.data.earliestWorkDate;
                    console.log("start user date "+ response.data.earliestWorkDate);
                   
                    $scope.userLastDate = response.data.newestWorkDate;
                    console.log("last registered date "+ response.data.newestWorkDate);
			
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
	$scope.getWeatherData = function() {
        
              $http({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=cork&units=metric&appid=781af7d05f213936961c5ad9c209242b',
                method: 'GET',
                
            }).then(function(response){
	
                console.log("input email "+ response.data.weather[0].description);
		$scope.main = response.data.weather[0].main;
		$scope.description = response.data.weather[0].description;
		$scope.temp = response.data.main.temp;
		$scope.windSpeed = response.data.wind.speed;
		$scope.windDegrees = response.data.wind.deg;
		$scope.region = response.data.sys.country;
		//$scope.sunriseTimeSec = response.data.sys.sunrise;
		//$scope.sunsetTimeSec = response.data.sys.sunset;
		$scope.sunrise = getTime(response.data.sys.sunrise);
		$scope.sunset = getTime(response.data.sys.sunset);

            }).catch(function(error){
              console.log(error);
            }); 

function getTime(unix_timestamp){
    var date = new Date(unix_timestamp *1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return date.getHours()+":"+date.getMinutes();
}

      };

    $scope.getMainDashboardData($scope.userchart);
    
//tax calc section
function taxCalc(income){
    console.log("tax calc running"+ income);
    
        if(income <= 33800){
    
         //income tax @ 20%
         $scope.incomeTaxT = getPerc(income,20);
         // less 1500 tax credit
        if(income > 3000){
	 $scope.incomeTax = $scope.incomeTaxT -1500;
        }else{
	  $scope.incomeTax = $scope.incomeTaxT;
	}
	 console.log("income: "+income+", tax: "+$scope.incomeTax );
 	if($scope.incomeTax <0){
	   $scope.incomeTax =  0;
	}
     }
     if(income > 33800){
         //income tax <=33800 @ 20%
         $scope.incomeTaxLower = getPerc(income,20);
        //income -33800 is taxed @ 40%
        $scope.incomeTax= getPerc(income-33800,40)+ $scope.incomeTaxLower;
    }

    if(income >=13000){
        //usc
        //12012 taxed @ 0.5%
        //next 7862 taxed @2%
        //next 50672 taxed @4.5%
        $scope.usc = getPerc(income,3);

    }else{
        $scope.usc = 0;
        }
    if(income >=5000){
        //prsi
        //all taxed @ 0.4%
        $scope.prsi= getPerc(income,4);

    }
}
    function getPerc(num, percent) {
             return ((Number(percent) / 100) * Number(num));
    }

    // tax calc section end
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
                    taxCalc($scope.totalIncome);

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
