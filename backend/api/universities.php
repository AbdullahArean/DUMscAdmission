<?php
// Include config file
require_once "config.php";
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
    header("Access-Control-Allow-Headers: *");
            
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: *");
}


if($_SERVER["REQUEST_METHOD"] == "GET"){
    $query = "SELECT uni_id, uni_name FROM SYS.Universities";
    $stmt = oci_parse($link, $query);
    if(oci_execute($stmt)){
        $response = array();
        while($row = oci_fetch_array($stmt, OCI_ASSOC)){
            $uni = array();
            $uni["label"] = $row["UNI_NAME"];
            $uni["id"] = $row["UNI_ID"];

            array_push($response, $uni);
        }
        echo json_encode(
            $response
        );
    }
}
?>