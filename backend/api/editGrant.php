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
                    $query = "UPDATE AdditionalProfileInfo SET EDIT_PERMISSION = 1 WHERE u_id=".$u_id;
                }
                else{
                    $query = "INSERT INTO AdditionalProfileInfo (U_ID, EDIT_PERMISSION) VALUES (" . $u_id.", 1)";
                }

                $s = oci_parse($link, $query);
                $r = oci_execute($s);

                /* SEND NOTIFICATIONS */
                $fquery = "SELECT pr.a_phone as phone_number, u.u_mail as u_mail, pr.a_name as name FROM Application ap JOIN Users u ON u.u_id = ap.u_id JOIN Profile pr ON pr.u_id = u.u_id WHERE ap.app_id = ".$app_id;
                $fstmt = oci_parse($link, $fquery);

                $sms_status_count = 0;

                if(oci_execute($fstmt)){
                    $frow = oci_fetch_array($fstmt, OCI_ASSOC);
                    if($frow){

                        // SMS
                        $formattedMessage = "Dear ".$frow["NAME"].", "."We could not verify your application due to some missing files/informations. Please check your email for further instructions.". " Master's Admission Program, Department of Computer Science And Engineering, University of Dhaka.";
                        $phone_number = $frow["PHONE_NUMBER"];

                        echo("SENDING SMS TO ".$phone_number);
                        $sms_status = send_sms($phone_number, $formattedMessage);

                        $formattedEmail = "Dear " . $frow["NAME"] . ",\n\n" . "We could not verify your application due to some missing files/informations. Please go to msadmission.cse.du.ac.bd -> 'My submissions' and Edit your profile. \n\nPlease maintain the following naming conventions for your files.\n\nphoto.jpg\nsignature.jpg\nssc.jpg / ssc.pdf\nhsc.jpg / hsc.pdf\nbsc.jpg / bsc.pdf\n\nAlso try to compress the files below 1MB to avoid further issues.\n\nIf you still face further issues, contact iam.reduan@gmail.com\n" . "\n\nMaster's Admission Program \nDepartment of Computer Science And Engineering, \nUniversity of Dhaka.";
                        $u_mail = $frow["U_MAIL"];

                        echo("SENDING EMAIL TO ".$u_mail);
                        sendCustomMail($u_mail, $formattedEmail);

                        
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