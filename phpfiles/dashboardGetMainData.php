<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();


$response = [];

$dbc = mysqli_connect
        ('localhost' , 'root' , 'Number2233..db' , 'ryderdatabase' )
        OR die
        ( mysqli_connect_error());

$email = mysqli_real_escape_string($dbc, $_POST['email']);
$endDate = mysqli_real_escape_string($dbc, $_POST['endDate']);
$response['endDate'] = $endDate;

$startDate = mysqli_real_escape_string($dbc, $_POST['startDate']);
$response['startDate'] = $startDate;

$queryRyderID = "SELECT ryderid FROM ryderinfo WHERE email ='$email'";

$result = mysqli_query($dbc, $queryRyderID);

if(mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $response['status'] = 'connected';
        $response['id'] =  $row["ryderid"];
    }
} else{
        $response['status'] = 'error';
}

if($response['id'] != null){
    //if ryder id set run all other mysql statements
    $ryderID = $response['id'];


    // mysql to get total income

    $queryTotalIncome = "SELECT sum(total) FROM invoice WHERE ryder_id = '$ryderID'";
    $resultTI = mysqli_query($dbc, $queryTotalIncome);

    if(mysqli_num_rows($resultTI) > 0) {
        while ($row = mysqli_fetch_array($resultTI, MYSQLI_ASSOC)) {
            
            $response['totalIncome'] =  $row["sum(total)"];
            $response['totalIncome'] = round($response['totalIncome'],2);
        }
    } else{
            $response['status'] = 'error';
    }

    // mysql to get total hours worked
    $queryGetTotalHours = "SELECT sum(hours) FROM `shiftlog` WHERE ryder_id = '$ryderID'";
    $resultTH = mysqli_query($dbc, $queryGetTotalHours);

    if(mysqli_num_rows($resultTH) > 0) {
        while ($row = mysqli_fetch_array($resultTH, MYSQLI_ASSOC)) {
            
            $response['totalHours'] =  $row["sum(hours)"];
            $response['totalHours'] = round($response['totalHours'],2);
        }
    } else{
            $response['status'] = 'error';
    }
    // mysql to get avg weekly income from a sunday to sunday
    //SELECT AVG(pay) FROM shiftlog WHERE workdate BETWEEN '2019-02-07' AND '2019-02-14'
    // SELECT 
    // WEEK(workdate) weeks,
    // sum(pay) as weeklyPay 
    // FROM shiftlog 
    // WHERE workdate >    DATE_SUB(NOW(), INTERVAL 52 WEEK)
    // GROUP BY WEEK(workdate)
    // ORDER BY workdate;

    // GET AVG WEEKLY EARNING BUT ONLY WEEK 0 TO 52 not usefull
    //$queryAVGWeeklyEarnings = "SELECT avg(average) FROM ( SELECT sum(pay) as average FROM shiftlog WHERE workdate > DATE_SUB(NOW(), INTERVAL 52 WEEK) GROUP BY WEEK(workdate) ORDER BY workdate ) as inner_query";
    //AVG WEEKLY EARNING BETWEEN X DATE AND X DATE
    //get earliest date associated with user
    $queryGetOldestUserDate = "SELECT MIN(workdate) FROM shiftlog WHERE ryder_id = '$ryderID'";
    $resultGOUD = mysqli_query($dbc, $queryGetOldestUserDate);

    if(mysqli_num_rows($resultGOUD) > 0) {
        while ($row = mysqli_fetch_array($resultGOUD, MYSQLI_ASSOC)) {
            $oldestUserDate =  $row["MIN(workdate)"];
        }
    } else{
            $response['status'] = 'error';
    }

    $queryAVGWeeklyEarnings = "SELECT avg(pay) FROM ( SELECT WEEK(workdate) weeks,sum(pay) as pay FROM shiftlog WHERE workdate BETWEEN $oldestUserDate AND CURDATE() and ryder_id = '$ryderID' GROUP BY WEEK(workdate) ORDER BY workdate ) as inner_query";
    $resultAVGWE = mysqli_query($dbc, $queryAVGWeeklyEarnings);

    if(mysqli_num_rows($resultAVGWE) > 0) {
        while ($row = mysqli_fetch_array($resultAVGWE, MYSQLI_ASSOC)) {
            $response['avgWeeklyPay'] =  $row["avg(pay)"];
            $response['avgWeeklyPay'] = round($response['avgWeeklyPay'],2);
        }
    } else{
            $response['status'] = 'error';
    }
    // mysql to get avg daily orders (known is that now double orders are viewed as 1 = bug)
    $queryAVGDailyOrders = "SELECT avg(orders) FROM `shiftlog` WHERE ryder_id = '$ryderID'";
    $resultAVGDO = mysqli_query($dbc, $queryAVGDailyOrders);

    if(mysqli_num_rows($resultAVGDO) > 0) {
        while ($row = mysqli_fetch_array($resultAVGDO, MYSQLI_ASSOC)) {
            $response['avgDailyOrders'] =  $row["avg(orders)"];
            $response['avgDailyOrders'] = round($response['avgDailyOrders'],2);
        }
    } else{
            $response['status'] = 'error';
    }
    // data for large chart, between x date and y date
    // return array of data daily orders
    $queryDataDailyOrders = "SELECT orders as weeklyOrders FROM shiftlog WHERE workdate BETWEEN '$oldestUserDate' AND CURDATE() and ryder_id = '$ryderID'";
    
    $resultDDO = mysqli_query($dbc, $queryDataDailyOrders);
    
        if(mysqli_num_rows($resultDDO) > 0) {
            while ($row = mysqli_fetch_array($resultDDO, MYSQLI_ASSOC)) {
                $response['DataDailyOrders'][] =  $row;
            }
        } else{
                $response['status'] = 'error';
        } 
    //return daily hours
    $queryDataDailyHours = "SELECT hours FROM shiftlog WHERE workdate BETWEEN '$oldestUserDate' AND CURDATE() and ryder_id = '$ryderID'";
    $resultDDH = mysqli_query($dbc, $queryDataDailyHours);
    
        if(mysqli_num_rows($resultDDH) > 0) {
            while ($row = mysqli_fetch_array($resultDDH, MYSQLI_ASSOC)) {
                $response['DataDailyHours'][] =  $row;
            }
        } else{
                $response['status'] = 'error';
        } 
    // return  earning
    $queryDataDailyEarnings = "SELECT pay FROM shiftlog WHERE workdate BETWEEN '$oldestUserDate' AND CURDATE() and ryder_id = '$ryderID'";
    $resultDDE = mysqli_query($dbc, $queryDataDailyEarnings);
    
        if(mysqli_num_rows($resultDDE) > 0) {
            while ($row = mysqli_fetch_array($resultDDE, MYSQLI_ASSOC)) {
                $response['DataDailyEarnings'][] =  $row;
            }
        } else{
                $response['status'] = 'error';
        } 



}
mysqli_close($dbc);
echo json_encode($response);

?>
