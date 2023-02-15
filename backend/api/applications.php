<?php

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

            // Student
            if($user_data->data->{'role'} == 3){

                $app_id = 4;
                $query = "SELECT * FROM APPLICATIONS, Users WHERE APPLICATIONS.U_ID = ".$data->{'id'}." AND USERS.U_ID = ".$data->{'id'}." ";
            }
            // Admin
            else if($user_data->data->{'role'} == 2) {
                $query = "SELECT * FROM Applications";
            }
            $stmt = oci_parse($link, $query);
    
            if(oci_execute($stmt)){
                $response = array();
    
                while($row = oci_fetch_array($stmt, OCI_ASSOC)){
                    $application = array();
                    $application["a_name"] = $row["A_NAME"];
                    $application["payment_status"] = $row["PAYMENT_STATUS"];
                    $application["created_on"] = $row["CREATED_ON"];
                    
                    array_push($response, $application);
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

else {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>