<?php
// Include config file
require_once "config.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once "jwt/JWT.php";
require_once "jwt/Key.php";
$JWT = new JWT;

$code =  $otp_code = "" ;
$code_err = "";
$error = array();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $user_data=$user_data->data;

        // CHECK FOR VALID CODE
        if (!isset($_POST["code"]) || empty(trim($_POST["code"]))) {
            $code_err = "Must enter a code";
            $error["code"] = $code_err;
        } 
        
        else {
            $code = trim($_POST["code"]);

            // MATCH CODE
            $query = "SELECT otp_code FROM Sys.VerificationCode WHERE otp_for_user = ".$user_data->id."  ORDER BY expire_at DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY";    
            $stmt = oci_parse($link, $query);
            if(oci_execute($stmt)){
                
                $row = oci_fetch_array($stmt, OCI_ASSOC);
    
                if($row){
                    $otp_code = $row["OTP_CODE"];
                }
                else{
                    $code_err = "Code expired.";
                    $error["code"] = $code_err;
                }
            }
            else{
                $code_err = "Could not connect to server. Please try again later.";
                $error["code"] = $code_err;
            } 
        }
        
        if(empty($code_err) && $code == $otp_code && $code != ""){
        
            $query = "UPDATE Users SET u_verified = 1 WHERE u_id = ".$user_data->id;
            $s = oci_parse($link, $query);
            $r = oci_execute($s);
            
            http_response_code(200);
            echo json_encode(array("status"=>"Succesful"));
        }
        else{
            $code_err = "Code did not match.";
            $error["code"] = $code_err;

            http_response_code(400);
            echo json_encode( $error);
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

else {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);

}


?>