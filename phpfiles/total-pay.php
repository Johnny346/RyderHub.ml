<!DOCTYPE>
<html>
<head>
<title>ryder database</title>
</head>
<!--    student name: John mulcahy
                student nummber: 2916973
 -->
<body>
        <h1>show total payfrom ryder database</h1>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" met$
                <h5>Enter number of shifts in the invoice</h5>
                <br/>
                Enter your ryderid
                <input type="text" name="ryderid" size="20" maxlength="15" requ$

                <input value="Submit" type="submit"/>

        </form>

<?php
echo "<a href='home.php'>home page</a>";
?>


<?php
#incorporate the MySQL connection script
if($_SERVER['REQUEST_METHOD'] == 'POST'){
        require('connect_db.php');

        //echo "<h1>Welcome $ryderid </h1>";





        $ryderid = $_POST["ryderid"];
        $q2 = "SELECT pay FROM shiftlog WHERE ryder_id ='$ryderid'";

                        $r2 = mysqli_query($dbc,$q2);

                        if($r2){
                                $total =0;
                                while($row = mysqli_fetch_array($r2, MYSQLI_ASS$
                                         $total += $row['pay'];


                                }echo "<p>total pay is: ".$total ."</p>";
                        }

}
?>
<a href="test-select-functions.php">test select functions</a>
<a href="total-pay.php">show total pay</a>
</body>
</html>
