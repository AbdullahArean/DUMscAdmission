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
    $payment_id  = "";
    $payment_id_err = "";
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

            if(!isset($_POST["payment_id"]) || empty(trim($_POST["payment_id"]))){
                $payment_id_err = "Please enter a payment_id.";
                $error["payment_id"] = $payment_id_err;
                
            } else {
                $payment_id = trim($_POST["app_id"]);
            }

            if(empty($payment_id_err)){
                $amount = 1000;
                $session_key = "87444DE66A7F49BBD892F813A96D6A5C";
                $gateway = "https://sandbox.sslcommerz.com/EasyCheckOut/testcde87444de66a7f49bbd892f813a96d6a5c";
                $query = "UPDATE Payment SET status = 'Success' WHERE payment_id = ".$payment_id;
                
                echo $query;
                $s = oci_parse($link, $query);

                $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
                if (!$r) {    
                    $e = oci_error($s);
                    oci_rollback($link);  // rollback changes
                    trigger_error(htmlentities($e['message']), E_USER_ERROR);
                }
                else{
                    // Commit the changes 
                    $r = oci_commit($link);
                    if (!$r) {
                        $e = oci_error($link);
                        trigger_error(htmlentities($e['message']), E_USER_ERROR);
                    }
                    else{
                        
                        http_response_code(200);
                        echo json_encode([
                            'status' => 1,
                            'gateway' => $gateway,
                        ]);
                    }
                }
            }
           // Validation Failed
            else {
                http_response_code(400);
                echo json_encode($error);
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