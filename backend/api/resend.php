<?php

// Include config file
require_once "config.php";
require_once "sendmail.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once "jwt/JWT.php";
require_once "jwt/Key.php";
$JWT = new JWT;

// CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}

if($_SERVER["REQUEST_METHOD"] == "POST"){

    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $data=$user_data->data;

        $query = "SELECT * FROM Users WHERE U_ID = ".$data->{'id'};
        $stmt = oci_parse($link, $query);
        if(oci_execute($stmt)){

            $row = oci_fetch_array($stmt, OCI_ASSOC);
            if($row){

                if($row["U_VERIFIED"] == 0){
                    $current_timestamp = time();
                    $future_timestamp = $current_timestamp + (60 * 5);
                    $oracle_timestamp = "FROM_TZ(TO_TIMESTAMP('1970-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS') + NUMTODSINTERVAL(" . $future_timestamp . ", 'SECOND'), 'UTC')";
                    $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
            
                    
                    $query = "INSERT INTO SYS.VerificationCode (otp_for_user, otp_code, expire_at) VALUES ( ".$row["U_ID"].", ".$code.", ". $oracle_timestamp. ")";
                    $s = oci_parse($link, $query);
                    $r = oci_execute($s);
                    
                    http_response_code(200);
                    echo json_encode(array("status"=>"Succesful"));
            
                    sendmail($row["U_MAIL"], $code);
                }
                http_response_code(400);
                echo json_encode([
                    'status' => 0,
                    'message' => 'Already verified',
                ]);
            }
            else{
                http_response_code(400);
                echo json_encode([
                    'status' => 0,
                ]);
            }
            
        }
        else{
            http_response_code(400);
            echo json_encode([
                'status' => 0,
            ]);
        }
    }

    catch(Exception $e){
            
        http_response_code(401);
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
   }

    

}
?>