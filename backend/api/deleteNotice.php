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


if($_SERVER["REQUEST_METHOD"] == "POST"){
    $error = array();
    $id = "";
    $id_err  = "";


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

        // Only Admin can delete 
        if($user_data->data->{'role'} == 2){

            if(!isset($_POST["id"]) || empty(trim($_POST["id"]))){
                $id_err = "Please enter a id.";
                $error["id"] = $id_err;
            } else {
                $id = trim($_POST["id"]);
            }

            if(empty($id_err)){
                $query = "DELETE FROM NOTICE WHERE NOTICE_ID = ".$id;
                //echo $query;
                $s = oci_parse($link, $query);

                $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
                if (!$r) {    
                    $e = oci_error($s);
                    oci_rollback($link);  // rollback changes
                    trigger_error(htmlentities($e['message']), E_USER_ERROR);
                }
                else{
                    // Commit the changes 
                    $r = oci_commit($link);
                    if (!$r) {
                        $e = oci_error($link);
                        trigger_error(htmlentities($e['message']), E_USER_ERROR);
                    }
                    else{
                        // DONE 
                        http_response_code(200);
                        echo json_encode([
                            'status' => 1,
                            'message' => "Deleted",
                        ]);
                    }
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
                'message' => "Not enogh permissions.",
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


else {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}

?>