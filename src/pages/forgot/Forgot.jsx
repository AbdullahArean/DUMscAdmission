import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const Forgot = () => {
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
  const toReset = () => {
    nav("/reset");
  };
  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </div>
            <div className="text-sm leading-tight tracking-tight text-gray-900 md:text-lg dark:text-gray-400">
              Type in your email and we will send you a code to reset your
              password!
            </div>
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
              <button
                type="button"
                onClick={toReset}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
        <button
          type="button"
          onClick={handleThemeSwitch}
          className="text-white fixed right-10 bottom-10"
        >
          {theme === "dark" ? (
            <div className="flex align-middle gap-3  border rounded-full px-2 py-1">
              <div className="text-center text-lg">Light</div>
              <MdOutlineLightMode className="text-3xl" />
            </div>
          ) : (
            <div className="flex align-middle gap-3 border border-gray-900 rounded-full px-2 py-1">
              <div className="text-center text-lg text-gray-900">Dark</div>
              <MdOutlineDarkMode className="text-3xl text-gray-900" />
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default Forgot;
