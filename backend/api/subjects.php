<?php
// Include config file
require_once "config.php";
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}


if($_SERVER["REQUEST_METHOD"] == "GET"){
    $query = "SELECT SUB_ID, SUB_NAME FROM SYS.Subjects";
    $stmt = oci_parse($link, $query);
    if(oci_execute($stmt)){
        $response = array();
        while($row = oci_fetch_array($stmt, OCI_ASSOC)){
            $uni = array();
            $uni["label"] = $row["SUB_NAME"];
            $uni["id"] = $row["SUB_ID"];

            array_push($response, $uni);
        }
        http_response_code(200);
        echo json_encode(
            $response
        );
    }
}
?>