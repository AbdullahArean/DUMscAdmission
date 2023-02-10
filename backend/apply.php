<?php
// Include config file
require_once "config.php";

// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$NAME = $F_NAME = $M_NAME = $DOB = $A_PHONE = $A_MAIL = $APP_ID = $SSC_ROLL = $SSC_REG = $SSC_TYPE = $SSC_BOARD = $SSC_YEAR = $SSC_RESULT = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $NAME = trim($_POST["NAME"]);
    $F_NAME = trim($_POST["F_NAME"]);
    $M_NAME = trim($_POST["M_NAME"]);
    $DOB = $_POST["DOB"];
    $A_PHONE = trim($_POST["A_PHONE"]);
    $A_MAIL = trim($_POST["A_MAIL"]);
    $SSC_ROLL = trim($_POST["SSC_ROLL"]);
    $SSC_REG = trim($_POST["SSC_REG"]);
    $SSC_TYPE = trim($_POST["SSC_TYPE"]);
    $SSC_YEAR = trim($_POST["SSC_YEAR"]);
    $SSC_RESULT = trim($_POST["SSC_RESULT"]);
    $SSC_BOARD = trim($_POST["SSC_BOARD"]);

    $APP_ID = "3";
    // Prepare an insert statement
    // $sql = "INSERT INTO SYS.APPLICATION (APP_ID, NAME, F_NAME, M_NAME, DOB, A_PHONE, A_MAIL) VALUES( '" . $APP_ID . "','" . $NAME . "', '" . $F_NAME . "', '" . $M_NAME . "', '" . $DOB . "', '" . $A_PHONE . "',  '" . $A_MAIL . "')";

    // $sql2 = "INSERT INTO SYS.SSC (APP_ID, SSC_ROLL, SSC_REG, SSC_TYPE, SSC_BOARD, SSC_YEAR, SSC_RESULT) VALUES( '" . $APP_ID . "','" . $SSC_ROLL . "', '" . $SSC_REG . "', '" . $SSC_TYPE . "', '" . $SSC_BOARD . "', '" . $SSC_YEAR . "',  '" . $SSC_RESULT . "')";

    $queries = array(
        "INSERT INTO SYS.APPLICATION (APP_ID, NAME, F_NAME, M_NAME, DOB, A_PHONE, A_MAIL) VALUES( '" . $APP_ID . "','" . $NAME . "', '" . $F_NAME . "', '" . $M_NAME . "', '" . $DOB . "', '" . $A_PHONE . "',  '" . $A_MAIL . "')",
        "INSERT INTO SYS.SSC (APP_ID, SSC_ROLL, SSC_REG, SSC_TYPE, SSC_BOARD, SSC_YEAR, SSC_RESULT) VALUES( '" . $APP_ID . "','" . $SSC_ROLL . "', '" . $SSC_REG . "', '" . $SSC_TYPE . "', '" . $SSC_BOARD . "', '" . $SSC_YEAR . "',  '" . $SSC_RESULT . "')"
        
        
    );
      
      foreach ($queries as $query ) {
        // Parse the SQL statement
    $stmt = oci_parse($link, $query);
    // $stmt2 = oci_parse($link, $sql2);

    $r = oci_execute($stmt, OCI_NO_AUTO_COMMIT);
            if (!$r) {    
                $e = oci_error($stmt);
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
                    header("location: login.php");
                }
            }
      }



    // // Parse the SQL statement
    // $stmt = oci_parse($link, $sql);
    // // $stmt2 = oci_parse($link, $sql2);

    // $r = oci_execute($stmt, OCI_NO_AUTO_COMMIT);
    //         if (!$r) {    
    //             $e = oci_error($stmt);
    //             oci_rollback($link);  // rollback changes
    //             trigger_error(htmlentities($e['message']), E_USER_ERROR);
    //         }
    //         else{
    //             // Commit the changes 
    //             $r = oci_commit($link);
    //             if (!$r) {
    //                 $e = oci_error($link);
    //                 trigger_error(htmlentities($e['message']), E_USER_ERROR);
    //             }
    //             else{
    //                 header("location: login.php");
    //             }
    //         }

            // $r2 = oci_execute($stmt2, OCI_NO_AUTO_COMMIT);
            // if (!$r2) {    
            //     $e2 = oci_error($stmt2);
            //     oci_rollback($link);  // rollback changes
            //     trigger_error(htmlentities($e2['message']), E_USER_ERROR);
            // }
            // else{
            //     // Commit the changes 
            //     $r2 = oci_commit($link);
            //     if (!$r2) {
            //         $e2 = oci_error($link);
            //         trigger_error(htmlentities($e2['message']), E_USER_ERROR);
            //     }
            //     else{
            //         header("location: login.php");
            //     }
            // }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign In</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
