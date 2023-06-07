<?php

exit();

// require_once('tcpdf/tcpdf.php');

// require_once "config.php";
// require_once "file.php";

// if (isset($_SERVER['HTTP_ORIGIN'])) {
//     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//     header('Access-Control-Allow-Credentials: true');
//     header('Access-Control-Max-Age: 86400');    // cache for 1 day
//     header("Access-Control-Allow-Headers: *");
            
//     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
//             header("Access-Control-Allow-Methods: *");
// }

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

// require_once "jwt/JWT.php";
// require_once "jwt/Key.php";
// $JWT = new JWT;

// $method = "NONE";

// if(isset($_SERVER["REQUEST_METHOD"])){
//     $method = $_SERVER["REQUEST_METHOD"];
// }

// elseif(isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"])){
//     $method = $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_METHOD"];
// }

// if($method == "GET"){

//     try{
//         /* Algorithm ---------------

//         0. Find unique seat_room from admit, 
//         1. iterate over the admit in that room to get the user id
//         2. Iterate and Find roll, app_id, name, img_url
//         3. Iterate and generate

//            Algorithm --------------- */

//         /* initilize Pages ----------------------------------- */
//         /* FILE-NAME */
//         $seat_file_name =  'seat-' . time() . '.pdf';
//         $seat_file_path = getcwd().DIRECTORY_SEPARATOR."seat".DIRECTORY_SEPARATOR . $seat_file_name;

//         $attndnc_file_name =  'attendance-' . time() . '.pdf';
//         $attndnc_file_path = getcwd().DIRECTORY_SEPARATOR."seat".DIRECTORY_SEPARATOR . $attndnc_file_name;

//         $seat_pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
//         $attndnc_pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

//         // Set document information
//         $seat_pdf->SetCreator('msadmission.cse.du.ac.bd');
//         $seat_pdf->SetAuthor('msadmission.cse.du.ac.bd');
//         $seat_pdf->SetTitle('Seat Card');
//         $seat_pdf->SetSubject('Seat Card');

//         $attndnc_pdf->SetCreator('msadmission.cse.du.ac.bd');
//         $attndnc_pdf->SetAuthor('msadmission.cse.du.ac.bd');
//         $attndnc_pdf->SetTitle('Attendance Sheet');
//         $attndnc_pdf->SetSubject('Attendance Sheet');

//         // Set default header data
//         $seat_pdf->SetHeaderData('', 0, '', '', array(0, 0, 0), array(255, 255, 255));
//         $attndnc_pdf->SetHeaderData('', 0, '', '', array(0, 0, 0), array(255, 255, 255));

//         // Set header and footer fonts
//         $seat_pdf->setHeaderFont(Array('helvetica', '', 10));
//         $seat_pdf->setFooterFont(Array('helvetica', '', 8));
//         $attndnc_pdf->setHeaderFont(Array('helvetica', '', 10));
//         $attndnc_pdf->setFooterFont(Array('helvetica', '', 8));

//         // Set default monospaced font
//         $seat_pdf->SetDefaultMonospacedFont('courier');
//         $attndnc_pdf->SetDefaultMonospacedFont('courier');


//         // Set margins
//         $seat_pdf->SetMargins(15, 15, 15);
//         $seat_pdf->SetHeaderMargin(5);
//         $seat_pdf->SetFooterMargin(10);

//         $attndnc_pdf->SetMargins(15, 15, 15);
//         $attndnc_pdf->SetHeaderMargin(5);
//         $attndnc_pdf->SetFooterMargin(10);

//         // Set auto page breaks
//         $seat_pdf->SetAutoPageBreak(true, 15);
//         $attndnc_pdf->SetAutoPageBreak(true, 15);

//         // Set font
//         $seat_pdf->SetFont('helvetica', '', 12);
//         $attndnc_pdf->SetFont('helvetica', '', 12);
    
//         /* ------------------------------------ initialize pages */


//         /* Finding Seat Rooms */

//         $seat_room_ids = array();
//         $distinct_seat_room_q = "SELECT DISTINCT seat_room FROM ApplicantAdmit";
//         $distinct_seat_room_stmt = oci_parse($link, $distinct_seat_room_q);
//         if(oci_execute($distinct_seat_room_stmt)){
//             while($seat_room_row = oci_fetch_array($distinct_seat_room_stmt,OCI_ASSOC)){
//                 array_push($seat_room_ids, $seat_room_row['SEAT_ROOM']);
//             }
//         }

