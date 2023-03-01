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
    $email = "";
    $email_err = "";

    if(!isset($_POST["email"]) || empty(trim($_POST["email"]))){
        $email_err = "Please enter a email.";
        $error["email"] = $email_err;
    } else {
        $email = trim($_POST["email"]);
    }


    if(empty($email_err)){
        $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $query = "INSERT INTO SYS.PASSWORD_RESET (PR_CODE, PR_EMAIL) VALUES (".$code.", '".$_POST["email"]."')";
        $s = oci_parse($link, $query);
        $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
        if (!$r) {    
            $e = oci_error($s);
            oci_rollback($link);  // rollback changes
            // trigger_error(htmlentities($e['message']), E_USER_ERROR);
            http_response_code(400);
        }
        else{
            // Commit the changes 
            $r = oci_commit($link);
            if (!$r) {
                $e = oci_error($link);
                // trigger_error(htmlentities($e['message']), E_USER_ERROR);
                http_response_code(400);
                
            }

            else{
                sendResetPassword($_POST["email"], $code);
                http_response_code(200);
                exit();
            }
        }
    }
    else{
        http_response_code(400);
        echo json_encode($error);
    }

}



?>