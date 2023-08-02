/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalState } from "../components/UserContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal } from "antd";
import moment from "moment";

const Information = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");
  const [father, setFather] = useState(false);
  const [mother, setMother] = useState(false);
  const [dateState, setDateState] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const handleChange = (value) => {
    setDateState(value);
    setShowCalendar(false);
  };
  const [fatherInfo, setFatherInfo] = useState({
    name_en: null,
    name_bn: null,
    nid: null,
    phone: null,
    occupation: null,
    education: null,
    income: null,
    title: "Father",
  });
  const [motherInfo, setMotherInfo] = useState({
    name_en: null,
    name_bn: null,
    nid: null,
    phone: null,
    occupation: null,
    education: null,
    income: null,
    title: "Mother",
  });

  const fatherAlive = (e) => {
    setFather(e);
  };
  const motherAlive = (e) => {
    setMother(e);
  };
  return (
    <div className="bg-white min-h-screen h-full dark:bg-gray-900 flex flex-col">
      <Navbar active="info" />
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
      <div className="mt-12 lg:mt-24 mx-6 lg:mx-10 relative overflow-x-auto">
        <form className="lg:w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
          <div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Personal Information
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="a_name_eng"
                id="a_name_eng"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="a_name_eng"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Full Name (English)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="a_name_ban"
                id="a_name_ban"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="a_name_ban"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Full Name (Bangla)
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={moment(dateState).format("DD/MM/YYYY")}
                  disabled={showCalendar ? true : false}
                  onClick={() => setShowCalendar(true)}
                />
                <label
                  htmlFor="dob"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Date of Birth
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="nid"
                  id="nid"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="nid"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  National ID Card Number
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <label htmlFor="gender" className="sr-only">
                  Gender
                </label>
                <select
                  id="gender"
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option defaultValue>Gender</option>
                  <option value="17">Male</option>
                  <option value="16">Female</option>
                  <option value="15">Other</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="religion"
                  id="religion"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="religion"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Religion
                </label>
              </div>
            </div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Father's Information
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="f_name_eng"
                  id="f_name_eng"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      name_en: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="f_name_eng"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (English)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="f_name_ban"
                  id="f_name_ban"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      name_bn: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="f_name_ban"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (Bangla)
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="flex justify-start items-center">
                <div className="flex items-center h-5">
                  <input
                    id="fatherAlive"
                    aria-describedby="fatherAlive"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    onClick={(e) => {
                      fatherAlive(e.target.checked);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="fatherAlive"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    My father is alive
                  </label>
                </div>
              </div>
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="f_nid"
                  id="f_nid"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="f_nid"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  National ID Card Number
                </label>
              </div>
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="f_phone"
                  id="f_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      nid: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="f_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Phone Number
                </label>
              </div>
            </div>
            {father ? (
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <label htmlFor="f_occupation" className="sr-only">
                  Occupation
                </label>
                <select
                  id="f_occupation"
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      occupation: e.target.value,
                    }))
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option defaultValue>Occupation</option>
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="f_education"
                  id="f_education"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      education: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="f_education"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Education Level
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="f_income"
                  id="f_income"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setFatherInfo((prevState) => ({
                      ...prevState,
                      income: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="f_income"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Monthly Income
                </label>
              </div>
            </div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Mother's Information
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="m_name_eng"
                  id="m_name_eng"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      name_en: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_name_eng"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (English)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="m_name_ban"
                  id="m_name_ban"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      name_bn: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_name_ban"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (Bangla)
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="flex justify-start items-center">
                <div className="flex items-center h-5">
                  <input
                    id="motherAlive"
                    aria-describedby="motherAlive"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    onClick={(e) => {
                      motherAlive(e.target.checked);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="motherAlive"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    My mother is alive
                  </label>
                </div>
              </div>
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="m_nid"
                  id="m_nid"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      nid: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_nid"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  National ID Card Number
                </label>
              </div>
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="m_phone"
                  id="m_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Phone Number
                </label>
              </div>
            </div>
            {mother ? (
              <div className="relative col-span-2 z-0 w-full mb-6 group">
                <label htmlFor="m_occupation" className="sr-only">
                  Occupation
                </label>
                <select
                  id="m_occupation"
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      occupation: e.target.value,
                    }))
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option defaultValue>Occupation</option>
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="m_education"
                  id="m_education"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      occupation: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_education"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Education Level
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="m_income"
                  id="m_income"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) =>
                    setMotherInfo((prevState) => ({
                      ...prevState,
                      income: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="m_income"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Monthly Income
                </label>
              </div>
            </div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Legal Guardian
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex justify-center items-center">
                <div className="flex items-center h-5">
                  <input
                    id="legalFather"
                    aria-describedby="legalFather"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    checked={father ? true : false}
                    disabled={true}
                    onClick={(e) => {
                      motherAlive(e.target.checked);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="motherAlive"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Father
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex items-center h-5">
                  <input
                    id="legalMother"
                    aria-describedby="legalMother"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    checked={!father && mother ? true : false}
                    disabled={true}
                    onClick={(e) => {
                      motherAlive(e.target.checked);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="motherAlive"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Mother
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex items-center h-5">
                  <input
                    id="legalOther"
                    aria-describedby="legalOther"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                    checked={father || mother ? false : true}
                    disabled={true}
                    onClick={(e) => {
                      motherAlive(e.target.checked);
                    }}
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="motherAlive"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="legal_name_eng"
                  id="legal_name_eng"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={
                    father
                      ? fatherInfo.name_en
                      : !father && mother
                      ? motherInfo.name_en
                      : ""
                  }
                  disabled={father || mother ? true : false}
                />
                <label
                  htmlFor="legal_name_eng"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (English)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="legal_name_ban"
                  id="legal_name_ban"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={
                    father
                      ? fatherInfo.name_bn
                      : !father && mother
                      ? motherInfo.name_bn
                      : ""
                  }
                  disabled={father || mother ? true : false}
                />
                <label
                  htmlFor="legal_name_ban"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Name (Bangla)
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="legal_relation"
                  id="legal_relation"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={
                    father
                      ? fatherInfo.title
                      : !father && mother
                      ? motherInfo.title
                      : ""
                  }
                  disabled={father || mother ? true : false}
                />
                <label
                  htmlFor="legal_relation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Relation
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="legal_phone"
                  id="legal_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={
                    father
                      ? fatherInfo.phone
                      : !father && mother
                      ? motherInfo.phone
                      : ""
                  }
                  disabled={father || mother ? true : false}
                />
                <label
                  htmlFor="legal_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Phone Number
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <label htmlFor="legal_occupation" className="sr-only">
                  Occupation
                </label>
                <select
                  id="legal_occupation"
                  value={
                    father
                      ? fatherInfo.occupation
                      : !father && mother
                      ? motherInfo.occupation
                      : ""
                  }
                  disabled={father || mother ? true : false}
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option defaultValue>Occupation</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="number"
                  name="legal_income"
                  id="legal_income"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={
                    father
                      ? fatherInfo.income
                      : !father && mother
                      ? motherInfo.income
                      : ""
                  }
                  disabled={father || mother ? true : false}
                />
                <label
                  htmlFor="legal_income"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Monthly Income
                </label>
              </div>
            </div>
          </div>
        </form>
        <Modal
          title="Pick your date of birth"
          centered
          open={showCalendar}
          footer={null}
          onCancel={() => setShowCalendar(false)}
        >
          <div className="flex justify-center">
            <Calendar
              className={showCalendar ? "" : "hidden"}
              defaultValue={dateState}
              onChange={handleChange}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Information;
