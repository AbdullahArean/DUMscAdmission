<?php
// Include config file
require_once "config.php";
require_once "file.php";

// Allow from any origin
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


function getFileUrl($SERVER, $FILES, $field, $random){
    $url = $SERVER['REQUEST_SCHEME'] . "://$SERVER[HTTP_HOST]$SERVER[REQUEST_URI]";
    $url = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
    $filename = $random.basename($FILES[$field]["name"]);
    return substr($url, 0, -11)."transcripts/$filename";
}

if($_SERVER["REQUEST_METHOD"] == "GET"){

    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $data=$user_data->data;


        $query = "SELECT * FROM Profile WHERE U_ID = ".$data->{'id'};

        $stmt = oci_parse($link, $query);

        if(oci_execute($stmt)){
            $row = oci_fetch_array($stmt, OCI_ASSOC);
            if($row){
                echo json_encode([
                    'status' => 1,
                    'message' => $row,
                ]);
            }
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

else if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $error = array();
    $dept_id = $a_name = $f_name = $m_name = $a_dob = $a_phone = $a_mail = $a_picpath = $a_sigpath = $ssc_roll = $ssc_reg = $ssc_board = $ssc_year = $ssc_result = $ssc_transcript_path =  $hsc_roll = $hsc_reg = $hsc_board = $hsc_year = $hsc_result = $hsc_transcript_path = "";
    $a_name_err = $f_name_err = $m_name_err = $a_dob_err = $a_phone_err = $a_mail_err = $ssc_roll_err = $ssc_reg_err = $ssc_board_err = $ssc_year_err = $ssc_result_err = $hsc_roll_err = $hsc_reg_err = $hsc_board_err = $hsc_year_err = $hsc_result_err = "";
    $dept_id_err = $application_id = $ug_institution = $ug_subject = $ug_type = $ug_cgpa = $ug_pass_year = $ug_transcript_path = "";
    $application_id_err = $ug_institution_err = $ug_subject_err = $ug_type_err = $ug_cgpa_err = $ug_pass_year_err = $ug_transcript_path_err = "";

    $du_reg = $ug_uni = $ug_sub = "";

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


        if($user_data->data->{'role'} == 3){

            
            
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

            

            // Undergrad -------------

            if(!isset($_POST["ug_institution"]) || empty(trim($_POST["ug_institution"]))){
                $ug_institution_err = "Please enter a ug_institution.";
                $error["ug_institution"] = $ug_institution_err;
            } else {
                $ug_institution = trim($_POST["ug_institution"]);
            }

            if(!isset($_POST["ug_subject"]) || empty(trim($_POST["ug_subject"]))){
                $ug_subject_err = "Please enter a ug_subject.";
                $error["ug_subject"] = $ug_subject_err;
            } else {
                $ug_subject = trim($_POST["ug_subject"]);
            }

            if(!isset($_POST["ug_type"]) || empty(trim($_POST["ug_type"]))){
                $ug_type_err = "Please enter a ug_type.";
                $error["ug_type"] = $ug_type_err;
            } else {
                $ug_type = trim($_POST["ug_type"]);
            }

            if(!isset($_POST["ug_cgpa"]) || empty(trim($_POST["ug_cgpa"]))){
                $ug_cgpa_err = "Please enter a ug_cgpa.";
                $error["ug_cgpa"] = $ug_cgpa_err;
            } else {
                $ug_cgpa = trim($_POST["ug_cgpa"]);
            }

            if(!isset($_POST["ug_pass_year"]) || empty(trim($_POST["ug_pass_year"]))){
                $ug_pass_year_err = "Please enter a ug_pass_year.";
                $error["ug_pass_year"] = $ug_pass_year_err;
            } else {
                $ug_pass_year = trim($_POST["ug_pass_year"]);
            }

            // Files ------------------
            
            if(isset($_FILES["a_pic"])){
            
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "a_pic", $random);
                if(empty($file_err)) $a_picpath = getFileUrl($_SERVER, $_FILES, "a_pic", $random);
                
                
            } 
            if(isset($_FILES["a_sig"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "a_sig", $random);
                if(empty($file_err)) $a_sigpath = getFileUrl($_SERVER, $_FILES, "a_sig", $random);
            } 
            if(isset($_FILES["ssc_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "ssc_transcript", $random);
                if(empty($file_err)) $ssc_transcript_path = getFileUrl($_SERVER, $_FILES, "ssc_transcript", $random);
            } 
            if(isset($_FILES["hsc_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                
                $file_err = saveFile($_SERVER, $_FILES, "hsc_transcript", $random);
                if(empty($file_err)) $hsc_transcript_path = getFileUrl($_SERVER, $_FILES, "hsc_transcript", $random);
            } 

            if(isset($_FILES["ug_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                
                $file_err = saveFile($_SERVER, $_FILES, "ug_transcript", $random);
                if(empty($file_err)) $ug_transcript_path = getFileUrl($_SERVER, $_FILES, "ug_transcript", $random);    
            } 

            // echo $a_picpath;

            // ------- UPDATES -----
            if(isset($_POST["du_reg"])){
                $du_reg = trim($_POST["du_reg"]);
            }

            if(isset($_POST["ug_uni"])){
                $ug_uni = trim($_POST["ug_uni"]);
            }

            if(isset($_POST["ug_sub"])){
                $ug_sub = trim($_POST["ug_sub"]);
            }


            // Request -------------
            if(empty($a_a_name_errname) && empty($f_name_err) && empty($m_name_err) && empty($a_dob_err) && empty($a_phone_err) && empty($a_mail_err) && empty($ssc_roll_err) && empty($ssc_reg_err) && empty($ssc_board_err) && empty($ssc_year_err) && empty($ssc_result_err) && empty($hsc_roll_err) && empty($hsc_reg_err) && empty($hsc_board_err) && empty($hsc_year_err) && empty($hsc_result_err)
            &&  empty($ug_institution_err) && empty($ug_subject_err) && empty($ug_type_err) && empty($ug_cgpa_err) && empty($ug_pass_year_err)
            ){
                $profile_state = 1;

                
                $query = "INSERT INTO SYS.Profile (u_id, a_name, f_name, m_name, a_picpath, a_sigpath, a_dob, a_phone, a_mail, ssc_roll, ssc_reg, ssc_board, ssc_year, ssc_result, ssc_transcript_path,  hsc_roll, hsc_reg, hsc_board, hsc_year, hsc_result, hsc_transcript_path, ug_institution, ug_subject, ug_type, ug_cgpa, ug_pass_year, ug_transcript_path, profile_state, du_reg, ug_uni, ug_sub) 
                VALUES (".$data->{'id'}.", '".$a_name."', '".$f_name."', '".$m_name."', '".$a_picpath."', '".$a_sigpath."', '".$a_dob."', '".$a_phone."', '" .$a_mail."', '".$ssc_roll."', '".$ssc_reg."', '".$ssc_board."', '".$ssc_year."', '".$ssc_result."', '".$ssc_transcript_path."', '".$hsc_roll."', '".$hsc_reg."', '".$hsc_board."', '".$hsc_year."', '".$hsc_result."', '".$hsc_transcript_path."', '".$ug_institution."', '".$ug_subject."', '".$ug_type."', ".$ug_cgpa.", ".$ug_pass_year.", '".$ug_transcript_path."', ".$profile_state.", '".$du_reg."', '".$ug_uni."', '".$ug_sub."')";

                // echo $query;
                $s = oci_parse($link, $query);
                $r = oci_execute($s, OCI_NO_AUTO_COMMIT);

                if (!$r) {    
                    $e = oci_error($s);
                    oci_rollback($link);  // rollback changes
                    http_response_code(400);
                        echo json_encode([
                            'status' => 1,
                            'message' => "Could not save data.",
                        ]);
                    // trigger_error(htmlentities($e['message']), E_USER_ERROR);
                    exit();
                }
                else{
                    // Commit the changes 
                    $r = oci_commit($link);
                    if (!$r) {
                        $e = oci_error($link);
                        // trigger_error(htmlentities($e['message']), E_USER_ERROR);
                        http_response_code(400);
                        echo json_encode([
                            'status' => 2,
                            'message' => "Could not save data.",
                        ]);

                        exit();
                    }
                    else{
                        // DONE 

                        /* SET PROFILE COMPLETED */
                        $query = "UPDATE USERS SET STUDENT_PROFILE = 1 WHERE U_ID = ".$data->{'id'};
                        $s = oci_parse($link, $query);
                        $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
                        $r = oci_commit($link);

                        http_response_code(201);
                        echo json_encode([
                            'status' => 1,
                            'message' => "Successful",
                        ]);

                        exit();
                    }
                }

            }


            // Validation Failed
            else {
                http_response_code(400);
                echo json_encode($error);
            }

        }

        else{
            http_response_code(401);
            echo json_encode([
                'status' => 0,
                'message' => "Only students can apply.",
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