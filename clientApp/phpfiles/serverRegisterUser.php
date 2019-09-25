<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();


$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

$ryderid = mysqli_real_escape_string($dbc, $_POST['ryderid']);
$email = mysqli_real_escape_string($dbc, $_POST['email']);
$password = mysqli_real_escape_string($dbc, $_POST['password']);

// $query = "SELECT * FROM ryderinfo WHERE email ='$email'";
// $query2 = "SELECT * FROM ryderinfo WHERE email ='$password'";

// $result = mysqli_query($dbc, $query);
// $result2 = mysqli_query($dbc, $query2);
$adduser = "INSERT INTO ryderinfo (ryderid, pass, email)
VALUES('$ryderid','$password', '$email')";
                $r1 = mysqli_query($dbc, $adduser);
if(isset($_POST) && $r1) {
        $response['status'] = 'registered';
        $response['email'] =  $email;
        $response['ryderid'] =  $ryderid;
        $response['password'] =  $password;
} else{
        $response['status'] = 'error';
}


echo json_encode($response);

