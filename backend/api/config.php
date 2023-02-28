<?php
   
   //  $link = oci_connect("SYS", "password", "localhost/XE", "UTF-8", OCI_SYSDBA);
   // $link = oci_connect("SYS", "password", "localhost/orcl", "", OCI_SYSDBA);
   $link = oci_connect("sys", "L3H824KyFGg55", "103.221.253.173/cdb1", "", OCI_SYSDBA);
   $frontendURL = "localhost:3000";
   if (!$link) {
      $m = oci_error();
      echo $m['message'], "\n";
      exit;
   }
   else{
    // echo "Conneted";
   }
?>