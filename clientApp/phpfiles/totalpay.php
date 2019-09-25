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
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" >
                <h5>Enter number of shifts in the invoice</h5>
                <br/>
                Enter your ryderid
                <input type="text" name="ryderid" size="20" maxlength="15" >

                <input value="Submit" type="submit"/>

        </form>

<?php
echo "<a href='home.php'>home page</a>";
?>


<?php

#incorporate the MySQL connection script

        echo "method was post";
        $con=mysqli_connect("localhost", "John" , "Number2233..db" , "ryderdatabase");
// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

        $ryderid = $_POST["ryderid"];
        $sql = "SELECT pay FROM shiftlog WHERE ryder_id ='$ryderid'";

// Execute multi query
if (mysqli_multi_query($con,$sql))
{
  do
    {
    // Store first result set
    if ($result=mysqli_store_result($con)) {
      // Fetch one and one row
      while ($row=mysqli_fetch_row($result))
        {
        echo $row[0];
        }
      // Free result set
      mysqli_free_result($result);
      }
    }
  while (mysqli_next_result($con));
}

mysqli_close($con);

?>
<?php
$mysqli = new mysqli("localhost", "John" , "Number2233..db" , "ryderdatabase");

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

$query = "SELECT pay FROM shiftlog WHERE ryder_id = 92306";

if ($result = $mysqli->query($query)) {
        $total = 0;
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
        $total += $row["pay"];
    }echo "<h3>Total pay is $total </h3>";

    /* free result set */
    $result->free();
}
?>

<a href="test-select-functions.php">test select functions</a>
<a href="total-pay.php">show total pay</a>
</body>
</html>
