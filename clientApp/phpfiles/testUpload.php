 
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$response = [];

$target_dir = "/var/www/html/ryderdatastack/cache/";
$target_file = $target_dir . basename($_FILES["invoice"]["name"]);

if (!empty($_FILES['invoice']) {
    echo "Sorry, file array is empty";
        $response.status = 'invoice is empty';
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["invoice"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["invoice"]["name"]). " has been upl$
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
 
    
echo json_encode($response);


