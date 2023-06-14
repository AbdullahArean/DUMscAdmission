<?php

// exit();

require_once('tcpdf/tcpdf.php');

require_once "config.php";
require_once "file.php";

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
        /* Algorithm ---------------
 
        1. iterate over the result and application the user id for the selected applicants
        2. Iterate and generate

           Algorithm --------------- */

        /* initilize Pages ----------------------------------- */
        /* FILE-NAME */
 
        $attndnc_file_name =  'selected-attendance-' . time() . '.pdf';
        $attndnc_file_path = getcwd().DIRECTORY_SEPARATOR."seat".DIRECTORY_SEPARATOR . $attndnc_file_name;

        $attndnc_pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

        $attndnc_pdf->SetCreator('msadmission.cse.du.ac.bd');
        $attndnc_pdf->SetAuthor('msadmission.cse.du.ac.bd');
        $attndnc_pdf->SetTitle('Attendance Sheet');
        $attndnc_pdf->SetSubject('Attendance Sheet');

        // Set default header data
        $attndnc_pdf->SetHeaderData('', 0, '', '', array(0, 0, 0), array(255, 255, 255));

        // Set header and footer fonts
        $attndnc_pdf->setHeaderFont(Array('helvetica', '', 10));
        $attndnc_pdf->setFooterFont(Array('helvetica', '', 8));

        // Set default monospaced font
        $attndnc_pdf->SetDefaultMonospacedFont('courier');


        // Set margins
        $attndnc_pdf->SetMargins(15, 15, 15);
        $attndnc_pdf->SetHeaderMargin(5);
        $attndnc_pdf->SetFooterMargin(10);

        // Set auto page breaks
        $attndnc_pdf->SetAutoPageBreak(true, 15);

        // Set font
        $attndnc_pdf->SetFont('helvetica', '', 12);
    
        /* ------------------------------------ initialize pages */

        $u_id_arr = array();
        $roll_arr = array();
        $app_id_arr = array();
        // $verified_user_query = "SELECT * FROM APPLICATION WHERE app_verified=1";
        $verified_user_query = "SELECT APPLICATION.U_ID ,APPLICANTRESULT.ROLL, APPLICANTRESULT.APP_ID FROM APPLICATION JOIN APPLICANTRESULT ON APPLICATION.APP_ID = APPLICANTRESULT.APP_ID WHERE APPLICANTRESULT.SELECTED = 1  ORDER BY APPLICANTRESULT.ROLL";
        $verified_user_stmt = oci_parse($link, $verified_user_query);
        if (oci_execute($verified_user_stmt)) {
            while($applicant_row = oci_fetch_array($verified_user_stmt, OCI_ASSOC)){
                array_push($u_id_arr, $applicant_row['U_ID']);
                array_push($roll_arr, $applicant_row['ROLL']);
                array_push($app_id_arr, $applicant_row['APP_ID']);
            }
            
        }

        // Set the number of items to print per line
        $itemsPerPage = 10;

        // Get the total number of items in the array
        $totalItems = count($u_id_arr);
        // $totalItems = 3; /* --- TEST --- */
        // Initialize a counter variable
        $count = 0;

        // Using outer loop to handle line breaks
        for ($i = 0; $i < ceil($totalItems/$itemsPerPage); $i++) {
            // Using inner loop to print items
            /* Attendance Page */
            $attndnc_pdf->AddPage();
            // Header image
            $attndnc_pdf->Image("https://msadmission.cse.du.ac.bd/static/media/header.a176129cff71e993f5f9.png", 30, 20, 160 , 30, '', '', '', false, 300, '', false, false, 0, true, false, true);
            // Bring the cell down
            $attndnc_pdf->Ln(20);

            // Set font
            $attndnc_pdf->SetFont('helvetica', '', 18);

            // Output roll
            $attndnc_pdf->Cell(0, 10, 'MSc Viva Attendance Sheet', 0, 1, 'C');

            // Set font
            $attndnc_pdf->SetFont('helvetica', '', 12);

            $x = $y = 0;


            for ($j = 0; $j < $itemsPerPage; $j++) {

                
                // Get the current item index
                $index = $i * $itemsPerPage + $j;

                // Check if the current index is valid
                if ($index < $totalItems) {
                    $u_id = $u_id_arr[$index];
                    /* Get information */

                    $name = $img_url = '';

                    $roll = $roll_arr[$index];
                    $app_id = $app_id_arr[$index];  $app_id += 50000;


                    $profile_query = "SELECT * FROM PROFILE WHERE U_ID=".$u_id;
                    $profile_stmt = oci_parse($link, $profile_query);
                    oci_execute($profile_stmt);
                    $profile_row = oci_fetch_array($profile_stmt, OCI_ASSOC);
                    
                    $name = $profile_row['A_NAME'];
                    $img_url = str_replace(' ', '%20', $profile_row['A_PICPATH']);
                    echo $img_url.'</br>' ;

                    // Calibrate X
                    if($j < $itemsPerPage/2){
                        $x = 20;
                        // echo 'LEFT - '.$roll.' - '.$name.' - '.$app_id.' - '.$img_url.'</br>';
                    }
                    else{
                        $x = 110;
                        // echo 'RIGHT - '.$roll.' - '.$name.' - '.$app_id.' - '.$img_url.'</br>';
                    }

                    // Calibrate Y
                    if($j  == 0 || $j == 5){
                        $y = 50;
                    }
                    else{
                        $y += 45;
                    }

                    $rect_width = 80;   // Width of the rectangle
                    $rect_height = 40;   // Height of the rectangle
                    $rect_borderStyle = 'D';   // Border style (solid line)

                    /* Attendance */
                    // Draw the rectangle
                    $attndnc_pdf->Rect($x, $y, $rect_width, $rect_height, $rect_borderStyle);

                    /* seat content */
                    // image
                    $attndnc_pdf->Image($img_url, $x+5, $y+5, 25, 25, '', '', '', false, 300, '', false, false, 0, false, false, false);
                    
                    //serial
                    $attndnc_pdf->SetXY($x+12, $y+30);
                    $attndnc_pdf->Cell(0, 10, $app_id, 0, 1);

                    

                    // roll
                    // Set font
                    $attndnc_pdf->SetFont('helvetica', '', 18);
                    
                    $attndnc_pdf->SetXY($x+36, $y+5);
                    $attndnc_pdf->Cell(0, 10, "Roll: ".$roll, 0, 1);

                    // Set font
                    $attndnc_pdf->SetFont('helvetica', '', 12);

                    // Name
                    $attndnc_pdf->SetFont('helvetica', '', 7);
                    $attndnc_pdf->SetXY($x+36, $y+13);
                    $attndnc_pdf->Cell(0, 10, $name, 0, 1);
                    $attndnc_pdf->SetFont('helvetica', '', 12);

                    // Signature Box
                    $attndnc_pdf->Rect($x+36, $y+22, 40, 12, $rect_borderStyle);

                    // Signature text
                    // Set font
                    $attndnc_pdf->SetFont('helvetica', '', 4);
                    
                    $attndnc_pdf->SetXY($x+66, $y+18);
                    $attndnc_pdf->Cell(0, 10, "Signature", 0, 1);

                    // Set font
                    $attndnc_pdf->SetFont('helvetica', '', 12);
    

                }
            }
        }


        

        // Save the attndnc_pdf with a unique name
        $attndnc_pdf->Output($attndnc_file_path, 'F');
        echo $attndnc_file_path;

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