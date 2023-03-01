import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import api from "../api";

const Forgot = () => {
  const nav = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState();
  const [loading, setLoading] = useState(false);

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

  const forgotPass = (e) => {
    setLoading(true);
    e.preventDefault();
    let email = new FormData();
    email.set("email", e.target.email.value);
    api
      .post("/forgotPassword.php", email)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          nav("/reset", { state: e.target.email.value });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen h-full lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </div>
            <div className="text-sm leading-tight tracking-tight text-gray-900 md:text-lg dark:text-gray-400">
              Type in your email and we will send you a code to reset your
              password!
              <span className="block text-xs text-gray-500">
                *you may need to check spam folder
              </span>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={forgotPass}>
              <div>
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
                  required=""
                />
              </div>
              <button
                type="submit"
                disabled={loading ? "true" : "false"}
                className={`${
                  loading ? "cursor-not-allowed" : ""
                } w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                <div className="flex justify-center">
                  {loading === true ? (
                    <CgSpinner className="animate-spin h-5 w-5 self-center" />
                  ) : (
                    <p>Submit</p>
                  )}
                </div>
              </button>
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
        <label className="fixed top-5 left-5 md:top-10 md:left-10 inline-flex items-center mb-4 cursor-pointer">
          <FaHome
            onClick={() => nav("/home")}
            className="text-3xl cursor-pointer dark:text-blue-600 dark:hover:text-blue-700"
          />
        </label>
      </div>
    </section>
  );
};

export default Forgot;
