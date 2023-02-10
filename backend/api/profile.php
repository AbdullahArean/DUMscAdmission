<?php
// Include config file
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
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $data=$user_data->data;
            echo json_encode([
                'status' => 1,
                'message' => $data,
            ]);
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