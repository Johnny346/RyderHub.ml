angular.module('app').factory('UploadInvoiceService',
['$rootScope','$location', '$http',
    function($rootScope, $location, $http){
        $rootScope.form = [];
        $rootScope.files = [];

    return {
        UploadFiles: function(file){
            
            //$rootScope.message = "welcome to my app " + user.email;
             var dat = document.getElementById('file').files[0];
            // var file = $rootScope.form.invoice.files[0];
             var formData = new FormData();

             var Blob_String = '';
             
             formData.append("file", dat);

             create_blob(file, function(blob_string) { 
                Blob_String = blob_string;
                //console.log("text to send " +Blob_String);
                
                });

            function create_blob(file, callback) {
                var reader = new FileReader();
                reader.onload = function() { callback(reader.result) };
                reader.readAsDataURL(file);
            }
            
            $http({
                url: 'http://192.168.0.122/phpfiles/upload.php',
                method: 'Post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
			  //data : 'hi='+dat.name
               processData: false,  
              //data : 'Blob_String='+Blob_String
              data : formData
            }).then(function(response){
                if(response.data.status == 'moved'){ 
                    console.log("worked");
                    $rootScope.message = response.data.message;
                }else {
                    console.log(response.data.status);
                    $rootScope.message = response.data.status;
                    
                }
               
            }).catch(function(error){
                $rootScope.message = error.message;
            }); 
        }
    }
}]);