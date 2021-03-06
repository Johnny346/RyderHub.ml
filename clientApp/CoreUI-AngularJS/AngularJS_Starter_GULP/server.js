var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
/**
 * This server should host angular appliation with or without base-url
 * The angular static resources should be under `./dist`
 */
var app = express();
app.use(function(req, res, next) {
  console.log('Time:', Date.now() + ":", req.originalUrl)
  next()
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/base-here-if-any', express.static(path.join(__dirname, 'dist')))

app.get('*', function(req, res, next) {
  //Path to your main file
  res.status(200).sendFile(path.join(__dirname + '/dist/index.html'));
});


const port = process.env.PORT || 80;
const HOST = '0.0.0.0';

app.listen(port, HOST);
console.log(`Example app listening on port ${port}!`)