<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to index page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: index.php");
    exit;
}
 
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$email = $phone = $password = "";
$email_err = $phone_err = $password_err = $login_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Check if email is empty
    if(empty(trim($_POST["email"]))){
        $email_err = "Please enter email.";
    } else{
        $email = trim($_POST["email"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
    
    // Validate credentials
    if(empty($email_err) && empty($password_err)){
        // Prepare a select statement
        $sql = "SELECT U_MAIL, U_PHONE, USERNAME, PASSWORD, ROLE_ID FROM SYS.USERS WHERE U_MAIL = '".$_POST["email"]."'";
        
        // Parse the statement
        $stmt = oci_parse($link, $sql);
        
        // // Bind variables to the prepared statement as parameters
        // oci_bind_by_name($stmt, ":email", $param_email);
        
        // // Set parameters
        // $param_email = $email;
        
        // Attempt to execute the prepared statement
        if(oci_execute($stmt)){
            // Fetch the result
            $row = oci_fetch_array($stmt, OCI_ASSOC);
            
            // Check if email exists, if yes then verify password
            if($row){                    
                // Bind result variables
                $id = $row["U_ID"];
                $name = $row["USERNAME"];
                $hashed_password = $row["PASSWORD"];
                $role_id = $row["ROLE_ID"];
                
                if(password_verify($password, $hashed_password)){
                    // Password is correct, so start a new session
                    session_start();
                    
                    // Store data in session variables
                    $_SESSION["loggedin"] = true;
                    $_SESSION["id"] = $id;
                    $_SESSION["name"] = $name;
                    $_SESSION["role"] = $role_id;                            
                    
                    // Redirect user to index page
                    header("location: index.php");
                } else{
                    // Password is not valid, display a generic error message
                    $login_err = "Invalid phone or password.";
                }
            } else{
                // phone doesn't exist, display a generic error message
                $login_err = "Invalid phone or password.";
            }
        } else{
            echo "Oops! Something went wrong. Please try again later.";
        }
    }

        }
    
    // Close connection
    oci_close($link);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
</head>
    <body>

    <section class="bg-gray-100 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
              <div>
                <label
                  htmlFor="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email / Phone
                </label>
                <input
                  type="text"
                  name="email"
                  id="email" value="<?php echo $email; ?>"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password" value="<?php echo $password; ?>"
                  class="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <div class="flex justify-end">
                  <button
                    onClick={toChange}
                    class="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                onClick={login}
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition-all duration-200 ease-in-out"
              >
                Sign in
              </button>

              <div class="flex justify-between">
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </p>
                <button
                  onClick={toReg}
                  class="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <label class="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            id="themeSwitch"
            value=""
            class="sr-only peer"
            checked={theme === "dark" ? "checked" : ""}
            onChange={handleThemeSwitch}
          />
          <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Dark Mode
          </span>
        </label>
      </div>
    </section>
    </body>
    </html>
