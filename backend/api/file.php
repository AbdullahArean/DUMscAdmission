<?php

// Include config file
require_once "config.php";
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}


function saveFile($SERVER, $FILES, $field, $random){

    $filename = $random.basename($FILES[$field]["name"]);
    
    $target_dir = getcwd().DIRECTORY_SEPARATOR."transcripts".DIRECTORY_SEPARATOR;
    $target_file = $target_dir.$filename;
    $error = "";


    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    // $check = getimagesize($FILES["file"]["tmp_name"]);
    // if($check !== false) {
    //     $error = "File is an image - " . $check["mime"] . ".";
    //     $uploadOk = 1;
    // } else {
    //     $error = "File is not an image.";
    //     $uploadOk = 0;
    // }
    

        
        
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
        $error = "Sorry, only JPG, JPEG, PNG files are allowed.";
        $uploadOk = 0;
    }
    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        $error = "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($FILES[$field]["tmp_name"], $target_file)) {
            // echo "The file ". htmlspecialchars( basename( $FILES["fileToUpload"]["name"])). " has been uploaded.";
        } else {
            $error = "Sorry, there was an error uploading your file.";
        }
    }

    return $error;
}





// if($_SERVER["REQUEST_METHOD"] == "POST"){
    
//     $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
//     $error = saveFile($_SERVER, $_FILES, "file", $random);
//     if(empty($error)){
//         http_response_code(201);
//         echo getFileUrl($_SERVER, $random);
//     }
//     else{
//         http_response_code(400);
//         echo json_encode([
//             'status' => 0,
//             'error' => $error,
//         ]);
//     }
// }


?>