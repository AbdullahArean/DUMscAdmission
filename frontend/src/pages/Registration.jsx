/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { CgSpinner } from "react-icons/cg";
import "../index.css";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../components/UserContext.jsx";

const Registration = () => {
  const nav = useNavigate();
  const [value, setValue] = useState();
  const [user, setUser] = useGlobalState("user");
  const [jwt, setJwt] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState();

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }

    setTheme();
  };

  const setTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  };

  useEffect(() => {
    setTheme();
  }, [isDarkMode]);

  const toLogin = (res) => {
    nav("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    let dataToPost = new FormData();
    dataToPost.set("name", e.target.fullname.value);
    dataToPost.set("email", e.target.email.value);
    dataToPost.set("password", e.target.password.value);
    dataToPost.set("phone", value);
    dataToPost.set("confirm_password", e.target.confirm_password.value);
    dataToPost.set("student_type", "national");

    api
      .post("/registration.php", dataToPost)
      .then((resReg) => {
        console.log(resReg);
        // toLogin();
        // Log the user in
        api
          .post("/login.php", dataToPost)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("jwt", res.data["jwt"]);
              setLoading(false);
              api
                .get("/account.php", {
                  headers: {
                    Authorization: localStorage.getItem("jwt"),
                  },
                })
                .then((resAcc) => {
                  setLoading(false);

                  let toUpdateKeys = [
                    "id",
                    "name",
                    "phone",
                    "mail",
                    "verified",
                    "role",
                    "profile",
                  ];
                  let profile = resAcc.data.message;
                  Object.keys(user).forEach((k) => {
                    if (toUpdateKeys.includes(k)) {
                      user[k] = profile[k];
                    }
                  });
                  setUser(user);
                  setIsLoggedIn(true);
                  setJwt(localStorage.getItem("jwt"));

                  // if verified toProfile
                  if (resAcc.data.message.verified === "1") nav("/home");
                  else nav("/verify");
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });

              // toProfile();
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Login Failed!");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Failed!");
        setLoading(false);
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
                    required
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
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
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
                    required
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
                    type="password"
                    name="confirm_password"
                    id="confirm-password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
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
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out"
                >
                  <div className="flex justify-center">
                    {loading === true ? (
                      <CgSpinner className="animate-spin h-5 w-5 self-center" />
                    ) : (
                      <p>Create account</p>
                    )}
                  </div>
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
              checked={isDarkMode === true ? "checked" : ""}
              onChange={toggleTheme}
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
