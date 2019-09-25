<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();


$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

$email = mysqli_real_escape_string($dbc, $_POST["email"]);

$query = "SELECT ryderid FROM ryderinfo WHERE email ='$email'";

$result = mysqli_query($dbc, $query);

$response['email'] = $_REQUEST["email"];

if(mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $response['status'] = 'connected';
        $response['id'] =  $row['ryderid'];;
    }
} else{
        $response['status'] = 'error';
}

mysqli_close($dbc);
echo json_encode($response);

?>
