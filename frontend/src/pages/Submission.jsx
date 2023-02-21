/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Submission = () => {
  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col justify-center">
      <Navbar active="submission"/>
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

      <div class="relative overflow-x-auto">
        <table class="w-full h-sc text-sm text-left text-gray-500 dark:text-gray-400 mt-24">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Applicant Name
              </th>
              <th scope="col" class="px-6 py-3">
                Applied at
              </th>
              <th scope="col" class="px-6 py-3">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Raufun Nazin Srizon
              </th>
              <td class="px-6 py-4">15-FEB-2023</td>
              <td class="px-6 py-4">
                <a
                  target="_blank"
                  href="https://sslcommerz.netlify.app/checkout"
                >
                  <button
                    type="button"
                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Pay Now
                  </button>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submission;
