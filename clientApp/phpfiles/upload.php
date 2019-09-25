 <?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$target_dir = '/var/www/html/ryderdatastack/cache/';
$target_dir_cache2 = '/home/pi/Desktop/Temp/';

//$target_file = $target_dir . basename($_FILES['file']['name']);
$response = [];

$file_names = $_FILES['file']['name'];
$ryderID = $_FILES['file']['name'][0];
$response['ryderid'] = $_FILES['file']['name'][0];
// need to only allow pdf files to upload
// no dublicate uploads

for ($i = 1; $i < count($file_names); $i++) {
    $file_name =  $_FILES['file']['name'][$i];
    $target_file = $target_dir . basename($_FILES['file']['name'][$i]);
    $target_file_cache2 = $target_dir_cache2.basename($_FILES['file']['name'][$i]);
    $target_pointer = '/var/www/html/ryderdatastack/cache/'.$file_name;
    $response['filename'] = $target_pointer;

    $ext = pathinfo($file_name, PATHINFO_EXTENSION);
    $allowed = array('pdf');
    if(in_array( $ext, $allowed )){
        if(!file_exists($target_pointer)){
            //upload to cache 1 success, meaning no duplicate invoice
            if(move_uploaded_file($_FILES["file"]["tmp_name"][$i], $target_file)){
                // copy file to cache2 and rename file adding ryderid - true indexValue
                copy($target_pointer, $target_dir_cache2 . $ryderID.'-true('.$i.').pdf');
                $response['status'] = 'moved';
                $response['message'] = 'Upload completed successfully';
            }else {
                $response['status'] =  'Failed';
                $response['message'] = 'Upload Unsuccessfull, file already exists';
            }
        }else {
            $response['status'] =  'fail';
            $response['message'] =  'Upload Unsuccessfull, file already exists';
        }
    }else {
         $response['status'] =  'fail';
         $response['message'] =  'Wrong File Type';
        
    }
}

echo json_encode($response);
?>


