
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: undefined');

include('connect_db.php');


// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

$uploaddir = '/var/www/html/ryderdatastack/cache/';
$uploadfile = $uploaddir . basename($_FILES['file']['name']);

echo 'Here is some more debugging info:';

print_r($_FILES);

$uploaddir = '/var/www/html/ryderdatastack/cache/';
$uploadfile = $uploaddir . basename($_FILE['file']['name']);
$response = [];

if(!empty($_FILES)){
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        echo "File is valid, and was successfully uploaded.\n";
        $response['status'] = 'file uploaded';
    } else {
        echo "Possible file upload attack!\n"; 
        $response['status'] = 'didnt upload';
    }
        $response['fileName'] = $_FILES['file'];
       

}else{
        $response['status'] = 'error';
}
 echo json_encode($response);
?>

