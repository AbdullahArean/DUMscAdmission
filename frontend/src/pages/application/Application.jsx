import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Application = () => {
  const [page, setPage] = useState("1");
  const page1 = () => {
    setPage("1");
  };
  const page2 = () => {
    setPage("2");
  };
  const page3 = () => {
    setPage("3");
  };
  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col justify-center">
      <Navbar />

      {/*page 1 information*/}

      {page === "1" ? (
        <div className="bg-white h-screen dark:bg-gray-900">
          <form className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
            <div>
              <ul className="flex justify-evenly w-full">
                <li className="mr-2">
                  <button
                    onClick={() => page1()}
                    className={
                      page === "1"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Information
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => page2()}
                    className={
                      page === "2"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Preview
                  </button>
                </li>
                <li className="">
                  <button
                    onClick={() => page3()}
                    className={
                      page === "3"
                        ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                        : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                    }
                  >
                    Undergraduate
                  </button>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="md:flex md:justify-evenly">
                <div className="w-full mb-16 md:mb-0 md:mx-10">
                  <div className="text-black text-center md:text-start text-xl dark:text-white mb-8 my-8 md:ml-5">
                    SSC
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ssc_roll1"
                      id="ssc_roll1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="ssc_roll1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Roll No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ssc_board1"
                      id="ssc_board1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="ssc_board1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Board
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="ssc_year"
                      id="ssc_year"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="ssc_year"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Passing Year
                    </label>
                  </div>
                </div>
                <div></div>
                <div className="w-full md:mx-10">
                  <div className="text-black text-xl text-center md:text-start dark:text-white mb-8 my-8 md:ml-5">
                    HSC
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="hsc_roll1"
                      id="hsc_roll1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="hsc_roll1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Roll No.
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="hsc_board1"
                      id="hsc_board1"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="hsc_board1"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Board
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="hsc_year"
                      id="hsc_year"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="hsc_year"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                    >
                      Passing Year
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="flex justify-center mt-16">
                <button
                  type="button"
                  onClick={() => page2()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next Page
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

      {/*page 2 preview*/}

      {page === "2" ? (
        <form className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
          <ul className="flex justify-evenly w-full">
            <li className="mr-2">
              <button
                onClick={() => page1()}
                className={
                  page === "1"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Information
              </button>
            </li>
            <li className="">
              <button
                onClick={() => page2()}
                className={
                  page === "2"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Preview
              </button>
            </li>
            <li className="">
              <button
                onClick={() => page3()}
                className={
                  page === "3"
                    ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                    : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                }
              >
                Undergraduate
              </button>
            </li>
          </ul>
          <div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Personal Information
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="fullname"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Full Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="fname"
                id="fname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="fname"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Father's Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="mname"
                id="mname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="mname"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Mother's Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
              >
                Email address
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
                />
                <label
                  htmlFor="dob"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                >
                  Date of Birth
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Phone
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="pic"
                  id="pic"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="pic"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Picture (Passport Size)
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="sign"
                  id="sign"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="sign"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Signature
                </label>
              </div>
            </div>
            <div className="text-black dark:text-white mb-3 my-8 text-center text-xl">
              Educational Information
            </div>

            {/* SSC */}

            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
                SSC
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ssc_roll"
                    id="ssc_roll"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ssc_roll"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Roll No.
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ssc_board1"
                    id="ssc_board1"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ssc_board1"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Board
                  </label>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ssc_year1"
                    id="ssc_year1"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ssc_year1"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Passing Year
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ssc_result"
                    id="ssc_result"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ssc_result"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    GPA (Out of 5.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="ssc_transcript"
                  id="ssc_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="ssc_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
            </div>

            {/* HSC */}

            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
                HSC
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="hsc_roll"
                    id="hsc_roll"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="hsc_roll"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Roll No.
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="hsc_board"
                    id="hsc_board"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="hsc_board"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Board
                  </label>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="hsc_year"
                    id="hsc_year"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="hsc_year"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Passing Year
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="hsc_result"
                    id="hsc_result"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="hsc_result"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    GPA (Out of 5.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="hsc_transcript"
                  id="hsc_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="hsc_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-16">
              <button
                type="button"
                onClick={() => page3()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Next Page
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {/* Undergraduate */}
      {page === "3" ? (
        <div className="bg-white h-screen dark:bg-gray-900">
          <form className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
            <ul className="flex justify-evenly w-full">
              <li className="mr-2">
                <button
                  onClick={() => page1()}
                  className={
                    page === "1"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Information
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => setPage("2")}
                  className={
                    page === "2"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Preview
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => setPage("3")}
                  className={
                    page === "3"
                      ? "inline-block text-xs md:text-lg p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500  transition-all duration-200 ease-in-out"
                      : "inline-block text-xs md:text-lg p-4 border-b-2 border-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-300 border-gray-800 text-gray-800 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300  transition-all duration-200 ease-in-out"
                  }
                >
                  Undergraduate
                </button>
              </li>
            </ul>
            <div>
              <div className="text-black dark:text-white mb-3 my-8 ml-5">
                Undergraduate
              </div>
              <div className="md:grid md:grid-cols-3 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug_type"
                    id="ug_type"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ug_type"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Graduation Type
                  </label>
                </div>
                <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug-institution"
                    id="ug-institution"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ug-institution"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Institution
                  </label>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:gap-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug_subject"
                    id="ug_subject"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ug_subject"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Subject
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug_pass_year"
                    id="ug_pass_year"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ug_pass_year"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    Passing Year
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="ug_cgpa"
                    id="ug_cgpa"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="ug_cgpa"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                  >
                    CGPA (Out of 4.00)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="ug_transcript"
                  id="ug_transcript"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="ug_transcript"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:-translate-y-7"
                >
                  Transcript
                </label>
              </div>
              <div className="flex justify-center mt-16">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg w-full sm:w-auto px-5 py-2.5 md:px-10 md:py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Application;
