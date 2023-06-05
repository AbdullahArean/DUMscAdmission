<?php
// Include config file
require_once "config.php";
require_once "file.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: authorization");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
    return substr($url, 0, -15)."transcripts/$filename";
}


$method = "NONE";

if(isset($_SERVER["REQUEST_METHOD"])){
    $method = $_SERVER["REQUEST_METHOD"];
}

elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
    $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
}


// Processing form data when form is submitted
if($method == "POST"){
    $error = array();
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

            // Files ------------------
            
            if(isset($_FILES["a_pic"])){
            
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "a_pic", $random);
                if(empty($file_err)) $a_picpath = getFileUrl($_SERVER, $_FILES, "a_pic", $random);
            } 
            else{
                $file_err = "Enter picture";
                $error["a_pic"] = $file_err;
            }


            if(isset($_FILES["a_sig"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "a_sig", $random);
                if(empty($file_err)) $a_sigpath = getFileUrl($_SERVER, $_FILES, "a_sig", $random);
            }
            else{
                $file_err = "Enter signature";
                $error["a_sig"] = $file_err;
            }


            if(isset($_FILES["ssc_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                $file_err = saveFile($_SERVER, $_FILES, "ssc_transcript", $random);
                if(empty($file_err)) $ssc_transcript_path = getFileUrl($_SERVER, $_FILES, "ssc_transcript", $random);
            }
            else{
                $file_err = "Enter ssc transcript";
                $error["ssc_transcript"] = $file_err;
            }

            
            if(isset($_FILES["hsc_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                
                $file_err = saveFile($_SERVER, $_FILES, "hsc_transcript", $random);
                if(empty($file_err)) $hsc_transcript_path = getFileUrl($_SERVER, $_FILES, "hsc_transcript", $random);
            } 
            else{
                $file_err = "Enter hsc transcript";
                $error["hsc_transcript"] = $file_err;
            }

            if(isset($_FILES["ug_transcript"])){
                $random = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
                
                $file_err = saveFile($_SERVER, $_FILES, "ug_transcript", $random);
                if(empty($file_err)) $ug_transcript_path = getFileUrl($_SERVER, $_FILES, "ug_transcript", $random);    
            } 
            else{
                $file_err = "Enter ug transcript";
                $error["ug_transcript"] = $file_err;
            }


            if(!isset($_POST["u_id"]) || empty(trim($_POST["u_id"]))){
                $u_id_err = "Please enter a u_id.";
                $error["u_id"] = $u_id_err;
                
            } else {
                $u_id = trim($_POST["u_id"]);
            }

            if(empty($file_err) && empty($u_id_err)){

                $edit_access = false;

                // Get Edit Permission
                $edit_perm_query  = "SELECT edit_permission FROM AdditionalProfileInfo WHERE u_id = ".$u_id;
                // echo($edit_perm_query);
                $edit_perm_stmt = oci_parse($link, $edit_perm_query);
                if(oci_execute($edit_perm_stmt)){
                    while($edit_perm_row = oci_fetch_array($edit_perm_stmt, OCI_ASSOC)){

                        if($edit_perm_row["EDIT_PERMISSION"] == "1")
                        $edit_access = true;
                        else $edit_access = false;
                    }
                }

                if($edit_access){
                    // UPDATE PROFILE TABLE HERE
                    $update_query = "UPDATE SYS.Profile SET a_picpath = '".$a_picpath."', a_sigpath = '".$a_sigpath."', ssc_transcript_path = '".$ssc_transcript_path."', hsc_transcript_path = '".$hsc_transcript_path."', ug_transcript_path = '".$ug_transcript_path."' WHERE u_id = ".$u_id."";
                   
                    
                    $u_st = oci_parse($link, $update_query);
                    $r = oci_execute($u_st);

                    // revoke edit access here
                    $edit_revoke_query = "UPDATE AdditionalProfileInfo SET EDIT_PERMISSION = 0 WHERE u_id=".$u_id;
                    $edit_revoke_s = oci_parse($link, $edit_revoke_query);
                    $edit_revoke_r = oci_execute($edit_revoke_s);
                    

                    // return
                    http_response_code(200);
                    echo json_encode(array("status"=>"Succesful"));
                }
                else{
                    http_response_code(401);
                    echo json_encode([
                        'status' => 0,
                        'message' => "Don't have edit permissions",
                    ]);
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