<?php
    // Include config file
    require_once "config.php";
    
    // Define variables and initialize with empty values
    $name = $phone = $email = $password = $confirm_password = "";
    $name_err = $phone_err = $email_err = $password_err = $confirm_password_err = "";
    
    // Processing form data when form is submitted
    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
        // Validation

        // Validate username not null
        if(empty(trim($_POST["name"]))){
            $name_err = "Please enter a name.";
        }
        // Validate email not null
        elseif (empty(trim($_POST["email"]))) {
            $email_err = "Please enter your email.";
        }
        // TODO: 1. phone not null national student
        // elseif(!preg_match('/^[a-zA-Z ]+$/', trim($_POST["name"]))){
        //     $name_err = "name can only contain sapces and letters.";
        // }


        // EMAIL UNIQUE CHECK
        //  else{
        //     // Prepare a select statement
        //     $sql = "SELECT id FROM users WHERE u_mail = ?";
            
        //     if($stmt = mysqli_prepare($link, $sql)){
        //         // Bind variables to the prepared statement as parameters
        //         mysqli_stmt_bind_param($stmt, "s", $param_mail);
                
        //         // Set parameters
        //         $param_mail = trim($_POST["email"]);
                
        //         // Attempt to execute the prepared statement
        //         if(mysqli_stmt_execute($stmt)){
        //             /* store result */
        //             mysqli_stmt_store_result($stmt);
                    
        //             if(mysqli_stmt_num_rows($stmt) == 1){
        //                 $email_err = "This email is already registered.";
        //             } else{
        //                 $email = trim($_POST["email"]);
        //             }
        //         } else{
        //             echo "Oops! Something went wrong. Please try again.";
        //         }

        //         // Close statement
        //         mysqli_stmt_close($stmt);
        //     }
        // }
        
        // Validate password
        if(empty(trim($_POST["password"]))){
            $password_err = "Please enter a password.";     
        } elseif(strlen(trim($_POST["password"])) < 6){
            $password_err = "Password must have atleast 6 characters.";
        } else{
            $password = trim($_POST["password"]);
        }
        
        // Validate confirm password
        if(empty(trim($_POST["confirm_password"]))){
            $confirm_password_err = "Please confirm password.";     
        } else{
            $confirm_password = trim($_POST["confirm_password"]);
            if(empty($password_err) && ($password != $confirm_password)){
                $confirm_password_err = "Password did not match.";
            }
        }
        
        // Check input errors before inserting in database
        if(empty($email_err) && empty($password_err) && empty($confirm_password_err)){
            
            // Prepare an insert statement
            // $query = 'INSERT INTO users (u_mail, u_phone, username, password, role_id) VALUES :db_u_mail, :db_u_phone, :db_username, :db_password, :db_role_id';
            
            $hased_password = password_hash($password, PASSWORD_DEFAULT);
            $student_role_id = 4;
            $new_id = 4;
            $query = "INSERT INTO SYS.USERS (u_id, u_mail, u_phone, username, password, role_id) VALUES (".$new_id.", '".$_POST["email"]."', '".$_POST["phone"]."', '".$_POST["name"]."', '".$hased_password."', ".$student_role_id.")"  ;

            print $query;
            $s = oci_parse($link, $query);
            
           
            // oci_bind_by_name($s, ":db_u_mail", $_POST["email"]);
            // oci_bind_by_name($s, ":db_u_phone", $phone);
            // oci_bind_by_name($s, ":db_username", $_POST["name"]);
            // oci_bind_by_name($s, ":db_password", $hased_password);
            // oci_bind_by_name($s, ":db_role_id", $student_role_id);


            // Attempt to execute the prepared statement
            // if(oci_execute($s)){
            //     // Redirect to login page
            //     header("location: login.php");
            // } else{
            //     echo "Oops! Something went wrong. Please try again later.";
            // }
            oci_execute($s);
        }
        
        // Close connection
        oci_close($link);
    }


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
</head>
    <body>

    <div class="bg-gray-50 dark:bg-gray-900">
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <section class="">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                    </h1>
                    <ul class="flex justify-evenly w-full">
                    <li class="mr-2">
                        <!-- onClick={() => setStudentType("national")} -->
                    <button
                        
                        class={
                            studentType === "national"
                            ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                            : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                        }
                        >
                        National Student
                        </button>
                    </li>
                    <li class="">
                        <!-- onClick={() =>  onClick={() => setStudentType("international")} -->
                        <button
                       
                        class={
                            studentType === "international"
                            ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                            : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                        }
                        >
                        International Student
                        </button>
                    </li>
                    </ul>

                    <form class="space-y-4 md:space-y-6 transition-all duration-200 ease-in-out" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                    <div class="flex flex-col items-start justify-center">
                        <label
                        htmlFor="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Username
                        </label>
                        <input
                        type="text"
                        name="name" id="name" value="<?php echo $name; ?>"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        />
                        <div className="text-red-400 mt-2"><?php echo $name_err; ?></div>
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label
                        htmlFor="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Email
                        </label>
                        <input
                        type="text"
                        name="email" id="email" value="<?php echo $email; ?>"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        />
                        <div className="text-red-400 mt-2"><?php echo $email_err; ?></div>
                        
                    </div>

                    <!-- {studentType === "national" ? ( -->
                        <div class="flex flex-col items-start justify-center">
                        <label
                            htmlFor="phone"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone" id="phone" value="<?php echo $phone; ?>"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                        </div>
                        <div className="text-red-400 mt-2"><?php echo $phone_err; ?></div>
                        <!-- ) : (
                        <></>
                    )} -->
                    <div class="flex flex-col items-start justify-center">
                        <label
                        htmlFor="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Password
                        </label>
                        <input
                        type="password"
                        name="password" id="password" value="<?php echo $password; ?>"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        />
                        <div className="text-red-400 mt-2"><?php echo $password_err; ?></div>
                    </div>
                    <div class="flex flex-col items-start justify-center">
                        <label
                        htmlFor="confirm-password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Confirm password
                        </label>
                        <input
                        type="password"
                        name="confirm_password" id="confirm_password" value="<?php echo $confirm_password; ?>"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        />
                        <div className="text-red-400 mt-2"><?php echo $confirm_password_err; ?></div>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                        <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            required=""
                        />
                        </div>
                        <div class="ml-3 text-sm">
                        <label
                            htmlFor="terms"
                            class="font-light text-gray-500 dark:text-gray-300"
                        >
                            I accept the
                            <button
                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            href="#"
                            >
                            Terms and Conditions
                            </button>
                        </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition-all duration-200 ease-in-out"
                    >
                        Create an account
                    </button>
                    <div class="flex justify-between">
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?
                        </p>
                        <button
                        onClick={toLogin}
                        class="text-blue-600 hover:underline dark:text-blue-500"
                        >
                        Log In
                        </button>
                    </div>
                    </form>
                </div>
                </div>
                <label class="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
                <!-- checked={theme === "dark" ? "checked" : ""} -->
                <input
                    type="checkbox"
                    id="themeSwitch"
                    value=""
                    class="sr-only peer"
                    checked
                    onChange={handleThemeSwitch}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Dark Mode
                </span>
                </label>
            </div>
            </section>
        </div>
        </div>


    </body>
</html>