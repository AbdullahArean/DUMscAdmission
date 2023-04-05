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

if($method == "GET"){
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
        $query = "";

        if($user_data->data->{'role'} == 2) {
            $accoutOpenedQuery = "SELECT COUNT(*) AS TOTAL_USERS FROM USERS WHERE CREATED_ON>='31-MAR-23'";
            $appliedQuery = "SELECT COUNT(*) AS APPLIED FROM APPLICATION WHERE CREATED_ON>='31-MAR-23'";
            $paymentSuccessfulQuery = "SELECT COUNT(*) AS PAYMENTNO FROM PAYMENT WHERE STATUS = 'SUCCESS' AND CREATED_ON>='31-MAR-23'";
            $paymentAmountQuery = "SELECT SUM(AMOUNT) AS PAYMENTAMOUNT FROM PAYMENT WHERE STATUS = 'SUCCESS' AND CREATED_ON>='31-MAR-23'";
        

            $stmt1 = oci_parse($link, $accoutOpenedQuery);
            $stmt2 = oci_parse($link, $appliedQuery);
            $stmt3 = oci_parse($link, $paymentSuccessfulQuery);
            $stmt4 = oci_parse($link, $paymentAmountQuery);
            
            
            $response = array();

            if(oci_execute($stmt1)){
                while($row1 = oci_fetch_array($stmt1, OCI_ASSOC)){
                    $response['account_opened'] = $row1["TOTAL_USERS"];
                }
            }
            if(oci_execute($stmt2)){
                while($row2 = oci_fetch_array($stmt2, OCI_ASSOC)){
                    $response['applied'] = $row2["APPLIED"];
                }
            }
            if(oci_execute($stmt3)){
                while($row3 = oci_fetch_array($stmt3, OCI_ASSOC)){
                    $response['payment_no'] = $row3["PAYMENTNO"];
                }
            }
            if(oci_execute($stmt4)){
                while($row4 = oci_fetch_array($stmt4, OCI_ASSOC)){
                    $response['payment_amount'] = $row4["PAYMENTAMOUNT"];
                }
            }

            echo json_encode(
                $response
            );
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