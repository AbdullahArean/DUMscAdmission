/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Notice from "../components/Notice";
import "../index.css";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useGlobalState } from "../components/UserContext";

const Home = () => {
  const { Panel } = Collapse;
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");

  const notice = [
    {
      title: "Payment Deadline Approaching",
      body: `If you have not yet submitted your payment, please do so as soon as possible to secure yourspot in our program. Any payments received after the deadline may result in a delay in processing your application.`,
      notice_file: "https://www.africau.edu/images/default/sample.pdf",
      type: "",
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
      type: "",
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
      type: "",
      created_by: "Admin",
      created_on: "02/02/23",
    },
  ];

  const log = () => {
    console.log(user, isLoggedIn, jwt);
  };

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col justify-center">
      <Navbar active={"home"} />
      <div className="bg-white min-h-screen h-full dark:bg-gray-900">
        {/* Notice */}
        <div className="w-full px-2 md:px-0 md:w-4/5 md:mx-auto mt-20 mb-10 md:mt-32 md:mb-20">
          <div className="text-xl md:text-3xl text-center dark:text-white mb-5">
            Notice
          </div>
          <div>
            {notice.map((notice, index) => {
              return <Notice key={index} notice={notice} />;
            })}
          </div>
        </div>

        <div>
          <button onClick={log}>Log</button>
        </div>
        {/* FAQ */}
        <div className="w-full px-2 md:px-0 md:w-4/5 mx-auto mt-14 mb-10 md:mt-24 md:mb-20">
          <div className="text-xl mb-4 md:text-3xl text-center dark:text-white">
            Frequently Asked Questions
          </div>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Panel
              header="How do I apply for admission through this website?"
              key="1"
            >
              <p className="pl-6">
                First, you'll need to create a user account and log in. Then,
                navigate to the admission application section and fill in your
                exam information. Once you've completed that section, you'll be
                prompted to provide additional information before submitting
                your application.
              </p>
            </Panel>
            <Panel
              header="What types of payment are accepted for admission fees?"
              key="2"
            >
              <p className="pl-6">
                Our website accepts credit and debit cards for payment of
                admission fees.
              </p>
            </Panel>
            <Panel
              header="How do I know if my application has been accepted?"
              key="3"
            >
              <p className="pl-6">
                You will receive a notification via email once your application
                has been processed. You can also log in to your account to check
                the status of your application.
              </p>
            </Panel>
            <Panel
              header="Can I make changes to my application after I've submitted
              it?"
              key="4"
            >
              <p className="pl-6">
                Once you've submitted your application, you will not be able to
                make changes to it. However, if you need to update any
                information, you can contact our admissions office to discuss
                your options.
              </p>
            </Panel>
            <Panel
              header="How do I view notices and FAQs on the website?"
              key="5"
            >
              <p className="pl-6">
                Notices and FAQs can be found in the home section of the
                website. Simply log in to your account and navigate to the home
                page to view any current announcements or FAQs.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Home;
