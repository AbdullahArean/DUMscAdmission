<?php

require_once "config.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once "jwt/JWT.php";
require_once "jwt/Key.php";
$JWT = new JWT;

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $error = array();
    $a_name = $f_name = $m_name = $a_dob = $a_phone = $a_mail = $a_picpath = $a_sigpath = $ssc_roll = $ssc_reg = $ssc_board = $ssc_year = $ssc_result = $ssc_transcript_path =  $hsc_roll = $hsc_reg = $hsc_board = $hsc_year = $hsc_result = $hsc_transcript_path = "";
    $a_name_err = $f_name_err = $m_name_err = $a_dob_err = $a_phone_err = $a_mail_err = $ssc_roll_err = $ssc_reg_err = $ssc_board_err = $ssc_year_err = $ssc_result_err = $hsc_roll_err = $hsc_reg_err = $hsc_board_err = $hsc_year_err = $hsc_result_err = "";

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

        // Only Students can create 
        if($user_data->data->{'role'} == 3){

            // Check if already applied
            $query = "SELECT * FROM APPLICATIONS, Users WHERE APPLICATIONS.U_ID = ".$data->{'id'}." AND USERS.U_ID = ".$data->{'id'}." ";

            $stmt = oci_parse($link, $query);
    
            if(oci_execute($stmt)){
                $response = array();
    
                if($row = oci_fetch_array($stmt, OCI_ASSOC)){
                    http_response_code(400);
                    echo json_encode([
                        'status' => 0,
                        'message' => "Already Applied.",
                    ]);
                    exit();
                }
            }

            if(!isset($_POST["a_name"]) || empty(trim($_POST["a_name"]))){
                $a_name_err = "Please enter a a_name.";
                $error["a_name"] = $a_name_err;
            } else {
                $a_name = trim($_POST["a_name"]);
            }

            if(!isset($_POST["f_name"]) || empty(trim($_POST["f_name"]))){
                $f_name_err = "Please enter a f_name.";
                $error["f_name"] = $f_name_err;
            } else {
                $f_name = trim($_POST["f_name"]);
            }

            if(!isset($_POST["m_name"]) || empty(trim($_POST["m_name"]))){
                $m_name_err = "Please enter a m_name.";
                $error["m_name"] = $m_name_err;
            } else {
                $m_name = trim($_POST["m_name"]);
            }

            if(!isset($_POST["a_dob"]) || empty(trim($_POST["a_dob"]))){
                $a_dob_err = "Please enter a a_dob.";
                $error["a_dob"] = $a_dob_err;
            } else {
                $a_dob = trim($_POST["a_dob"]);
            }

            if(!isset($_POST["a_phone"]) || empty(trim($_POST["a_phone"]))){
                $a_phone_err = "Please enter a a_phone.";
                $error["a_phone"] = $a_phone_err;
            } else {
                $a_phone = trim($_POST["a_phone"]);
            }

            if(!isset($_POST["a_mail"]) || empty(trim($_POST["a_mail"]))){
                $a_mail_err = "Please enter a a_mail.";
                $error["a_mail"] = $a_mail_err;
            } else {
                $a_mail = trim($_POST["a_mail"]);
            }

            // SSC ------------------

            if(!isset($_POST["ssc_roll"]) || empty(trim($_POST["ssc_roll"]))){
                $ssc_roll_err = "Please enter a ssc_roll.";
                $error["ssc_roll"] = $ssc_roll_err;
            } else {
                $ssc_roll = trim($_POST["ssc_roll"]);
            }

            if(!isset($_POST["ssc_reg"]) || empty(trim($_POST["ssc_reg"]))){
                $ssc_reg_err = "Please enter a ssc_reg.";
                $error["ssc_reg"] = $ssc_reg_err;
            } else {
                $ssc_reg = trim($_POST["ssc_reg"]);
            }

            if(!isset($_POST["ssc_board"]) || empty(trim($_POST["ssc_board"]))){
                $ssc_board_err = "Please enter a ssc_board.";
                $error["ssc_board"] = $ssc_board_err;
            } else {
                $ssc_board = trim($_POST["ssc_board"]);
            }

            if(!isset($_POST["ssc_year"]) || empty(trim($_POST["ssc_year"]))){
                $ssc_year_err = "Please enter a ssc_year.";
                $error["ssc_year"] = $ssc_year_err;
            } else {
                $ssc_year = trim($_POST["ssc_year"]);
            }

            if(!isset($_POST["ssc_result"]) || empty(trim($_POST["ssc_result"]))){
                $ssc_result_err = "Please enter a ssc_result.";
                $error["ssc_result"] = $ssc_result_err;
            } else {
                $ssc_result = trim($_POST["ssc_result"]);
            }

            // HSC ------------------

            if(!isset($_POST["hsc_roll"]) || empty(trim($_POST["hsc_roll"]))){
                $hsc_roll_err = "Please enter a hsc_roll.";
                $error["hsc_roll"] = $hsc_roll_err;
            } else {
                $hsc_roll = trim($_POST["hsc_roll"]);
            }

            if(!isset($_POST["hsc_reg"]) || empty(trim($_POST["hsc_reg"]))){
                $hsc_reg_err = "Please enter a hsc_reg.";
                $error["hsc_reg"] = $hsc_reg_err;
            } else {
                $hsc_reg = trim($_POST["hsc_reg"]);
            }

            if(!isset($_POST["hsc_board"]) || empty(trim($_POST["hsc_board"]))){
                $hsc_board_err = "Please enter a hsc_board.";
                $error["hsc_board"] = $hsc_board_err;
            } else {
                $hsc_board = trim($_POST["hsc_board"]);
            }

            if(!isset($_POST["hsc_year"]) || empty(trim($_POST["hsc_year"]))){
                $hsc_year_err = "Please enter a hsc_year.";
                $error["hsc_year"] = $hsc_year_err;
            } else {
                $hsc_year = trim($_POST["hsc_year"]);
            }

            if(!isset($_POST["hsc_result"]) || empty(trim($_POST["hsc_result"]))){
                $hsc_result_err = "Please enter a hsc_result.";
                $error["hsc_result"] = $hsc_result_err;
            } else {
                $hsc_result = trim($_POST["hsc_result"]);
            }


            if(isset($_POST["a_picpath"]) && !empty(trim($_POST["a_picpath"]))){
                $a_picpath = trim($_POST["a_picpath"]);
            } 
            if(isset($_POST["a_sigpath"]) && !empty(trim($_POST["a_sigpath"]))){
                $a_sigpath = trim($_POST["a_sigpath"]);
            } 
            if(isset($_POST["ssc_transcript_path"]) && !empty(trim($_POST["ssc_transcript_path"]))){
                $ssc_transcript_path = trim($_POST["ssc_transcript_path"]);
            } 
            if(isset($_POST["hsc_transcript_path"]) && !empty(trim($_POST["hsc_transcript_path"]))){
                $hsc_transcript_path = trim($_POST["hsc_transcript_path"]);
            } 

            if(empty($a_a_name_errname) && empty($f_name_err) && empty($m_name_err) && empty($a_dob_err) && empty($a_phone_err) && empty($a_mail_err) && empty($ssc_roll_err) && empty($ssc_reg_err) && empty($ssc_board_err) && empty($ssc_year_err) && empty($ssc_result_err) && empty($hsc_roll_err) && empty($hsc_reg_err) && empty($hsc_board_err) && empty($hsc_year_err) && empty($hsc_result_err)){
                $application_state = 1;
                $query = "INSERT INTO SYS.Applications (u_id, a_name, f_name, m_name, a_picpath, a_sigpath, a_dob, a_phone, a_mail, ssc_roll, ssc_reg, ssc_board, ssc_year, ssc_result, ssc_transcript_path,  hsc_roll, hsc_reg, hsc_board, hsc_year, hsc_result, hsc_transcript_path, application_state) 
                VALUES (".$data->{'id'}.", '".$a_name."', '".$f_name."', '".$m_name."', '".$a_picpath."', '".$a_sigpath."', '".$a_dob."', '".$a_phone."', '" .$a_mail."', '".$ssc_roll."', '".$ssc_reg."', '".$ssc_board."', '".$ssc_year."', '".$ssc_result."', '".$ssc_transcript_path."', '".$hsc_roll."', '".$hsc_reg."', '".$hsc_board."', '".$hsc_year."', '".$hsc_result."', '".$hsc_transcript_path."', ".$application_state.")";

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
                        // DONE 
                        http_response_code(200);
                        echo json_encode([
                            'status' => 1,
                            'message' => "Successful",
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
        // Not enough Permission
        else {
            http_response_code(401);
            echo json_encode([
                'status' => 0,
                'message' => "Not enogh permissions.",
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
else {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}

?>