//         foreach($seat_room_ids as $seat_room_id){
//             $room_title = "";
//             // Find seat room title
//             $room_info_q = "SELECT * FROM SeatRoom WHERE ROOM_ID=".$seat_room_id;
//             $room_info_stmt = oci_parse($link, $room_info_q);
//             oci_execute($room_info_stmt);
//             $room_info_row = oci_fetch_array($room_info_stmt, OCI_ASSOC);
//             $room_title = $room_info_row['ROOM_TITLE'];

//             $u_id_arr = array();
//             // $verified_user_query = "SELECT * FROM APPLICATION WHERE app_verified=1";
//             $verified_user_query = "SELECT * FROM ApplicantAdmit WHERE seat_room=".$seat_room_id." ORDER BY ROLL";
//             $verified_user_stmt = oci_parse($link, $verified_user_query);
//             if (oci_execute($verified_user_stmt)) {
//                 while($applicant_row = oci_fetch_array($verified_user_stmt, OCI_ASSOC)){
//                     array_push($u_id_arr, $applicant_row['U_ID']);
//                 }
                
//             }

//             // Set the number of items to print per line
//             $itemsPerPage = 10;

//             // Get the total number of items in the array
//             $totalItems = count($u_id_arr);
//             // $totalItems = 3; /* --- TEST --- */
//             // Initialize a counter variable
//             $count = 0;

//             // Using outer loop to handle line breaks
//             for ($i = 0; $i < ceil($totalItems/$itemsPerPage); $i++) {
//                 // Using inner loop to print items

//                 /* New Page ------ */
//                 $seat_pdf->AddPage();
//                 // Header image
//                 $seat_pdf->Image("https://msadmission.cse.du.ac.bd/static/media/header.a176129cff71e993f5f9.png", 30, 20, 160 , 30, '', '', '', false, 300, '', false, false, 0, true, false, true);
//                 // Bring the cell down
//                 $seat_pdf->Ln(20);

//                 // Set font
//                 $seat_pdf->SetFont('helvetica', '', 18);

//                 // Output roll
//                 $seat_pdf->Cell(0, 10, 'MSc Admission Seat Card (Room: '.$room_title.' )', 0, 1, 'C');

//                 // Set font
//                 $seat_pdf->SetFont('helvetica', '', 12);
                
//                 /* Attendance Page */
//                 $attndnc_pdf->AddPage();
//                 // Header image
//                 $attndnc_pdf->Image("https://msadmission.cse.du.ac.bd/static/media/header.a176129cff71e993f5f9.png", 30, 20, 160 , 30, '', '', '', false, 300, '', false, false, 0, true, false, true);
//                 // Bring the cell down
//                 $attndnc_pdf->Ln(20);

//                 // Set font
//                 $attndnc_pdf->SetFont('helvetica', '', 18);

//                 // Output roll
//                 $attndnc_pdf->Cell(0, 10, 'MSc Admission Attendance Sheet (Room: '.$room_title.' )', 0, 1, 'C');

//                 // Set font
//                 $attndnc_pdf->SetFont('helvetica', '', 12);

//                 $x = $y = 0;


//                 for ($j = 0; $j < $itemsPerPage; $j++) {

                    
//                     // Get the current item index
//                     $index = $i * $itemsPerPage + $j;

//                     // Check if the current index is valid
//                     if ($index < $totalItems) {
//                         $u_id = $u_id_arr[$index];
//                         /* Get information */

//                         $roll = $name = $img_url = $app_id = '';

//                         $roll_query = "SELECT * FROM ApplicantAdmit WHERE U_ID=".$u_id;
//                         $roll_stmt = oci_parse($link, $roll_query);
//                         oci_execute($roll_stmt);
//                         $roll_row = oci_fetch_array($roll_stmt, OCI_ASSOC);
//                         $roll = $roll_row['ROLL'];


//                         $profile_query = "SELECT * FROM PROFILE WHERE U_ID=".$u_id;
//                         $profile_stmt = oci_parse($link, $profile_query);
//                         oci_execute($profile_stmt);
//                         $profile_row = oci_fetch_array($profile_stmt, OCI_ASSOC);
//                         $name = $profile_row['A_NAME'];
//                         $img_url = $profile_row['A_PICPATH'];

