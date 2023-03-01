<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once  "PHPMailer/src/Exception.php";
require_once "PHPMailer/src/PHPMailer.php";
require_once "PHPMailer/src/SMTP.php";


function sendmail($to, $code) {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'mail.alvereduan.me';
    $mail->SMTPAuth = true;
    $mail->Username = 'dumscadmission@alvereduan.me';
    $mail->Password = '@(qKL};+m-YA';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom("dumscadmission@alvereduan.me");
    $mail->addAddress($to);

    $mail->Subject = 'Master Admission Email Verification';
    $mail->Body = 'Your Verification Code is '.$code.".";

    $mail->send();
}



function sendPaymentSuccess($to, $amount) {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'mail.alvereduan.me';
    $mail->SMTPAuth = true;
    $mail->Username = 'dumscadmission@alvereduan.me';
    $mail->Password = '@(qKL};+m-YA';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom("dumscadmission@alvereduan.me");
    $mail->addAddress($to);

    $mail->Subject = 'Master Admission Email Verification';
    $mail->Body = 'Payment Recieved of TK '.$amount;

    $mail->send();
}

function sendResetPassword($email, $code) {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'mail.alvereduan.me';
    $mail->SMTPAuth = true;
    $mail->Username = 'dumscadmission@alvereduan.me';
    $mail->Password = '@(qKL};+m-YA';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom("dumscadmission@alvereduan.me");
    $mail->addAddress($email);

    $mail->Subject = 'Master Admission Email Verification';
    $mail->Body = 'Your Reset Password Code is '.$code.".";

    $mail->send();
}

?>