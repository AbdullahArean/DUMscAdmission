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
    $app_id  = $message = "";
    $app_id_err = $message_err = "";
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
                $app_id_err = "Please enter an app_id.";
                $error["app_id"] = $app_id_err;
                
            } else {
                $app_id = trim($_POST["app_id"]);
            }

            if(!isset($_POST["message"]) || empty(trim($_POST["message"]))){
                $message_err = "Please enter an message.";
                $error["message"] = $message_err;
                
            } else {
                $message = trim($_POST["message"]);
            }

            if(empty($message_err) &&empty($app_id_err) ){
                $fquery = "SELECT pr.a_phone as phone_number, pr.a_name as name FROM Application ap JOIN Users u ON u.u_id = ap.u_id JOIN Profile pr ON pr.u_id = u.u_id WHERE ap.app_id = ".$app_id;
                $fstmt = oci_parse($link, $fquery);

                $sms_status = "SMS Initiated";

                if(oci_execute($fstmt)){
                    $frow = oci_fetch_array($fstmt, OCI_ASSOC);
                    if($frow){

                        // SMS
                        $formattedMessage = "Dear ".$frow["NAME"].", ".$message. ". Master's Admission Program, Department of Computer Science And Engineering, University of Dhaka.";
                        $phone_number = $frow["PHONE_NUMBER"];
                        $sms_status = send_sms($phone_number, $formattedMessage);
                    }
                }
                    
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