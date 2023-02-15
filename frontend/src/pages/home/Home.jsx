import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import { RiArrowDownSLine } from "react-icons/ri";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);
  const [isOpen5, setOpen5] = useState(false);

  const notice = [
    {
      title: "Payment Deadline Approaching",
      body: `If you have not yet submitted your payment, please do so as soon as possible to secure yourspot in our program. Any payments received after the deadline may result in a delay in processing your application.`,
      notice_file: "https://www.africau.edu/images/default/sample.pdf",
      type: "error",
      created_by: "Admin",
      created_on: "02/02/23",
    },
    {
      title: "Plagiarism Will Not Be Tolerated",
      body: `All applications are subject
      to thorough plagiarism checks, and any applicant found to have
      plagiarized will be immediately disqualified from
      consideration.`,
      notice_file: "https://www.africau.edu/images/default/sample.pdf",
      type: "warning",
      created_by: "Admin",
      created_on: "02/02/23",
    },
    {
      title: "Technical Issues Resolved",
      body: `We apologize for any inconvenience
      caused by the technical issues on our website earlier this
      week. The issues have now been resolved, and all users should
      be able to access the site without any problems.`,
      notice_file: "https://www.africau.edu/images/default/sample.pdf",
      type: "success",
      created_by: "Admin",
      created_on: "02/02/23",
    },
  ];

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  const handleDropDown2 = () => {
    setOpen2(!isOpen2);
  };
  const handleDropDown3 = () => {
    setOpen3(!isOpen3);
  };

  const handleDropDown4 = () => {
    setOpen4(!isOpen4);
  };
  const handleDropDown5 = () => {
    setOpen5(!isOpen5);
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col justify-center">
      <Navbar active={"home"} />
      <div className="bg-white h-full dark:bg-gray-900">
        <div className="w-full px-2 md:px-0 md:w-4/5 text-gray-200 md:mx-auto mt-20 mb-10 md:mt-32 md:mb-20">
          <div className="text-xl md:text-3xl text-center dark:text-white mb-5">
            Notice
          </div>
          <div>
            {notice.map((notice, index) => {
              return <Notice key={index} notice={notice} />;
            })}
          </div>
        </div>
        {/* FAQ */}
        <div className="w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
          <div className="text-xl mb-4 md:text-3xl text-center dark:text-white">
            Frequently Asked Questions
          </div>
          <div>
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  onClick={handleDropDown}
                >
                  <span>
                    How do I apply for admission through this website?
                  </span>
                  <RiArrowDownSLine
                    className={`text-2xl ${
                      isOpen === true
                        ? "rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  />
                </button>
              </h2>
              <div className={`${isOpen ? "block" : "hidden"}`}>
                <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    First, you'll need to create a user account and log in.
                    Then, navigate to the admission application section and fill
                    in your exam information. Once you've completed that
                    section, you'll be prompted to provide additional
                    information before submitting your application.
                  </p>
                </div>
              </div>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  onClick={handleDropDown2}
                >
                  <span>
                    What types of payment are accepted for admission fees?
                  </span>
                  <RiArrowDownSLine
                    className={`text-2xl ${
                      isOpen === true
                        ? "rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  />
                </button>
              </h2>
              <div className={`${isOpen2 ? "block" : "hidden"}`}>
                <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Our website accepts credit and debit cards for payment of
                    admission fees.
                  </p>
                </div>
              </div>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  onClick={handleDropDown3}
                >
                  <span>
                    How do I know if my application has been accepted?
                  </span>
                  <RiArrowDownSLine
                    className={`text-2xl ${
                      isOpen === true
                        ? "rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  />
                </button>
              </h2>
              <div className={`${isOpen3 ? "block" : "hidden"}`}>
                <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    You will receive a notification via email once your
                    application has been processed. You can also log in to your
                    account to check the status of your application.
                  </p>
                </div>
              </div>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  onClick={handleDropDown4}
                >
                  <span>
                    Can I make changes to my application after I've submitted
                    it?
                  </span>
                  <RiArrowDownSLine
                    className={`text-2xl ${
                      isOpen === true
                        ? "rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  />
                </button>
              </h2>
              <div className={`${isOpen4 ? "block" : "hidden"}`}>
                <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Once you've submitted your application, you will not be able
                    to make changes to it. However, if you need to update any
                    information, you can contact our admissions office to
                    discuss your options.
                  </p>
                </div>
              </div>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  onClick={handleDropDown5}
                >
                  <span>How do I view notices and FAQs on the website?</span>
                  <RiArrowDownSLine
                    className={`text-2xl ${
                      isOpen === true
                        ? "rotate-180 duration-300 transition-all"
                        : ""
                    }`}
                  />
                </button>
              </h2>
              <div className={`${isOpen5 ? "block" : "hidden"}`}>
                <div className="py-5 font-light border-b border-gray-200 dark:border-gray-700">
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Notices and FAQs can be found in the home section of the
                    website. Simply log in to your account and navigate to the
                    home page to view any current announcements or FAQs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
