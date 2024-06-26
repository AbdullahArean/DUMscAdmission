<?php

require_once "config.php";
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once "jwt/JWT.php";
require_once "jwt/Key.php";

require_once "sendmail.php";
require_once "sendsms.php";

$JWT = new JWT;

$method = "NONE";

if(isset($_SERVER["REQUEST_METHOD"])){
    $method = $_SERVER["REQUEST_METHOD"];
}

elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
    $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
}


if ($method == "POST"){
    $error = array();
    $app_id  = $u_id = "";
    $app_id_err = $u_id_err = "";
    try{
        $allheaders=getallheaders();
            if(isset($allheaders['Authorization'])){
                $jwt=$allheaders['Authorization'];
                }
                else{
                    http_response_code(401);
                    echo json_encode([
                        'status' => 401,
                    ]);
                    exit();
                }
        
            $secret_key = "shhhhhhhhhh";
            // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
            $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
            $data=$user_data->data;


        // Only Admin can update 
        if($user_data->data->{'role'} == 2){

            if(!isset($_POST["app_id"]) || empty(trim($_POST["app_id"]))){
                $app_id_err = "Please enter app_id.";
                $error["app_id"] = $app_id_err;
                
            } else {
                $app_id = trim($_POST["app_id"]);
            }

            if(!isset($_POST["u_id"]) || empty(trim($_POST["u_id"]))){
                $u_id_err = "Please enter u_id.";
                $error["u_id"] = $u_id_err;
                
            } else {
                $u_id = trim($_POST["u_id"]);
            }

            if(empty($app_id_err) && empty($u_id_err) ){

                /*
                Check if row exists.
                if yes, update
                if nor, insert
                */
                $row_cnt = 0;
                $edit_perm_query  = "SELECT * FROM AdditionalProfileInfo WHERE u_id = ".$u_id;
                $edit_perm_stmt = oci_parse($link, $edit_perm_query);
                if(oci_execute($edit_perm_stmt)){
                    while($edit_perm_row = oci_fetch_array($edit_perm_stmt, OCI_ASSOC)){
                        $row_cnt += 1;
                    }
                }

                $query = "";
                if($row_cnt > 0){
                    $query = "UPDATE AdditionalProfileInfo SET EDIT_PERMISSION = 0 WHERE u_id=".$u_id;
                }
                else{
                    $query = "INSERT INTO AdditionalProfileInfo (U_ID, EDIT_PERMISSION) VALUES (" . $u_id.", 0)";
                }

                $s = oci_parse($link, $query);
                $r = oci_execute($s);

                
                
                    
                http_response_code(200);
                echo json_encode([
                    'status' => 1,
                    'sms' => $sms_status
                ]);
                
            }
           // Validation Failed
            else {
                http_response_code(400);
                echo json_encode($error);
            }
        }

        // Not enough Permission
        else {
            http_response_code(401);
            echo json_encode([
                'status' => 0,
                'message' => "Only admins have permission.",
            ]);
        }
    }

    catch(Exception $e){
        http_response_code(400);
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
    }

}

?>