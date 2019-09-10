<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

        $queryDataDailyEarnings = "SELECT hours FROM shiftlog WHERE workdate BETWEEN '2018-03-03' AND '2019-03-03' and ryder_id = '92306'";
    
        $resultDDE = mysqli_query($dbc, $queryDataDailyEarnings);
    
        if(mysqli_num_rows($resultDDE) > 0) {
            while ($row = mysqli_fetch_array($resultDDE, MYSQLI_ASSOC)) {
                $response['DataDailyEarnings'][] =  $row;
            }
        } else{
                $response['status'] = 'error';
        } 


mysqli_close($dbc);
echo json_encode($response);

?>