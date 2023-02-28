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


if ($method == "POST"){
    $error = array();
    $app_id  = "";
    $app_id_err = "";
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
            $user_data = JWT::decode($jwt, new Key($secret_key, 'HS256'));
            $data=$user_data->data;

            if(!isset($_POST["app_id"]) || empty(trim($_POST["app_id"]))){
                $app_id_err = "Please enter a app_id.";
                $error["app_id"] = $app_id_err;
                
            } else {
                $app_id = trim($_POST["app_id"]);
            }

            if(empty($app_id_err)){

                $query = "SELECT FEE FROM Application NATURAL JOIN DEPARTMENT  WHERE APP_ID=".$app_id;
                $stmt = oci_parse($link, $query);
                $r = oci_execute($stmt);
                $row = oci_fetch_array($stmt, OCI_ASSOC);
                $amount = $row['FEE'];


                $query = "SELECT * FROM Users  WHERE U_ID=".$data->{'id'};
                $stmt = oci_parse($link, $query);
                $r = oci_execute($stmt);
                $student = oci_fetch_array($stmt, OCI_ASSOC);

                $tran_id = "sslcz-".uniqid();
                


                /* SSLCOMMERZ */
                $post_data = array();
                $post_data['store_id'] = "examp63edc215c9616";
                $post_data['store_passwd'] = "examp63edc215c9616@ssl";
                $post_data['total_amount'] = $amount;
                $post_data['currency'] = "BDT";
                $post_data['tran_id'] = $tran_id;
                // $post_data['success_url'] = $_SERVER['REQUEST_SCHEME'] . "://$frontendURL/success?tran=".$tran_id;
                $post_data['success_url'] = "https://msadmission.cse.du.ac.bd/api/paymentSuccess.php?tran=".$tran_id;
                $post_data['fail_url'] = "https://msadmission.cse.du.ac.bd/api/paymentFailed.php?tran=".$tran_id;
                // $post_data['fail_url'] = $_SERVER['HTTP_HOST'] . "/api/failed?tran=".$tran_id;
                $post_data['cancel_url'] = $_SERVER['REQUEST_SCHEME'] . "://$frontendURL/submissions";

                # EMI INFO
                $post_data['emi_option'] = "0";

                # CUSTOMER INFORMATION
                $post_data['cus_name'] = $student["U_NAME"];
                $post_data['cus_email'] = $student["U_MAIL"];
                $post_data['cus_add1'] = "Dhaka";
                $post_data['cus_add2'] = "Dhaka";
                $post_data['cus_city'] = "Dhaka";
                $post_data['cus_state'] = "Dhaka";
                $post_data['cus_postcode'] = "1000";
                $post_data['cus_country'] = "Bangladesh";
                $post_data['cus_phone'] = $student["U_PHONE"];

                # SHIPMENT INFORMATION
                $post_data['shipping_method'] = "NO";
                // $post_data['ship_name'] = "University of Dhaka";
                // $post_data['ship_add1 '] = "Dhaka";
                // $post_data['ship_add2'] = "Dhaka";
                // $post_data['ship_city'] = "Dhaka";
                // $post_data['ship_state'] = "Dhaka";
                // $post_data['ship_postcode'] = "1000";
                // $post_data['ship_country'] = "Bangladesh";
                
                $post_data['product_name'] = 'CSE MSc ADmission';
                $post_data['product_category'] = 'Fee';
                $post_data['product_profile'] = 'general';
                $post_data['product_amount'] = $amount;
                

                # REQUEST SEND TO SSLCOMMERZ
                $direct_api_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

                $handle = curl_init();
                curl_setopt($handle, CURLOPT_URL, $direct_api_url );
                curl_setopt($handle, CURLOPT_TIMEOUT, 30);
                curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 30);
                curl_setopt($handle, CURLOPT_POST, 1 );
                curl_setopt($handle, CURLOPT_POSTFIELDS, $post_data);
                curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE); # KEEP IT FALSE IF YOU RUN FROM LOCAL PC


                $content = curl_exec($handle );

                $code = curl_getinfo($handle, CURLINFO_HTTP_CODE);

                if($code == 200 && !( curl_errno($handle))) {
                    curl_close( $handle);
                    $sslcommerzResponse = $content;
                } else {
                    curl_close( $handle);
                    echo "FAILED TO CONNECT WITH SSLCOMMERZ API";
                    exit;
                }

                # PARSE THE JSON RESPONSE
                $sslcz = json_decode($sslcommerzResponse, true );
                // echo $sslcommerzResponse;

                if(isset($sslcz['GatewayPageURL']) && $sslcz['GatewayPageURL']!="" ) {

                    $query = "INSERT INTO Payment (app_id, trx_id, sessionkey, amount) VALUES (".$app_id.", '".$tran_id."', '".$sslcz['sessionkey']."', ".$amount.")";

                    // echo $query;
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

                            echo $sslcz['GatewayPageURL'];

                            // http_response_code(200);
                            // echo json_encode([
                            //     "gateway"=> 
                            // ]);
                        
                        }
                    }



                    
                    //echo $sslcz['sessionkey'];
                    exit;
                } else {
                    http_response_code(400);
                            echo json_encode([
                                "errot"=> 'Payment Initiation Failed.'
                            ]);
                    // echo "JSON Data parsing error!";
                }

                // $amount = 1000;
                // $session_key = "87444DE66A7F49BBD892F813A96D6A5C";
                // $gateway = "https://sandbox.sslcommerz.com/EasyCheckOut/testcde87444de66a7f49bbd892f813a96d6a5c";
                // $query = "INSERT INTO Payment (app_id, trx_id, amount) VALUES (".$app_id.", '".$session_key."', ".$amount.")";
                
                // echo $query;
                // $s = oci_parse($link, $query);

                // $r = oci_execute($s, OCI_NO_AUTO_COMMIT);
                // if (!$r) {    
                //     $e = oci_error($s);
                //     oci_rollback($link);  // rollback changes
                //     trigger_error(htmlentities($e['message']), E_USER_ERROR);
                // }
                // else{
                //     // Commit the changes 
                //     $r = oci_commit($link);
                //     if (!$r) {
                //         $e = oci_error($link);
                //         trigger_error(htmlentities($e['message']), E_USER_ERROR);
                //     }
                //     else{
                        
                //     }
                // }
            }
           // Validation Failed
            else {
                http_response_code(400);
                echo json_encode($error);
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