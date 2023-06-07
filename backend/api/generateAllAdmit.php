<?php
require_once('tcpdf/tcpdf.php');
require_once('phpqrcode/qrlib.php');

require_once "config.php";
require_once "file.php";
require_once "./admitCardForAll.php";

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
        

        $u_id_arr = array();
        $verified_user_query = "SELECT * FROM APPLICATION WHERE app_verified=1";
        $verified_user_stmt = oci_parse($link, $verified_user_query);
        if (oci_execute($verified_user_stmt)) {
            while($applicant_row = oci_fetch_array($verified_user_stmt, OCI_ASSOC)){
                array_push($u_id_arr, $applicant_row['U_ID']);
            }
            
        }

        

        $itemsPerPage = 10;
        foreach($u_id_arr as $u_id){

            /* Admit Card Code --------------------- */
            // 0. Check if application exists for the corresponding user
            $app_exists = $appId = 0;
            $check_verified_app_query = "SELECT * FROM application WHERE u_id=".$u_id."AND app_verified=1";
            $check_verified_app_stmt = oci_parse($link, $check_verified_app_query);
            if(oci_execute($check_verified_app_stmt)){
                while($check_verified_app_row = oci_fetch_array($check_verified_app_stmt, OCI_ASSOC)){
                    $app_exists += 1;
                    $appId = $check_verified_app_row['APP_ID'];
                }
            }
           
            // 1. Check if a record exits in ApplicantAdmit
            $admit_exists = 0;
            $check_admit_query = "SELECT COUNT(*) AS admit_count FROM ApplicantAdmit WHERE u_id = " . $u_id;
            $check_admit_stmt = oci_parse($link, $check_admit_query);

            if (oci_execute($check_admit_stmt)) {
                $check_admit_row = oci_fetch_array($check_admit_stmt, OCI_ASSOC);
                $admit_exists = $check_admit_row['ADMIT_COUNT'];
            }

            // 1.1 Admit does not exist
            if($admit_exists == 0){

                $roll = $seat = 0; $admit = '';

                // 1.1.1 Assign a roll
                $total_admit_count = 0;
                $total_admit_query = "SELECT COUNT(*) AS admit_count FROM ApplicantAdmit";
                $total_admit_stmt = oci_parse($link, $total_admit_query);

                if (oci_execute($total_admit_stmt)) {
                    $total_admit_row = oci_fetch_array($total_admit_stmt, OCI_ASSOC);
                    $total_admit_count = $total_admit_row['ADMIT_COUNT'];
                }

                // No previous admit
                if($total_admit_count == 0){
                    $roll = 70001;
                }
                else{
                    $latest_roll_query = "SELECT * FROM ApplicantAdmit ORDER BY roll DESC FETCH FIRST 1 ROWS ONLY";
                    $latest_roll_stmt = oci_parse($link, $latest_roll_query);
                    if(oci_execute($latest_roll_stmt)){
                        $latest_roll_row = oci_fetch_array($latest_roll_stmt, OCI_ASSOC);
                        $roll = $latest_roll_row['ROLL'] + 1;
                    }
                }

                // 1.1.2 Assign a seat
                $room_id = $room_center = $room_title =  $room_filled = 0;

                $available_room_query = "SELECT * FROM SeatRoom WHERE room_capacity > room_filled ORDER BY room_id FETCH FIRST 1 ROWS ONLY";
                $available_room_stmt = oci_parse($link, $available_room_query);
                if(oci_execute($available_room_stmt)){
                    $available_room_row =  oci_fetch_array($available_room_stmt, OCI_ASSOC);

                    if($available_room_row){
                        $room_id = $available_room_row["ROOM_ID"];
                        $room_center = $available_room_row["ROOM_CENTER"];
                        $room_title = $available_room_row["ROOM_TITLE"];
                        $room_filled = $available_room_row["ROOM_FILLED"];
                    }
                }

                // 1.1.3 Generate the admit, save it ! Due
                $admitURL = '404.pdf';
                $profile_query = "SELECT * FROM Profile WHERE U_ID=".$u_id;
                $profile_stmt = oci_parse($link, $profile_query);
                if(oci_execute($profile_stmt)){
                    $profile_row =  oci_fetch_array($profile_stmt, OCI_ASSOC);
                    if($profile_row){

                        $name = $profile_row['A_NAME'];
                        $imgUrl = $profile_row['A_PICPATH'];
                        $imgUrl = str_replace(' ', '%20', $imgUrl);

                        $signatureUrl = $profile_row['A_SIGPATH'];
                        $signatureUrl = str_replace(' ', '%20', $signatureUrl);

                        $father = $profile_row['F_NAME'];
                        $mother = $profile_row['M_NAME'];
                        
                        $appId = 50000 + $appId; // Starts with '5'
                        $seat_center = 'Dept. of Computer Science & Engineering';
                        $seat_room = $room_title;

                        $admitURL = generateAdmitCard($_SERVER ,$name, $imgUrl, $signatureUrl, $roll, $u_id, $appId, $father, $mother, $seat_center,  $seat_room);

                    }
                }

                
                
                // 1.1.4 Save record to ApplicantAdmit
                $save_admit_query = "INSERT INTO ApplicantAdmit (U_ID, ROLL, SEAT_ROOM, ADMIT_CARD) VALUES (".$u_id.", ".$roll.", ".$room_id.", '".$admitURL."')";
                $save_admit_stmt = oci_parse($link, $save_admit_query);
                if(oci_execute($save_admit_stmt)){
                    // increase the room_filled by one
                    $fill_room_query = "UPDATE SeatRoom SET SeatRoom.room_filled=".($room_filled + 1)."WHERE SeatRoom.room_id =".$room_id;
                            
                    $fill_room_stmt = oci_parse($link, $fill_room_query);
                    oci_execute($fill_room_stmt);
                    
                }
                
                echo json_encode([
                    'admit' => $admitURL,
                ]);

            }

            // 1.2 Admit exists
            else{

                // 1.2.1 Get and redirect to admit
                $get_admit_query = "SELECT * FROM ApplicantAdmit WHERE U_ID=".$u_id;
                $get_admit_stmt = oci_parse($link, $get_admit_query);
                if(oci_execute($get_admit_stmt)){
                    $admit_row = oci_fetch_array($get_admit_stmt, OCI_ASSOC);
                    if($admit_row){
                        $admit_url = $admit_row['ADMIT_CARD'];
                        
                        echo json_encode([
                            'admit' => $admit_url,
                        ]);
                    }
                }
            }
            /* --------------------- Admit Card Code */

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