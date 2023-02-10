<?php

// Include config file
require_once "config.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    
// Define variables and initialize with empty values
$name = $phone = $email = $password = $confirm_password = $student_type = "";
$name_err = $phone_err = $email_err = $password_err = $confirm_password_err = $student_type_err = "";
$error = array();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Validation

    // Validate username not null
    if(!isset($_POST["name"]) || empty(trim($_POST["name"]))){
        $name_err = "Please enter a name.";
        $error["name"] = $name_err;
    } else {
        $name = trim($_POST["name"]);
    }


    // Validate email not null
    if (!isset($_POST["email"]) || empty(trim($_POST["email"]))) {
        $email_err = "Please enter your email.";
        $error["email"] = $email_err;
    } else {

        // Unique Email check
        $sql = "SELECT U_ID FROM SYS.USERS WHERE U_MAIL = '".$_POST["email"]."'";
        $stmt = oci_parse($link, $sql);
        if(oci_execute($stmt)){
            $row = oci_fetch_array($stmt, OCI_ASSOC);

            if($row){
                $email_err = "Email already registered";
                $error["email"] = $email_err;
            }
            else{
                $email = trim($_POST["email"]);
            }
        }
        else{
            $email_err = "Could not connect to server. Please try again later.";
            $error["email"] = $email_err;
        } 
    }

    // phone not null 
    if (!isset($_POST["phone"]) || empty(trim($_POST["phone"]))) {
        $phone_err = "Please enter your phone.";
        $error["phone"] = $phone_err;
    } else {
        $phone = trim($_POST["phone"]);
    }
    
    // Validate password
    if(!isset($_POST["password"]) || empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";  
        $error["password"] = $password_err;   
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
        $error["password"] = $password_err;   
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate confirm password
    if(!isset($_POST["confirm_password"]) || empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
        $error["Confirm Password"] = $confirm_password_err;   
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
            $error["Confirm Password"] = $confirm_password_err;
        }
    }

    // Validate Student Type
    if (!isset($_POST["student_type"]) || empty(trim($_POST["student_type"]))) {
        $student_type_err = "Please enter student type.";
        $error["student_type"] = $student_type_err;
    } else {
        if($_POST["student_type"] == "national" || $_POST["student_type"] == "international" ){
           $student_type = trim($_POST["student_type"]);
        }
        else {
            $student_type_err = "Please enter valid student type.";
            $error["student_type"] = $student_type_err;
        }
    }
    
    // Check input errors before inserting in database
    if(empty($email_err) && empty($password_err) && empty($confirm_password_err) && empty($phone_err) && empty($name_err)){
        
        // Prepare an insert statement
        // $query = 'INSERT INTO users (u_mail, u_phone, username, password, role_id) VALUES :db_u_mail, :db_u_phone, :db_username, :db_password, :db_role_id';
        
        $hased_password = password_hash($password, PASSWORD_DEFAULT);
        $student_role_id = 3;

        $query = "INSERT INTO SYS.USERS (u_mail, u_phone, u_name, u_password, role_id, student_nation) VALUES ( '" . $email . "', '" . $phone . "', '" . $name . "', '" . $hased_password . "', " . $student_role_id .", '".$student_type."' )";
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
                // Send Veirification Code
                $sql = "SELECT U_ID FROM SYS.USERS WHERE U_MAIL = '".$email."'";
                $stmt = oci_parse($link, $sql);
                $u_id = 1;
                // Getting user id
                if(oci_execute($stmt)){
                    $row = oci_fetch_array($stmt, OCI_ASSOC);
                    $u_id = $row["U_ID"];
                }


                $current_timestamp = time();
                $future_timestamp = $current_timestamp + (60 * 5);
                $oracle_timestamp = "FROM_TZ(TO_TIMESTAMP('1970-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS') + NUMTODSINTERVAL(" . $future_timestamp . ", 'SECOND'), 'UTC')";
                $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

                
                $query = "INSERT INTO SYS.VerificationCode (otp_for_user, otp_code, expire_at) VALUES ( ".$u_id.", ".$code.", ". $oracle_timestamp. ")";
                $s = oci_parse($link, $query);
                $r = oci_execute($s);
                
                http_response_code(200);
                echo json_encode(array("status"=>"Succesful"));
            }
        }

        // Close connection
        oci_close($link);
    }

    // Validation Failed
    else {
        http_response_code(400);
        echo json_encode($error);
    }
}

?>