</head>
    <body >
    <div class="bg-white dark:bg-gray-900 h-full">
        <?php include 'header.php';?>

        <div class="bg-white h-full dark:bg-gray-900 flex flex-col justify-center">
    
        <form class="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="text-black dark:text-white mb-3 my-8 text-center text-xl">Personal Information</div>
            <div class="relative z-0 w-full mb-6 group">
            <input
                type="text"
                name="NAME"
                id="NAME" value="<?php echo $NAME; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
            />
            <label
                htmlFor="NAME"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
            >
                Full Name
            </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
            <input
                type="text"
                name="F_NAME"
                id="F_NAME" value="<?php echo $F_NAME; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
            />
            <label
                htmlFor="F_NAME"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
            >
                Father's Name
            </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
            <input
                type="text"
                name="M_NAME"
                id="M_NAME" value="<?php echo $M_NAME; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
            />
            <label
                htmlFor="mname"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
            >
                Mother's Name
            </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
            <input
                type="email"
                name="A_MAIL"
                id="A_MAIL" value="<?php echo $A_MAIL; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
            />
            <label
                htmlFor="A_MAIL"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
            >
                Email address
            </label>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="text"
                name="DOB"
                id="DOB" value="<?php echo $DOB; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="DOB"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                Date of Birth
                </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="text"
                name="A_PHONE"
                id="A_PHONE" value="<?php echo $A_PHONE; ?>"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="A_PHONE"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Phone
                </label>
            </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="file"
                name="pic"
                id="pic"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="pic"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Picture (Passport Size)
                </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="file"
                name="sign"
                id="sign"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "

                />
                <label
                htmlFor="sign"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Signature
                </label>
            </div>
            </div>
            <div class="text-black dark:text-white mb-3 my-8 text-center text-xl">Educational Information</div>

            <div>
            <div class="text-black dark:text-white mb-3 my-8 ml-5">SSC / Equivalent</div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_TYPE"
                    id="SSC_TYPE" value="<?php echo $SSC_TYPE; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                />
                <label
                    htmlFor="SSC_TYPE"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Exam Type
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_ROLL"
                    id="SSC_ROLL" value="<?php echo $SSC_ROLL; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="SSC_ROLL"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Roll No.
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_REG"
                    id="SSC_REG" value="<?php echo $SSC_REG; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="SSC_REG"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Registration No.
                </label>
                </div>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_BOARD"
                    id="SSC_BOARD" value="<?php echo $SSC_BOARD; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="SSC_BOARD"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Board
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_YEAR"
                    id="SSC_YEAR" value="<?php echo $SSC_YEAR; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="SSC_YEAR"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Passing Year
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="SSC_RESULT"
                    id="SSC_RESULT" value="<?php echo $SSC_RESULT; ?>"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="SSC_RESULT"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    GPA (Out of 5.00)
                </label>
                </div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="file"
                name="ssc_transcript"
                id="ssc_transcript"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="ssc_transcript"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Transcript
                </label>
            </div>
            </div>

            <div>
            <div class="text-black dark:text-white mb-3 my-8 ml-5">HSC / Equivalent</div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_type"
                    id="hsc_type"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_type"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Exam Type
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_roll"
                    id="hsc_roll"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_roll"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Roll No.
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_reg"
                    id="hsc_reg"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_reg"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Registration No.
                </label>
                </div>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_board"
                    id="hsc_board"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_board"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Board
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_year"
                    id="hsc_year"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_year"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Passing Year
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="hsc_result"
                    id="hsc_result"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="hsc_result"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    GPA (Out of 5.00)
                </label>
                </div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="file"
                name="hsc_transcript"
                id="hsc_transcript"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="hsc_transcript"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Transcript
                </label>
            </div>
            </div>

            <div>
            <div class="text-black dark:text-white mb-3 my-8 ml-5">
                Undergraduate / Equivalent
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="ug_type"
                    id="ug_type"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="ug_type"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Graduation Type
                </label>
                </div>
                <div class="relative md:col-span-2 z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="ug-institution"
                    id="ug-institution"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="ug-institution"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Institution
                </label>
                </div>
            </div>
            <div class="md:grid md:grid-cols-3 md:gap-5">
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="ug_subject"
                    id="ug_subject"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="ug_subject"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Subject
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="ug_pass_year"
                    id="ug_pass_year"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="ug_pass_year"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    Passing Year
                </label>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="ug_cgpa"
                    id="ug_cgpa"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    
                />
                <label
                    htmlFor="ug_cgpa"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                    CGPA (Out of 4.00)
                </label>
                </div>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                type="file"
                name="ug_transcript"
                id="ug_transcript"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                
                />
                <label
                htmlFor="ug_transcript"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                Transcript
                </label>
            </div>
            </div>
            <div class="flex justify-center">
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
            </div>
        </form>
        </div>
    </div>
    </body>
</html>