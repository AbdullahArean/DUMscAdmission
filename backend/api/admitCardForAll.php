<?php

require_once('tcpdf/tcpdf.php');
require_once('phpqrcode/qrlib.php');


function encryptContent($content, $key) {
    // Generate a random initialization vector (IV)
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));

    // Encrypt the content using AES-256-CBC cipher
    $encrypted = openssl_encrypt($content, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);

    // Combine the IV and encrypted content
    $encryptedContent = $iv . $encrypted;

    // Encode the encrypted content in base64 for safe transmission or storage
    $encryptedBase64 = base64_encode($encryptedContent);

    // Perform URL encoding on the base64-encoded content
    $urlSafeContent = urlencode($encryptedBase64);

    // Replace non-alphabetic characters with alphabetic characters
    $alphabeticContent = preg_replace('/[^a-zA-Z]/', 'A', $urlSafeContent);

    return $alphabeticContent;
}



function decryptContent($encryptedContent, $key) {
    // Replace alphabetic characters with non-alphabetic characters
    $nonAlphabeticContent = preg_replace('/[a-zA-Z]/', 'A', $encryptedContent);

    // Decode the URL-safe content
    $decodedContent = urldecode($nonAlphabeticContent);

    // Replace the URL-safe characters with their corresponding base64 characters
    $base64Encoded = str_replace(['-', '_'], ['+', '/'], $decodedContent);

    // Decode the base64 encoded encrypted content
    $encryptedContent = base64_decode($base64Encoded);

    // Extract the IV and encrypted content
    $iv = substr($encryptedContent, 0, openssl_cipher_iv_length('AES-256-CBC'));
    $encrypted = substr($encryptedContent, openssl_cipher_iv_length('AES-256-CBC'));

    // Decrypt the content using AES-256-CBC cipher
    $decrypted = openssl_decrypt($encrypted, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);

    return $decrypted;
}