//                         $app_query = "SELECT * FROM APPLICATION WHERE U_ID=".$u_id;
//                         $app_stmt = oci_parse($link, $app_query);
//                         oci_execute($app_stmt);
//                         $app_row = oci_fetch_array($app_stmt, OCI_ASSOC);
//                         $app_id = $app_row['APP_ID'];
//                         $app_id += 50000;

                        
//                         // Calibrate X
//                         if($j < $itemsPerPage/2){
//                             $x = 20;
//                             // echo 'LEFT - '.$roll.' - '.$name.' - '.$app_id.' - '.$img_url.'</br>';
//                         }
//                         else{
//                             $x = 110;
//                             // echo 'RIGHT - '.$roll.' - '.$name.' - '.$app_id.' - '.$img_url.'</br>';
//                         }

//                         // Calibrate Y
//                         if($j  == 0 || $j == 5){
//                             $y = 50;
//                         }
//                         else{
//                             $y += 45;
//                         }

//                         $rect_width = 80;   // Width of the rectangle
//                         $rect_height = 40;   // Height of the rectangle
//                         $rect_borderStyle = 'D';   // Border style (solid line)

//                         /* Seat */
//                         // Draw the rectangle
//                         $seat_pdf->Rect($x, $y, $rect_width, $rect_height, $rect_borderStyle);

//                         /* seat content */
//                         // image
//                         $seat_pdf->Image($img_url, $x+5, $y+5, 25, 25, '', '', '', false, 300, '', false, false, 0, false, false, false);
                        
//                         //serial
//                         $seat_pdf->SetXY($x+12, $y+30);
//                         $seat_pdf->Cell(0, 10, $app_id, 0, 1);

//                         // title
//                         $seat_pdf->SetXY($x+36, $y+5);
//                         $seat_pdf->Cell(0, 10, "University of Dhaka", 0, 1);

//                         $seat_pdf->SetXY($x+31, $y+13);
//                         $seat_pdf->Cell(0, 10, "MSc Admission, CSEDU", 0, 1);

//                         // roll
//                         // Set font
//                         $seat_pdf->SetFont('helvetica', '', 18);
                        
//                         $seat_pdf->SetXY($x+36, $y+22);
//                         $seat_pdf->Cell(0, 10, "Roll: ".$roll, 0, 1);

//                         // Set font
//                         $seat_pdf->SetFont('helvetica', '', 12);

//                         /* Attendance */
//                         // Draw the rectangle
//                         $attndnc_pdf->Rect($x, $y, $rect_width, $rect_height, $rect_borderStyle);

//                         /* seat content */
//                         // image
//                         $attndnc_pdf->Image($img_url, $x+5, $y+5, 25, 25, '', '', '', false, 300, '', false, false, 0, false, false, false);
                        
//                         //serial
//                         $attndnc_pdf->SetXY($x+12, $y+30);
//                         $attndnc_pdf->Cell(0, 10, $app_id, 0, 1);

                        

//                         // roll
//                         // Set font
//                         $attndnc_pdf->SetFont('helvetica', '', 18);
                        
//                         $attndnc_pdf->SetXY($x+36, $y+5);
//                         $attndnc_pdf->Cell(0, 10, "Roll: ".$roll, 0, 1);

//                         // Set font
//                         $attndnc_pdf->SetFont('helvetica', '', 12);

//                         // Name
//                         $attndnc_pdf->SetFont('helvetica', '', 7);
//                         $attndnc_pdf->SetXY($x+36, $y+13);
//                         $attndnc_pdf->Cell(0, 10, $name, 0, 1);
//                         $attndnc_pdf->SetFont('helvetica', '', 12);

//                         // Signature Box
//                         $attndnc_pdf->Rect($x+36, $y+22, 40, 12, $rect_borderStyle);

//                         // Signature text
//                         // Set font
//                         $attndnc_pdf->SetFont('helvetica', '', 4);
                        
//                         $attndnc_pdf->SetXY($x+66, $y+18);
//                         $attndnc_pdf->Cell(0, 10, "Signature", 0, 1);

//                         // Set font
//                         $attndnc_pdf->SetFont('helvetica', '', 12);
        

//                     }
//                 }
//             }


//         }

        

//         // Save the seat_pdf with a unique name
//         $seat_pdf->Output($seat_file_path, 'F');
//         echo $seat_file_path;

//         echo '<br/>';

//         // Save the attndnc_pdf with a unique name
//         $attndnc_pdf->Output($attndnc_file_path, 'F');
//         echo $attndnc_file_path;

//     }
//     catch(Exception $e){
//         http_response_code(400);
//         echo json_encode([
//             'status' => 0,
//             'message' => $e->getMessage(),
//         ]);
//     }
// }



?>