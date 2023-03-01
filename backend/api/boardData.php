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


if($_SERVER["REQUEST_METHOD"] == "POST"){
    try{
        $allheaders=getallheaders();
        $jwt=$allheaders['Authorization'];
    
        $secret_key = "shhhhhhhhhh";
        // $user_data=JWT::decode($jwt, $secret_key, 'HS256');
        $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $data=$user_data->data;

        $error = array();
        $hsid = $hsid_error = "";

        if(!isset($_POST["hsid"]) || empty(trim($_POST["hsid"]))){
            $hsid_error = "Please enter a hsid.";
            $error["hsid"] = $hsid_error;
        } else {
            $hsid = trim($_POST["hsid"]);
        }

        if(empty($hsid_error)){
            $xml_body = '<dupgwp>
            <header>
            <pgwkey>abcd</pgwkey>
            <pgwreqid>12</pgwreqid>
            </header>
            <body>
            <requestdata>
            <service>
            <gentime>20191023193141</gentime>
            <priority>OT</priority>
            </service>
            <params>
            <param>
            <query-data>
            <hsid>'.$hsid.'</hsid>
            </query-data>
            </param>
            </params>
            </requestdata>
            </body>
            </dupgwp>';

            $url = 'https://regservices.eis.du.ac.bd/edusections/preregistration/getboarddata';
            
            
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_body);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/xml'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($ch);
            
            // Check for errors
            if(curl_errno($ch)) {
                echo 'Error: ' . curl_error($ch);
            }
            curl_close($ch);
            echo $response;
        }

        else{
            http_response_code(400);
            echo json_encode([
                'status' => 0,
                'message' => "Provide  hsid"
            ]);
        }
    }
    catch(Exception $e){
            
        http_response_code(401);
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
   }

}

else{
    echo "NOT HERE";
}




?>