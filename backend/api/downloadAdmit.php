<?php
// Include config file
require_once "config.php";
require_once "file.php";
require_once "./admitCard.php";

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


if ($method == "GET"){

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


        $u_id = $user_data->data->{'id'};

        /* Algorithm ----------------------- 

        0. Check if application corresponding to the user exists and is verified

        1. Check if a record exits in ApplicantAdmit (which holds roll, seat, admit) for that user
            
        >   1.1 If record does not exist
                1.1.1 Assign a roll incremental
                1.1.2 Assign a seat (find available capacity from SeatRoom table)
                1.1.3 Generate the admit, save it
                1.1.4 Create a new record of ApplicantAdmit with the information

        >   1.2 If record exists redirect to admit location

         ----------------------- Algorithm */

         // Only for student
        if($user_data->data->{'role'} == 3){

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

            if($app_exists){ /* Step 0 success - Verified Application found */

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

                            // increase the room_filled by one
                            $fill_room_query = "UPDATE SeatRoom SET seatroom.room_filled=".($room_filled + 1)."WHERE seatroom.room_id =".$room_id;
                            
                            $fill_room_stmt = oci_parse($link, $fill_room_query);
                            oci_execute($fill_room_stmt);
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
                            $signatureUrl = $profile_row['A_SIGPATH'];
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
                        // echo "Admit saved";
                    }
                    
                    // 1.1.5 redirect to Admit
                    http_response_code(201);
                    echo json_encode([
                        'status' => 0,
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
                            
                            http_response_code(200);
                            echo json_encode([
                                'status' => 0,
                                'admit' => $admit_url,
                            ]);
                        }
                    }
                }

            }

            else{ /* Step 0 failed - No Verified Application */
                http_response_code(400);
                echo json_encode([
                    'status' => 0,
                    'message' => 'No verified application.',
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
