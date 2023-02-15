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
    $application_id = $ug_institution = $ug_subject = $ug_type = $ug_cgpa = $ug_pass_year = $ug_transcript_path = "";
    $application_id_err = $ug_institution_err = $ug_subject_err = $ug_type_err = $ug_cgpa_err = $ug_pass_year_err = $ug_transcript_path_err = "";
    

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

            if(!isset($_POST["application_id"]) || empty(trim($_POST["application_id"]))){
                $application_id_err = "Please enter a application_id.";
                $error["application_id"] = $application_id_err;
            } else {
                $application_id = trim($_POST["application_id"]);
            }

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

            if(isset($_POST["ug_transcript_path"]) && !empty(trim($_POST["ug_transcript_path"]))){
                $ug_transcript_path = trim($_POST["ug_transcript_path"]);
            } 


            if(empty($application_id_err) && empty($ug_institution_err) && empty($ug_subject_err) && empty($ug_type_err) && empty($ug_cgpa_err) && empty($ug_pass_year_err)){
                $application_state = 1;
                $query = "UPDATE SYS.Applications 
                SET ug_institution = ".$ug_institution.", ug_subject = ".$ug_subject.", ug_type = '".$ug_type."', ug_cgpa = ".$ug_cgpa.", ug_pass_year = ".$ug_pass_year.", ug_transcript_path = '".$ug_transcript_path."', submission_status = 1
                WHERE app_id = ".$application_id." ";
                
                // echo $query;

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