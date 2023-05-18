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

            // Student
            if($user_data->data->{'role'} == 3){

                $app_id = 4;
                $query = "SELECT * FROM Application NATURAL JOIN DEPARTMENT WHERE Application.U_ID = ".$data->{'id'}." AND Application.U_ID = ".$data->{'id'}." ";

                $stmt = oci_parse($link, $query);
    
                    if(oci_execute($stmt)){
                        $response = array();
            
                        while($row = oci_fetch_array($stmt, OCI_ASSOC)){
                            $application = array();
                            $application["APP_ID"] = $row["APP_ID"];
                            $application["DEPT_ID"] = $row["DEPT_ID"];
                            // $application["DEPT_NAME"] = $row["DEPT_NAME"];
                            $application["U_ID"] = $row["U_ID"];
                            $application["APP_VERIFIED"] = $row["APP_VERIFIED"];
                            $application["APP_ADMIT"] = $row["APP_ADMIT"];
                            $application["APP_PAYMENT"] = $row["APP_PAYMENT"];
                            $application["CREATED_ON"] = $row["CREATED_ON"];

                            // Edit Access
                            $application["EDIT_ACCESS"] = false;

                            // Get Edit Permission
                            $edit_perm_query  = "SELECT edit_permission FROM AdditionalProfileInfo WHERE u_id = ".$row["U_ID"];
                            // echo($edit_perm_query);
                            $edit_perm_stmt = oci_parse($link, $edit_perm_query);
                            if(oci_execute($edit_perm_stmt)){
                                while($edit_perm_row = oci_fetch_array($edit_perm_stmt, OCI_ASSOC)){

                                    if($edit_perm_row["EDIT_PERMISSION"] == "1")
                                        $application["EDIT_ACCESS"] = true;
                                    else $application["EDIT_ACCESS"] = false;
                                }
                            }

                            
                            array_push($response, $application);
                        }
            
                        echo json_encode(
                            $response
                        );
                    }
            }
            // Admin
            else if($user_data->data->{'role'} == 2) {
                
                
                // Getting Profile from app_id
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    $query = "SELECT p.* FROM Profile p INNER JOIN Application a ON p.u_id = a.u_id WHERE a.app_id = ".$id;

                    $stmt = oci_parse($link, $query);

                    if(oci_execute($stmt)){
                        $row = oci_fetch_array($stmt, OCI_ASSOC);
                        if($row){
                            echo json_encode([
                                'status' => 1,
                                'message' => $row,
                            ]);
                        }
                    }
                }
                
                // Filtration
                else{
                    $query = "SELECT * FROM Application";

                    if (isset($_GET['verified'])) {
                        $verified = $_GET['verified'];

                        if($verified ==  1) $query .= " WHERE APP_VERIFIED = 1";
                        else if($verified ==  0) $query .= " WHERE APP_VERIFIED = 0";
                    }

                    if (isset($_GET['payment'])) {
                        $payment = $_GET['payment'];

                        if($payment ==  1) {
                            if (strpos($query, 'WHERE') === false) {
                                $query .= " WHERE APP_PAYMENT = 1";
                            } else {
                                $query .= " AND APP_PAYMENT = 1";
                            }
                        }
                        else if($payment ==  0) {
                            if (strpos($query, 'WHERE') === false) {
                                $query .= " WHERE APP_PAYMENT = 0";
                            } else {
                                $query .= " AND APP_PAYMENT = 0";
                            }
                        }
                    }

                    $query .= " ORDER BY app_id DESC";

                    $stmt = oci_parse($link, $query);
    
                    if(oci_execute($stmt)){
                        $response = array();
            
                        while($row = oci_fetch_array($stmt, OCI_ASSOC)){

                            $application = array();
                            $application["APP_ID"] = $row["APP_ID"];
                            $application["DEPT_ID"] = $row["DEPT_ID"];
                            // $application["DEPT_NAME"] = $row["DEPT_NAME"];
                            $application["U_ID"] = $row["U_ID"];
                            $application["APP_VERIFIED"] = $row["APP_VERIFIED"];
                            $application["APP_ADMIT"] = $row["APP_ADMIT"];
                            $application["APP_PAYMENT"] = $row["APP_PAYMENT"];
                            $application["CREATED_ON"] = $row["CREATED_ON"];

                            // Edit Access
                            $application["EDIT_ACCESS"] = false;

                            // Get Edit Permission
                            $edit_perm_query  = "SELECT edit_permission FROM AdditionalProfileInfo WHERE u_id = ".$row["U_ID"];
                            // echo($edit_perm_query);
                            $edit_perm_stmt = oci_parse($link, $edit_perm_query);
                            if(oci_execute($edit_perm_stmt)){
                                while($edit_perm_row = oci_fetch_array($edit_perm_stmt, OCI_ASSOC)){

                                    if($edit_perm_row["EDIT_PERMISSION"] == "1")
                                        $application["EDIT_ACCESS"] = true;
                                    else $application["EDIT_ACCESS"] = false;
                                }
                            }

                            array_push($response, $application);
                        }
            
                        echo json_encode(
                            $response
                        );
                    }
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

else if ($method == "POST"){
    $error = array();
    $dept_id  = "";
    $dept_id_err = "";
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
        

        // Only Students can create 
        if($user_data->data->{'role'} == 3){

            if(!isset($_POST["dept_id"]) || empty(trim($_POST["dept_id"]))){
                $dept_id_err = "Please enter a dept_id.";
                $error["dept_id"] = $dept_id_err;
                
            } else {
                $dept_id = trim($_POST["dept_id"]);
            }

            $query = "SELECT * FROM APPLICATION WHERE DEPT_ID = ".$dept_id." AND U_ID = ".$user_data->data->{'id'};
            $stmt = oci_parse($link, $query);
            if(oci_execute($stmt)){
                $row = oci_fetch_array($stmt, OCI_ASSOC);
            }

            

            if(empty($dept_id_err)){

                if(oci_execute($stmt)){
                    $row = oci_fetch_array($stmt, OCI_ASSOC);
                    if($row){
                        http_response_code(400);
                        echo json_encode([
                            'status' => 1,
                            'message' => "Already Applied",
                        ]);
                    }
                    else{
                
                        $query = "INSERT INTO SYS.Application (DEPT_ID, U_ID) VALUES (".$dept_id.", ".$user_data->data->{'id'}.")";
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
                }
                else {
                    http_response_code(400);
                    echo json_encode($error);
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
                'message' => "Only students can apply.",
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
?>