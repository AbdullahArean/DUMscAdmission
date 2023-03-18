import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const Notice = ({ notice }) => {
  var mobile = window.matchMedia("(max-width: 700px)");
  return (
    <div
      className={`flex p-4 mb-4 border-t-4 dark:bg-gray-800 ${
        notice.type === "error"
          ? "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800"
          : notice.type === "warning"
          ? "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800"
          : notice.type === "success"
          ? "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800"
          : "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      }`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="ml-3 mr-3 flex justify-between items-center w-full text-sm font-medium">
        <div className="w-full mr-2 md:mr-8">
          <div className="flex justify-between">
            <div className="text-md md:text-lg">{notice.title}</div>
            {/* <div>{notice.created_by}</div> */}
            <div>{notice.created_on}</div>
          </div>
          {mobile.matches
            ? notice.body.slice(0, 50).concat("...")
            : notice.body.slice(0, 199).concat("...")}
        </div>
        <a
          href="https://www.africau.edu/images/default/sample.pdf"
          className="font-semibold flex flex-col-reverse md:flex-row justify-center md:gap-x-2 items-center hover:underline no-underline"
        >
          <p className="text-xs md:text-md">Download</p>
          <AiOutlineDownload className="text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default Notice;
