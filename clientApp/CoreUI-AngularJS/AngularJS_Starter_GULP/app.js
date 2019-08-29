// // app.js
var express = require('express'); 
var mysql = require('mysql');
var app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// app.use(bodyParser.json());

app.post('/Upload', function(req, res, next){
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   var cope  = req.body;
   //console.log('exec : ' + cope);

   var POST = {};
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
                var json = JSON.parse(_data);
                console.log(json.userEmail);
                console.log(json.password);
                console.log(json.ryderID);
                console.log(json.endDate);
                console.log(json.startDate);
            var exec = require('child_process').exec, child;
                child = exec('java -jar ~/Desktop/GetInvoicesFromGmailServer.jar ' + json.userEmail+ ' '
                + json.password + ' ' + json.endDate + ' ' + json.startDate + ' ' + json.ryderID,
                function (error, stdout, stderr){
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if(error !== null){
                        console.log(error);
                    }
                });
            }
            //console.log(POST);
            res.send(POST);
        })
    }
    

        
//    var exec = require('child_process').exec, child;
//             child = exec('java -jar ~/Desktop/GetInvoicesFromGmailServer.jar ',
//             function (error, stdout, stderr){
//                 console.log('stdout: ' + stdout);
//                 console.log('stderr: ' + stderr);
//                 if(error !== null){
//                 return  error;
//                 }
//             });
});

app.listen(8081);
console.log("runnning on port 8081");

// // var exec = require('child_process').exec, child;
// //             child = exec('java -jar ~/Desktop/GetInvoicesFromGmailServer.jar ',
// //             function (error, stdout, stderr){
// //                 console.log('stdout: ' + stdout);
// //                 console.log('stderr: ' + stderr);
// //                 if(error !== null){
// //                     console.log('exec error: ' + error);
// //                 }
// //             });


// var http = require("http");

// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
   
//     // Website you wish to allow to connect
//     response.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     response.setHeader('Access-Control-Allow-Credentials', true);
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');