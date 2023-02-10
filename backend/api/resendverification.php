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

if($_SERVER["REQUEST_METHOD"] == "GET"){

    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $user_data=$user_data->data;
        
         // Send Veirification Code
         $sql = "SELECT U_ID FROM SYS.USERS WHERE U_MAIL = '".$user_data->email."'";
         $stmt = oci_parse($link, $sql);
         $u_id = 1;
         // Getting user id
         if(oci_execute($stmt)){
             $row = oci_fetch_array($stmt, OCI_ASSOC);
             $u_id = $row["U_ID"];
         }


         $current_timestamp = time();
         $future_timestamp = $current_timestamp + (60 * 5);
         $oracle_timestamp = "FROM_TZ(TO_TIMESTAMP('1970-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS') + NUMTODSINTERVAL(" . $future_timestamp . ", 'SECOND'), 'UTC')";
         $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

         
         $query = "INSERT INTO SYS.VerificationCode (otp_for_user, otp_code, expire_at) VALUES ( ".$u_id.", ".$code.", ". $oracle_timestamp. ")";
         $s = oci_parse($link, $query);
         $r = oci_execute($s);


         // * SENDING THE MAIL
        // $to = $user_data->email;
        // $to = "iam.reduan@gmail.com"
        // $subject = "Account Verification | Dhaka University MSc Admission ";
        // $message = "The verification code is ".$code.". Expires in 5 minutes.";
        // $headers = "From: mscadmission@alvereduan.me\r\n" .
        //     "Reply-To: mscadmission@alvereduan.me\r\n" .
        //     "X-Mailer: PHP/" . phpversion();

        // mail($to, $subject, $message, $headers);
         
         http_response_code(200);
         echo json_encode(array("status"=>"Succesful"));

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