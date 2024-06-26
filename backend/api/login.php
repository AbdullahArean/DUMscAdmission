<?php
// Include config file
require_once "config.php";
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: authorization");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
}


use Firebase\JWT\JWT;

require_once "jwt/JWT.php";
$JWT = new JWT;
 
// Define variables and initialize with empty values
$email = $phone = $password = "";
$email_err = $phone_err = $password_err = $login_err = "";
$error = array();


$method = "NONE";

if(isset($_SERVER["REQUEST_METHOD"])){
    $method = $_SERVER["REQUEST_METHOD"];
}

elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
    $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
}


// Processing form data when form is submitted
if($method == "POST"){
 
    // Check if email is empty
    if(!isset($_POST["email"]) || empty(trim($_POST["email"]))){
        $email_err = "Please enter email.";
        $error["email"] = $email_err;
    } else{
        $email = trim($_POST["email"]);
    }
    
    // Check if password is empty
    if(!isset($_POST["password"]) || empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
        $error["password"] = $password_err;
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($email_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT U_ID, U_MAIL, U_PASSWORD, ROLE_ID FROM SYS.USERS WHERE U_MAIL = '".$_POST["email"]."'";
        
        // Parse the statement
        $stmt = oci_parse($link, $sql);
        
        // Attempt to execute the prepared statement
        if(oci_execute($stmt)){
            
          // Fetch the result
            $row = oci_fetch_array($stmt, OCI_ASSOC);
            
            // Check if email exists, if yes then verify password
            if($row){                    
                // Bind result variables
                $id = $row["U_ID"];
                $email = $row["U_MAIL"];
                $hashed_password = $row["U_PASSWORD"];
                $role_id = $row["ROLE_ID"];
                
                if(password_verify($password, $hashed_password)){
                    // Password is correct, so generate a token
                    // session_start();

                    // echo "HERE";
                    
                    // TOKEN
                    $payload = [
                        'iss' => "localhost",
                        'aud' => 'localhost',
                        'exp' => time() + 4320000,
                        'data' => [
                            'id' => $id,
                            'email' => $email,
                            'role' => $role_id
                        ],
                    ];
                    $secret_key = "shhhhhhhhhh";
                    $jwt = JWT::encode($payload, $secret_key, 'HS256');
                    echo json_encode([
                        'status' => 1,
                        'jwt' => $jwt,
                        'message' => 'Login Successfully',
                    ]);

                } else{
                    // Password is not valid, display a generic error message
                    $login_err = "Invalid phone or password.";
                    $error["login"] = $login_err;
                }
            } else{
                // phone doesn't exist, display a generic error message
                $login_err = "Invalid phone or password.";
                $error["login"] = $login_err;
                http_response_code(400);
            }
        } else{
            http_response_code(400);
            echo json_encode( $error);
        }
    }

     // Validation Failed
     else {
        http_response_code(400);
        echo json_encode($error);
    }

}
    
    // Close connection
    oci_close($link);
?>