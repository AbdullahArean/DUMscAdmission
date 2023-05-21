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
import { AiOutlineDownload } from "react-icons/ai";
import { Modal } from "antd";

const Home = () => {
  const { Panel } = Collapse;
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [jwt, setJwt] = useGlobalState("jwt");
  const [notices, setNotices] = useState([]);
  const [webinarModalOpen , setWebinarModalOpen] = useState(false);

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
      title: "Updated Timeline for CSEDU MSc Admission",
      body: "This documents states the extended & updated timeline for CSEDU MSc Admission.",
      link: "https://drive.google.com/file/d/1ELlcS_0JOCEWBB28NiSQ1ql0UdwNUXSt/view?usp=sharing",
      type: "warning"
    },
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
    // getNotice();
  }, []);

  return (
    <div className="bg-white relative dark:bg-gray-900 flex flex-col justify-center text-gray-800 dark:text-white">
      
      {/* Webinar */}
      <div
      className={`cursor-pointer mt-24 flex p-4 mb-4 border-t-4 dark:bg-gray-800 text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800`}
      role="alert"
      onClick={() => setWebinarModalOpen(true)}
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
            <div className="text-md md:text-lg">Webinar on 25th May 9.00 PM with Professor Md. Mamun Rashid</div>
            {/* <div>{notice.created_by}</div> */}
            {/* <div>{notice.created_on}</div> */}
          </div>
          
        </div>
        <a
          target="_blank"
          href={notice.link}
          className="font-semibold flex flex-col-reverse md:flex-row justify-center md:gap-x-2 items-center hover:underline no-underline"
        >
          <p className="text-xs md:text-md cursor-pointer">View Details</p>
        </a>
      </div>
    </div>

      {/* Hero Image */}

      <img
        src={header}
        className="mt-16 md:mt-8 md:w-1/2 mx-auto"
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
                June 5, 2023
                <br />
                <br />
                <b>Other important dates:</b>
                <br />
                <b>Admit Card Publish:</b> Within June 8, 2023
                <br />
                <b>Admission Test:</b> June 9, 2023, Friday, 11:00 AM.
                <br />
                <b>Admission Test Result:</b> June 10, 2023
                <br />
                <b>Communication Skill Test & Viva:</b> June 15, 2023, Thursday, 2:00 PM
                <br />
                <b>Final Result:</b> June 17, 2023
                <br />
                <b>Admission Start:</b> June 18, 2023
                <br />
                <b>Admission End:</b> June 21, 2023
                <br />
                <b>Class Start:</b> 2nd week of July, 2023
                <br />
              </p>
            </Panel>
            <Panel header="Warning about the maximum size of the files" key="6">
              <p className="pl-6">
                Please remember that the website determines the size of the
                files. If your file is larger than the maximum size allowed by
                the website, please reduce its size by compressing it before
                attempting to upload it again.
              </p>
            </Panel>
            <Panel
              header="Is there any age restriction for the applicants?"
              key="7"
            >
              <p className="pl-6">
                There is no age limit for entry to the MSc program. Only those
                who have finished their undergraduate program will be eligible
                to apply for the program, regardless of their age.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <Footer />

      <Modal
          title="Invitation to webinar"
          centered
          open={webinarModalOpen}
          onOk={() => setWebinarModalOpen(false)}
          onCancel={() => setWebinarModalOpen(false)}
          okText="Close"
          cancelButtonProps={{ style: { display: "none" } }}
        >

          <div>
            <p>
            Dear Students,  <br/>
              We (CSE, DU) are going to arrange a webinar on 25th May 9.00 PM in the following link. 
              Professor Md. Mamun Rashid is inviting you to a scheduled BdREN Zoom meeting.
              <br/>
              <br/>
              Topic: Webinar on MS Admission 2023  <br/>
              Time: May 25, 2023 09:00 PM Astana, Dhaka  <br/>  <br/>

              -- Join BdREN Zoom Meeting from Laptop or Mobile:  <br/>
              <a className="underline text-blue-300" href="https://bdren.zoom.us/j/69588484234?pwd=a1dWTG9TU0RKSy9BMmVoamtFWGg0QT09 "> https://bdren.zoom.us/j/69588484234?pwd=a1dWTG9TU0RKSy9BMmVoamtFWGg0QT09 </a>  <br/><br/>

              Meeting ID: 695 8848 4234   <br/>
              Password: 529036  <br/>

              The webinar will discuss the following aspects of the MS program in CSE, DU and finally answer the admission related questions.:  <br/>
 
              1. Admission Test Pattern  <br/>
              2. Admission Fees and Other Educational Expenses  <br/>
              3. Contemporary Opportunities in CSE  <br/>
              4. Why CSEDU should be your choice  <br/>
              5. Adaptability with the mainstream students  <br/>
              6. Scholarship Opportunities  <br/>  <br/>

              Apart from the above agenda students may discuss any other academic and admission related issues. Advanced questions and issues on the academic program and admission test are welcome in the following link.
            </p>
          </div>
        </Modal>



    </div>
  );
};

export default Home;
