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
$JWT = new JWT;

$method = "NONE";

if(isset($_SERVER["REQUEST_METHOD"])){
    $method = $_SERVER["REQUEST_METHOD"];
}

elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
    $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
}


if ($method == "POST"){

    $query = "UPDATE PAYMENT SET STATUS = 'FAILED' WHERE TRX_ID = '".$_GET['tran']."'";
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
            
            // PAYMENT FLAG UPDATE
            header("Location: https://msadmission.cse.du.ac.bd/submission");
            echo'<script> window.location="https://msadmission.cse.du.ac.bd/submission"; </script> ';
            http_response_code(200);        
            exit();
        }
    }
    
}

?>