function generateAdmitCard($SERVER, $name, $imgUrl, $signatureUrl, $roll, $userId, $appId, $father, $mother, $seat_center,  $seat_room )
{
    /* FILE-NAME */
    $fileName = uniqid() . '-' . time() . '.pdf';
    $filePath = getcwd().DIRECTORY_SEPARATOR."admits".DIRECTORY_SEPARATOR . $fileName;

    /* QR Code    -------------------------------------------------- */
    $url = $SERVER['REQUEST_SCHEME'] . "://$SERVER[HTTP_HOST]$SERVER[REQUEST_URI]";
    $url = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
    $qrcodeContent = substr($url, 0, -25)."/api/admits/".$fileName; /* !!!!!!!!! NEEDS CALIBRATION !!!!!!!! */

    // Generate QR code image file
    $qrCodeFile = getcwd().DIRECTORY_SEPARATOR."qr".DIRECTORY_SEPARATOR .uniqid() . '-' . time() . '.png';
    //echo $qrCodeFile."   |   ".$qrcodeContent."   |   ".$filePath;
    QRcode::png($qrcodeContent , $qrCodeFile, QR_ECLEVEL_L, 10);

    /* Split Roll -------------------------------------------------- */
    // Convert the number to a string
    $rollString = (string) $roll;

    // Split the string into an array of individual digits
    $rollArray = str_split($rollString);

    // Pad the array with leading zeros if necessary
    $rollArray = array_pad($rollArray, 5, '0');


    /* Split App ID -------------------------------------------------- */
    // Convert the number to a string
    $appIdString = (string) $appId;

    // Split the string into an array of individual digits
    $appIdArray = str_split($appIdString);

    // Pad the array with leading zeros if necessary
    $appIdArray = array_pad($appIdArray, 5, '0');



    /* PDF Start -------------------------------------------------- */
    // Create a new TCPDF object
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

    // Set document information
    $pdf->SetCreator('msadmission.cse.du.ac.bd');
    $pdf->SetAuthor('msadmission.cse.du.ac.bd');
    $pdf->SetTitle('Admit Card');
    $pdf->SetSubject('Admit Card');

    // Set default header data
    $pdf->SetHeaderData('', 0, '', '', array(0, 0, 0), array(255, 255, 255));

    // Set header and footer fonts
    $pdf->setHeaderFont(Array('helvetica', '', 10));
    $pdf->setFooterFont(Array('helvetica', '', 8));

    // Set default monospaced font
    $pdf->SetDefaultMonospacedFont('courier');

    // Set margins
    $pdf->SetMargins(15, 15, 15);
    $pdf->SetHeaderMargin(5);
    $pdf->SetFooterMargin(10);

    // Set auto page breaks
    $pdf->SetAutoPageBreak(true, 15);

    // Add a page
    $pdf->AddPage();

    // Set font
    $pdf->SetFont('helvetica', '', 12);

    // Set the rectangle parameters
    $x = 10;    // X-coordinate of the top-left corner
    $y = 10;    // Y-coordinate of the top-left corner
    $width = 190;   // Width of the rectangle
    $height = 145;   // Height of the rectangle
    $borderStyle = 'D';   // Border style (solid line)

    // Draw the rectangle
    $pdf->Rect($x, $y, $width, $height, $borderStyle);
    
    // Header image
    $pdf->Image("https://msadmission.cse.du.ac.bd/static/media/header.a176129cff71e993f5f9.png", 10, 20, 160 , 30, '', '', '', false, 300, '', false, false, 0, true, false, true);

    // Add the QR code image to the PDF
    $pdf->Image($qrCodeFile, 165, 15, 20, 20, 'PNG');


    // Bring the cell down
    $pdf->Ln(30);

    // Set line width
    $pdf->SetLineWidth(0.5);

    // Draw a line
    $pdf->Line(20, 40, 190, 40);

    // Set font
    $pdf->SetFont('helvetica', '', 18);

    // Output roll
    $pdf->Cell(0, 10, 'MSc Admission Admit Card', 0, 1, 'C');

    // Set font
    $pdf->SetFont('helvetica', '', 12);

    $pdf->SetXY(20, 60);
    $pdf->Cell(0, 10, 'Roll:', 0, 1);

    /* Roll Box --------------------*/
    // Set the starting position of the first cell
    $x1 = 35;
    $y1 = 60;

    // Define the cell dimensions and border settings
    $cellWidth = 8;    // Width of each cell
    $cellHeight = 8;   // Height of each cell
    $borderWidth = 1;   // Border width of each cell
    $borderStyle = '1'; // Border style (in this example, solid line)

    // Draw the first cell
    $pdf->SetXY($x1, $y1);
    $pdf->Cell($cellWidth, $cellHeight, $rollArray[0], $borderStyle, 0, 'C');

    // Set the starting position of the second cell
    $x2 = $x1 + $cellWidth;  // Add spacing between cells
    $y2 = $y1;

    // Draw the second cell
    $pdf->SetXY($x2, $y2);
    $pdf->Cell($cellWidth, $cellHeight, $rollArray[1], $borderStyle, 0, 'C');

    // Set the starting position of the third cell
    $x3 = $x2 + $cellWidth;  // Add spacing between cells
    $y3 = $y2;

    // Draw the third cell
    $pdf->SetXY($x3, $y3);
    $pdf->Cell($cellWidth, $cellHeight, $rollArray[2], $borderStyle, 0, 'C');

    // Set the starting position of the third cell
    $x4 = $x3 + $cellWidth;  // Add spacing between cells
    $y4 = $y3;

    $pdf->SetXY($x4, $y4);
    $pdf->Cell($cellWidth, $cellHeight, $rollArray[3], $borderStyle, 0, 'C');

    // Set the starting position of the second cell
    $x5 = $x4 + $cellWidth;  // Add spacing between cells
    $y5 = $y4;

    // Draw the second cell
    $pdf->SetXY($x5, $y5);
    $pdf->Cell($cellWidth, $cellHeight, $rollArray[4], $borderStyle, 0, 'C');

    // // Bring the cell down
    // $pdf->Ln(10);
    
    /* Roll Box Ended --------------------*/

    $pdf->SetXY(135, 60);
    $pdf->Cell(0, 10, 'Serial:', 0, 1);

    /* Serial Box --------------------*/
    // Set the starting position of the first cell
    $x1 = 150;
    $y1 = 60;

    // Define the cell dimensions and border settings
    $cellWidth = 8;    // Width of each cell
    $cellHeight = 8;   // Height of each cell
    $borderWidth = 1;   // Border width of each cell
    $borderStyle = '1'; // Border style (in this example, solid line)

    // Draw the first cell
    $pdf->SetXY($x1, $y1);
    $pdf->Cell($cellWidth, $cellHeight, $appIdArray[0], $borderStyle, 0, 'C');

    // Set the starting position of the second cell
    $x2 = $x1 + $cellWidth;  // Add spacing between cells
    $y2 = $y1;

    // Draw the second cell
    $pdf->SetXY($x2, $y2);
    $pdf->Cell($cellWidth, $cellHeight, $appIdArray[1], $borderStyle, 0, 'C');

    // Set the starting position of the third cell
    $x3 = $x2 + $cellWidth;  // Add spacing between cells
    $y3 = $y2;

    // Draw the third cell
    $pdf->SetXY($x3, $y3);
    $pdf->Cell($cellWidth, $cellHeight, $appIdArray[2], $borderStyle, 0, 'C');

    // Set the starting position of the third cell
    $x4 = $x3 + $cellWidth;  // Add spacing between cells
    $y4 = $y3;

    $pdf->SetXY($x4, $y4);
    $pdf->Cell($cellWidth, $cellHeight, $appIdArray[3], $borderStyle, 0, 'C');

    // Set the starting position of the second cell
    $x5 = $x4 + $cellWidth;  // Add spacing between cells
    $y5 = $y4;

    // Draw the second cell
    $pdf->SetXY($x5, $y5);
    $pdf->Cell($cellWidth, $cellHeight, $appIdArray[4], $borderStyle, 0, 'C');


    // Bring the cell down
    $pdf->Ln(10);
    
    /* Serial Box Ended --------------------*/


    // Output image
    $pdf->Image($imgUrl, 150, 80, 40, 40, '', '', '', false, 300, '', false, false, 0, false, false, false);

    // Output signature
    $pdf->Image($signatureUrl, 150, 125, 40, 15, '', '', '', false, 300, '', false, false, 0, false, false, false);

    // Output name
    $pdf->SetXY(20, 78);
    $pdf->Cell(0, 10, 'Name     '.'          '.':  ' . $name, 0, 1);

    $lastRowY = 78;

    // Father's Name
    $pdf->SetXY(20, $lastRowY + 10);
    $pdf->Cell(0, 10, 'Father\'s Name :  '.$father, 0, 1);
    $lastRowY += 10;

    // Mother's Name
    $pdf->SetXY(20, $lastRowY + 10);
    $pdf->Cell(0, 10, 'Mother\'s Name :  '.$mother, 0, 1);
    $lastRowY += 10;

    // Output date of exam
    $pdf->SetXY(20, $lastRowY + 10);
    $pdf->Cell(0, 10, 'Date of Exam   :  9 June, 2023 11:00 AM - 12:30 PM', 0, 1);
    $lastRowY += 10;

    // Output date of exam
    $pdf->SetXY(20, $lastRowY + 10);
    $pdf->Cell(0, 10, 'Exam Duration :  1 hour 30 minutes', 0, 1);
    $lastRowY += 10;

    // Output exam center
    $pdf->SetXY(20, $lastRowY + 10);
    $pdf->Cell(0, 10, 'Exam Center    :  '.$seat_center, 0, 1);
    $lastRowY += 10;

    // Output room
    $pdf->SetXY(50, $lastRowY + 5);
    $pdf->Cell(0, 10, " ( Room: ".$seat_room."), University of Dhaka", 0, 1);
    $lastRowY += 10;

    // Save the PDF with a unique name
    $pdf->Output($filePath, 'F');

    return $qrcodeContent;
}



?>