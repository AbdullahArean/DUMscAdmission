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
    $error = array();
    $dept_id = $published =  "";
    $dept_id_err = $published_err = "";
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
            $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
            $data=$user_data->data;

            $user_dept_query = "SELECT DEPT_ID FROM USERS WHERE U_ID=".$user_data->data->{'id'};
            $user_dept_stmt = oci_parse($link, $user_dept_query);
            oci_execute($user_dept_stmt);
            $user_dept_row = oci_fetch_array($user_dept_stmt, OCI_ASSOC);
            // echo $user_dept_row['DEPT_ID'];


        // Only Admin can update 
        if($user_data->data->{'role'} == 2){

            if(!isset($_POST["dept_id"]) || empty(trim($_POST["dept_id"]))){
                $dept_id_err = "Please enter a dept_id.";
                $error["dept_id"] = $dept_id_err;
                
            }
            else if(trim($_POST["dept_id"]) !== $user_dept_row['DEPT_ID']){
                $dept_id_err = "Only own department admin can updated.";
                $error["dept_id"] = $dept_id_err;
            }
            else {
                $dept_id = trim($_POST["dept_id"]);

            }

            /* Publish Validation */ /* Accepts -1 for unpublish and 1 for publish */
            if(!isset($_POST["published"]) || empty(trim($_POST["published"]))){
                $published_err = "Please enter published.";
                $error["published"] = $published_err;
                
            }
            else if((trim($_POST["published"]) != -1) && (trim($_POST["published"])) != 1){
                $published_err = "Boolean 1/-1";
                $error["published"] = $published_err;

                
            }
            else {
                $published = trim($_POST["published"]);

            }

            if(empty($dept_id_err) && empty($published_err)){
                $update_publish_q = "UPDATE DEPARTMENT SET result_published = 0 WHERE dept_id=".$dept_id;
                $message = "Result unpublished";
                if($published == 1){
                    $update_publish_q = "UPDATE DEPARTMENT SET result_published = 1 WHERE dept_id=".$dept_id;
                    $message = "Result published";
                }

                $update_publish_stmt = oci_parse($link, $update_publish_q);
                if(oci_execute($update_publish_stmt)){
                    http_response_code(200);
                    echo json_encode([
                        'status' => 1,
                        'message' => $message
                    ]);
                }
                else{
                    http_response_code(400);
                    echo json_encode([
                        'status' => 0,
                        'message' => "Failed"
                    ]);

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
                'message' => "Only admins have permission.",
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