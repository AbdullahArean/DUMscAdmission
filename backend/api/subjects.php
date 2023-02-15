<?php
// Include config file
require_once "config.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


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
        echo json_encode(
            $response
        );
    }
}


else {
    http_response_code(401);
    echo json_encode([
        'status' => 0,
        'message' => 'Access Denied',
    ]);
}
?>