<?php

require_once "config.php";
require_once "sendmail.php";
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}


$method = "NONE";

if(isset($_SERVER["REQUEST_METHOD"])){
    $method = $_SERVER["REQUEST_METHOD"];
}

elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
    $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
}


if ($method == "POST"){
    $error = array();
    $email = $code = $password = "";
    $email_err = $code_err = $password_err = "";

    if(!isset($_POST["email"]) || empty(trim($_POST["email"]))){
        $email_err = "Please enter a email.";
        $error["email"] = $email_err;
    } else {
        $email = trim($_POST["email"]);
    }

    if(!isset($_POST["code"]) || empty(trim($_POST["code"]))){
        $code_err = "Please enter a code.";
        $error["code"] = $code_err;
    } else {
        $code = trim($_POST["code"]);
    }

    if(!isset($_POST["password"]) || empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";
        $error["password"] = $password_err;
    } else {
        $password = trim($_POST["password"]);
    }


    if(empty($email_err) && empty($code_err) && empty($password_err)){
    
        $query = "SELECT PR_ID, PR_CODE FROM PASSWORD_RESET WHERE PR_EMAIL = '".$email."' AND PR_USED = 0";
        $s = oci_parse($link, $query);
        $r = oci_execute($s);
        if(oci_execute($s)){
            $row = oci_fetch_array($s, OCI_ASSOC);

            if($row){
                if((int)$row['PR_CODE'] == (int)$code){
                    $hased_password = password_hash($password, PASSWORD_DEFAULT);
                    $query = "UPDATE USERS SET U_PASSWORD = '".$hased_password."' WHERE U_MAIL = '".$email."'";
                    $s = oci_parse($link, $query);
                    // echo $query;

                    $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
                    if (!$r) {    
                        $e = oci_error($s);
                        oci_rollback($link);  // rollback changes
                        trigger_error(htmlentities($e['message']), E_USER_ERROR);
                    } else{
                        // Commit the changes 
                        $r = oci_commit($link);
                        if (!$r) {
                            $e = oci_error($link);
                            trigger_error(htmlentities($e['message']), E_USER_ERROR);
                        }
                        else{
                            $query = "UPDATE PASSWORD_RESET SET PR_USED = 1 WHERE PR_EMAIL = '".$email."'";
                            $s = oci_parse($link, $query);
                            $r = oci_execute($s);
                            http_response_code(200);
                        }

                    }
                }

            }

            else {
                http_response_code(400);
                echo json_encode([
                    'message' => "Invalid Email."
                ]);
            }

        }
        else{
            http_response_code(400);
                echo json_encode([
                    'message' => "Internal Error."
                ]);
        }
    }

    else{
        http_response_code(400);
        echo json_encode($error);
    }

}



?>