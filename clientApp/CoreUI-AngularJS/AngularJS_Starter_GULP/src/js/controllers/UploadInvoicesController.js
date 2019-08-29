angular.module('app').controller('UploadInvoicesController', ['$scope', '$http', 'UploadInvoiceService', 'SetUser',
 
    	function($scope, $http, UploadInvoiceService, SetUser){
             $scope.UploadFiles = function() {
            //     console.log("pussing button in logincontroller"); 

            //    //$scope.message = "Upload was successful";
                 var uploadMessageID = document.getElementById("uploadMessage");
                  //UploadInvoiceService.UploadFiles($scope.form);
                  var form_data = new FormData(); 
                  var file_data = $('#file').prop('files').length; 
                  let ryderID =  $scope.user.id;
                  console.log("file name "+ file_data);
                  console.log("ryderid is : "+ ryderID); 
                  var fileName = new File(["foo"], ryderID, {type: "application/pdf",});  
                  form_data.append('file[]', fileName);

                 for(var i=0; i <file_data; i++){
                     
                      form_data.append('file[]', $('#file').prop('files')[i]);
                      var fileT = $('#file').prop('files')[i];
                      //alert(fileT.name);
                 }     
                              
                  
                                  
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
                              console.log(response.status);
                              uploadMessageID.innerHTML = response.message;
                          }else {
                              console.log("error response: "+ response.status);
                              console.log("error message: "+ response.message);
                              
                              uploadMessageID.innerHTML = response.message;
                              
                          }
                      },
                      error: function(error){
                           console.log("Error:");
                           console.log(error);
                      }
                   });
             };
           
}]);