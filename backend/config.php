<?php
    /* Database credentials. Assuming you are running MySQL
    server with default setting (user 'root' with no password) */
    // define('DB_SERVER', 'alvereduan.me');
    // define('DB_USERNAME', 'alveredu_khojthesearch_admin');
    // define('DB_PASSWORD', '');
    // define('DB_NAME', 'alveredu_khojthesearch');
    
    /* Attempt to connect to MySQL database */
    // $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    // $link = oci_connect("SYSTEM", "password", "localhost/XE");
    
    // // Check connection
    // if($link === false){
    //     die("ERROR: Could not connect. " . mysqli_connect_error());
    // }
    $link = oci_connect("SYS", "password", "localhost/XE", "UTF-8", OCI_SYSDBA);
if (!$link) {
   $m = oci_error();
   echo $m['message'], "\n";
   exit;
}
else {
   print "Connected to Oracle!";
}
?>