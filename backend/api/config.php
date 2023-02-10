<?php
   
   //  $link = oci_connect("SYS", "password", "localhost/XE", "UTF-8", OCI_SYSDBA);
   $link = oci_connect("SYS", "password", "localhost/XE", "", OCI_SYSDBA);
   if (!$link) {
      $m = oci_error();
      echo $m['message'], "\n";
      exit;
   }
   else{
    // echo "Conneted";
   }
?>