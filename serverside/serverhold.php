<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();

session_start();
$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());
$password = mysqli_real_escape_string($dbc, $_POST['password']);
$email = mysqli_real_escape_string($dbc, $_POST['email']);

$query = "SELECT * FROM ryderinfo WHERE email ='$email'";
$query2 = "SELECT * FROM ryderinfo WHERE email ='$password'";

$result = mysqli_query($dbc, $query);
$result2 = mysqli_query($dbc, $query2);

if(mysqli_num_rows($result) > 0 && mysqli_num_rows($result2) > 0) {
        $response['status'] = 'loggedin';
        $response['user'] =  'admin';
        $response['useruniqueid'] = md5(uniqid());
        $_SESSION['useruniqueid'] = response['useruniqueid'];
} else{
        $response['status'] = 'error';
}

mysqli_close($dbc);
echo json_encode($response);
