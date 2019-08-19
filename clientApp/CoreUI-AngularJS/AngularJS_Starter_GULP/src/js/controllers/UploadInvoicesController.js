angular.module('app').controller('UploadInvoicesController', ['$scope', '$http', 'UploadInvoiceService',
 
    	function($scope, $http, UploadInvoiceService){
           
        
             $scope.UploadFiles = function() {
            //     console.log("pussing button in logincontroller"); 

            //    //$scope.message = "Upload was successful";
                 
                  //UploadInvoiceService.UploadFiles($scope.form);
             };

             $scope.fileName= function(element) {
                $scope.$apply(function($scope) {
                    var file_data = $('#file').prop('files')[0]; 
                    console.log("file name "+ file_data.name);   
                    var form_data = new FormData();                  
                    form_data.append('file', file_data);
                    //alert(form_data);   
                    let gVarMessage =" "; 
                                         
                    $.ajax({
                        url: 'http://192.168.0.122/phpfiles/upload.php', // point to server-side PHP script 
                        dataType: 'text',  // what to expect back from the PHP script, if anything
                        cache: false,
                        contentType: false,

                        processData: false,
                        data: form_data,                         
                        type: 'post',
                        success: function(data){
                            var response = $.parseJSON(data);
                            //alert(response); // display response from the PHP script, if any
                            if(response.status == 'moved'){ 
                                console.log("worked");
                                $scope.message = response.message;
                                
                                updateMessage(response.message);
                                alert(response.message);
                            }else {
                                console.log(response.status);
                                updateMessage(response.status);
                                $scope.message = "Error uploading invoice, try again later!";
                                
                            }
                        },
                        error: function(error){
                             console.log("Error:");
                             console.log(error);
                        }
                     });
                });
             };
             function updateMessage(message){
                gVarMessage = message;
                $scope.message = gVarMessage;
            };  

           
}]);