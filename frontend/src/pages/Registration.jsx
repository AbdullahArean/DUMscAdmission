import React from "react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import "../index.css";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const nav = useNavigate();
  const [theme, setTheme] = useState(null);
  const [value, setValue] = useState();
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const toLogin = (res) => {
    nav("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log(e.target.fullname.value);

    let dataToPost = new FormData();
    dataToPost.set("name", e.target.fullname.value);
    dataToPost.set("email", e.target.email.value);
    dataToPost.set("password", e.target.password.value);
    dataToPost.set("phone", value);
    dataToPost.set("confirm_password", e.target.confirm_password.value);
    dataToPost.set("student_type", "national");

    api
      .post("/registration.php", dataToPost)
      .then((res) => {
        console.log(res);
        // SRIZON SUCCESSFUL TOAST
        toLogin();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                onSubmit={handleRegister}
                className="space-y-4 md:space-y-6 transition-all duration-200 ease-in-out"
              >
                <div className="flex flex-col items-start justify-center">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="BD"
                    value={value}
                    onChange={setValue}
                    className="bg-gray-50 border border-gray-300 text-gray-900
                        sm:text-sm rounded-lg focus:ring-blue-600
                        focus:border-blue-600 block w-full px-2.5 py-0.5 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm_password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <button
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </button>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition-all duration-200 ease-in-out"
                >
                  Create account
                </button>
                <div className="flex justify-between">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                  </p>
                  <button
                    onClick={toLogin}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <label className="fixed top-5 right-5 md:top-10 md:right-10 inline-flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              id="themeSwitch"
              value=""
              className="sr-only peer"
              checked={theme === "dark" ? "checked" : ""}
              onChange={handleThemeSwitch}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Dark Mode
            </span>
          </label>
        </div>
      </section>
    </div>
  );
};

export default Registration;
