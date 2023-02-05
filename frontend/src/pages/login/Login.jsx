/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const nav = useNavigate();
  const [theme, setTheme] = useState(null);
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
  const toReg = () => {
    nav("/registration");
  };
  const toChange = () => {
    nav("/forgot");
  };
  const login = () => {
    nav("/home");
  };
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email/phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email / Phone
                </label>
                <input
                  type="text"
                  name="email/phone"
                  id="email/phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
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
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <div className="flex justify-end">
                  <button
                    onClick={toChange}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={login}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  transition-all duration-200 ease-in-out"
              >
                Sign in
              </button>

              <div className="flex justify-between">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </p>
                <button
                  onClick={toReg}
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign Up
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
  );
};

export default Login;