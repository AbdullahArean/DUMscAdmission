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
    $title = $body = $file = "";
    $title_err = $body_err = "";


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

        // Only Admin can create 
        if($user_data->data->{'role'} == 2){

            if(!isset($_POST["title"]) || empty(trim($_POST["title"]))){
                $title_err = "Please enter a title.";
                $error["title"] = $title_err;
            } else {
                $title = trim($_POST["title"]);
            }

            if(!isset($_POST["body"]) || empty(trim($_POST["body"]))){
                $body_err = "Please enter a body.";
                $error["body"] = $body_err;
            } else {
                $body = trim($_POST["body"]);
            }

            if(isset($_POST["file"]) && !empty(trim($_POST["file"]))){
                $file = trim($_POST["file"]);
            } 

            if(empty($title_err) && empty($body_err)){
                $query = "INSERT INTO SYS.Notice (NOTICE_TITLE, NOTICE_BODY, NOTICE_FILE_PATH, CREATED_BY) VALUES ('".$title."', '".$body."', '".$file."', ".$data->{'id'}.")";
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
                            'message' => "Successful",
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


else if($_SERVER["REQUEST_METHOD"] == "GET"){

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


        $query = "SELECT NOTICE_ID, NOTICE_TITLE, NOTICE_BODY, NOTICE_FILE_PATH, CREATED_BY FROM Notice";
        $stmt = oci_parse($link, $query);

        if(oci_execute($stmt)){
            $response = array();

            while($row = oci_fetch_array($stmt, OCI_ASSOC)){
                $notice = array();
                $notice["id"] = $row["NOTICE_ID"];
                $notice["title"] = $row["NOTICE_TITLE"];
                $notice["body"] = $row["NOTICE_BODY"];
                if(isset($row["NOTICE_FILE_PATH"])) $notice["file"] = $row["NOTICE_FILE_PATH"];
                $notice["created_by"] = $row["CREATED_BY"];
                
                array_push($response, $notice);
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