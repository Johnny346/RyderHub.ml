<?php
$mysqli = @new mysqli('localhost', 'root', '', 'ryderdatabase');

if ($mysqli->connect_errno) {
    die('Connect Error: ' . $mysqli->connect_errno);
}
?>

<?php
#incorporate the MySQL connection script
if($_SERVER['REQUEST_METHOD'] == 'POST'){
        require('connect_db.php');

}
$ryder_id = $_POST["ryderid"];
$invoicedate = $_POST["invoicedate"];


$addinvoice = "INSERT INTO invoice (invoicedate,ryder_id)
VALUES('$invoicedate','$ryder_id')";
                $r1 = mysqli_query($dbc, $addinvoice);
        if($r1){
                echo'<h1>invoice added</h1>';

        }else{
                echo'<h1invoice add Error!</h1>
                <p id="err_msg">The following error(s) occured:<br>';

                echo 'Please try again</p>';
                mysqli_close($dbc);
        }

?>
<?php
echo "<a href='insert-shift.php'>Insert shift page</a>";
?>

