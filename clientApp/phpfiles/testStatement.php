<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

        $queryDataDailyOrders = "SELECT orders as weeklyOrders FROM shiftlog WHERE workdate BETWEEN '2019-8-1'AND '2019-8-9' and ryder_id = '92306'";
    
        $resultDDO = mysqli_query($dbc, $queryDataDailyOrders);
        
            if(mysqli_num_rows($resultDDO) > 0) {
                while ($row = mysqli_fetch_array($resultDDO, MYSQLI_ASSOC)) {
                    $response['DataDailyOrders'][] =  $row;
                }
            } else{
                    $response['status'] = 'error';
            } 


mysqli_close($dbc);
echo json_encode($response);

?>
