/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Notice from "../components/Notice";
import "../index.css";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useGlobalState } from "../components/UserContext";
import api from "../api";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import header from "../resources/header.png";

const Home = () => {
  const { Panel } = Collapse;
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");
  const [notices, setNotices] = useState([]);

  const getNotice = () => {
    api
      .get("/notice.php", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setNotices(response.data);
      })
      .catch((err) => console.log(err));
  };

  const log = () => {
    console.log(user, isLoggedIn, jwt);
  };

  const notice = [
    {
      title: "Brochure for CSEDU MSc Admission",
      body: `This document outlines the graphical representation of eligibility criteria and admission procedure for the MS in Computer Science and Engineering degree at the University of Dhaka. The application period for the upcoming semester runs from March 31 to May 15, with the admission test taking place on June 3.`,
      link: "https://drive.google.com/file/d/1H6IFFaMp6hx4Plq0Rrt5Iz6vVlDblTTu/view?usp=sharing",
    },
    {
      title: "CSEDU Masters Registration",
      body: `This document outlines the eligibility criteria and admission procedure for the MS in Computer Science and Engineering degree at the University of Dhaka. The application period for the upcoming semester runs from March 31 to May 15, with the admission test taking place on June 3.`,
      link: "https://drive.google.com/file/d/1rVhMWqo9SgkzMW5XMG2RMDwWS6ucokrG/view?fbclid=IwAR1vf8qJptthJVNWCbZ_p7VkLKbxEw8EwiQGt4Qd8YpIKmfnM-KZcMLX_ZU",
    },
    {
      title: "Rules and Guidelines for MS in Engineering Program",
      body: `This document outlines the official rules and guidelines for MS program in Engineering faculty of University of Dhaka. The application period for the upcoming semester runs from March 31 to May 15, with the admission test taking place on June 3.`,
      link: "https://drive.google.com/file/d/13p8AFKoQkFMhmPI6rwQ5udw_Ly75mgJx/view?usp=share_link",
    },
  ];

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="bg-white relative dark:bg-gray-900 flex flex-col justify-center">
      <img
        src={header}
        className="mt-16 md:mt-28 md:w-1/2 mx-auto"
        alt="CSEDU Banner"
      />
      <Navbar active={"home"} />
      <div className="bg-white px-2 min-h-screen h-full dark:bg-gray-900">
        <div className="w-full md:w-3/5 md:mx-auto mt-8 md:mt-4">
          <Carousel />
        </div>
        {/* Notice */}
        <div className="w-full md:px-0 md:w-4/5 md:mx-auto mt-6 mb-10 md:mt-12 md:mb-20">
          <div className="text-xl md:text-3xl text-center dark:text-white mb-5">
            Notice
          </div>
          <div>
            {notice.map((notice, index) => {
              return <Notice key={index} notice={notice} />;
            })}
          </div>
        </div>

        {/* <div>
          <button onClick={log}>Log</button>
        </div> */}
        {/* FAQ */}
        <div className="w-full md:px-0 md:w-4/5 mx-auto mt-14 mb-20 md:mt-24 md:mb-20">
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
                First, you'll need to create a user account, verify your email
                and log in. Then, navigate to the profile section and fill in
                your exam informations. Once you've completed that section,
                you'll be prompted to provide additional personal and
                undergraduate information before submitting your profile. Then
                navigate to the Apply section and submit your application.
              </p>
            </Panel>
            <Panel
              header="What are the criteria for being eligible for admission?"
              key="2"
            >
              <p className="pl-6">
                <b>1. Secondary & Higher Secondary: </b> In order to be eligible
                to apply for MSc admission, applicants must satisfy the
                requirements for both secondary/equivalent and higher
                secondary/equivalent levels for undergraduate admission in Dhaka
                University and related faculty.
                <br />
                <br />
                <b>2. Title of Bachelor's or Equivalent Degree:</b> Applicants
                must complete a 4-years Bachelor's degree in one of the
                following disciplines from any recognized university:
                CSE/CS/CE/IT/EEE/ECE/ETE/SE/Mathematics/Statistics/Physics.
                Applicants who have not yet completed the degree but will be
                able to do so before the admission deadline are also eligible to
                apply. <br />
                <br />
                <b>3. CGPA:</b> Applicants must obtain a minimum CGPA 3.25 out
                of 4.0 in the Bachelor's or equivalent degree.
                <br />
                <br />
                <b>4. Foreign Degree:</b> Bangladeshi nationals having foreign
                degree in the above-mentioned subjects must apply for an
                equivalence of their B.Sc. degree to Chairman, Department of
                Computer Science and Engineering, University of Dhaka.
              </p>
            </Panel>
            <Panel header="What is the admission test format?" key="3">
              <p className="pl-6">
                There are two phases in the admission test as detailed below.
                <br />
                <br />
                <b>
                  Phase 1: Basic subject knowledge and analytical ability test
                </b>
                <br />
                <br></br>Exam Duration: 120 Minutes
                <br />
                Total Marks: 150
                <br />
                There will be fifty (50) MCQ questions in the admission test,
                wherein each question has an equal weight of three (3). <br />
                <b>
                  In phase-1 test, topics generally cover the following subjects
                  :
                </b>
                Mathematics, Statistics, Theory of Computation, Computer
                Programming, Data Structures and Algorithms, Computer
                Architecture, Operating Systems, Computer Networks, Database
                Management Systems, Distributed Systems, Artificial Intelligence
                and Analytical Ability.
                <br />
                <br />
                <b>Qualifying Marks:</b> Applicants must obtain at least 40%
                marks to qualify for the next phase.
                <br />
                <br />
                <b>Phase 2: Communication Skill test Exam</b>
                <br />
                <br />
                Exam Duration: 30 minutes for writing and 15 minutes for
                interview
                <br />
                Total Marks: 25
                <br />
                Usually the top 200 students qualified in Phase-1 are invited
                for the second phase which is a communication skill test.
                Students will have to attend an interview and a writing ability
                test. They need to show their original academic documents here.
              </p>
            </Panel>
            <Panel
              header="Can I make changes to my profile after I've submitted
              it?"
              key="4"
            >
              <p className="pl-6">
                Once you've submitted your profile, you will not be able to make
                changes to it. However, if you need to update any information,
                you can contact our admission office to discuss your options.
              </p>
            </Panel>
            <Panel header="What is the application deadline?" key="5">
              <p className="pl-6">
                <b>Application Starts:</b> March 31, 2023
                <br />
                <b>Application Ends: </b>
                May 15, 2023
                <br />
                <br />
                <b>Other important dates:</b>
                <br />
                <b>Admit Card Publish:</b> From May 21, 2023
                <br />
                <b>Admission Test:</b> June 3, 2023
                <br />
                <b>Admission Test Result:</b> June 6, 2023
                <br />
                <b>Communication Skill Test:</b> June 10, 2023
                <br />
                <b>Final Result:</b> June 17, 2023
                <br />
                <b>Admission Start:</b> June 18, 2023
                <br />
                <b>Admission End:</b> June 21, 2023
                <br />
                <b>Class Start:</b> 1st week of July, 2023
                <br />
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
