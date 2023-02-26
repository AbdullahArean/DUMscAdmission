<?php
// Include config file
require_once "config.php";
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

if($_SERVER["REQUEST_METHOD"] == "GET"){
    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $data=$user_data->data;


        $query = "SELECT * FROM Users NATURAL JOIN Roles WHERE U_ID = ".$data->{'id'};

        $stmt = oci_parse($link, $query);

        if(oci_execute($stmt)){
            $row = oci_fetch_array($stmt, OCI_ASSOC);
            if($row){

                $response = array();
                $response["id"] = $row["U_ID"];
                $response["mail"] = $row["U_MAIL"];
                $response["phone"] = $row["U_PHONE"];
                $response["name"] = $row["U_NAME"];
                $response["role"] = $row["ROLE_NAME"];
                $response["verified"] = $row["U_VERIFIED"];
                $response["profile"] = $row["STUDENT_PROFILE"];


                echo json_encode([
                    'status' => 1,
                    'message' => $response,
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

?>