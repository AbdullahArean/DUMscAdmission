/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const Apply = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  const nav = useNavigate();

  const fetchData = () => {
    api.get("/department.php").then((res) => {
      setData(res.data);
    });
  };

  const apply = () => {
    let dataToPost = new FormData();

    dataToPost.set("dept_id", selectedDept);
    api
      .post("/applications.php", dataToPost, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setModal2Open(false);
        toast.success("Application Successful");
        nav("/submission", { state: "applied" });
      })
      .catch((err) => {
        console.log(err);
        setModal2Open(false);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen h-full dark:bg-gray-900 flex flex-col">
      <Navbar />
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
      <div className="mt-24 mx-10 relative overflow-x-auto">
        <Table
          loading={loading}
          dataSource={data}
          style={{ overflowX: "auto" }}
        >
          <Column title="Department" dataIndex="name"></Column>
          <Column title="End Date" dataIndex="application_end"></Column>
          <Column
            title=""
            dataIndex="dept_id"
            render={(applied, record) => (
              <Space size="middle">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedDept(record.id);
                  }}
                  className="hover:underline text-white bg-blue-500 px-4 py-1 rounded-lg font-medium"
                >
                  Apply
                </button>
              </Space>
            )}
          ></Column>
        </Table>
        <Modal
          title="Application requirements"
          centered
          open={modalOpen}
          okText={"Apply"}
          cancelText={"Close"}
          onOk={() => {
            if (document.getElementById("agreement").checked) {
              setModal2Open(true);
              setModalOpen(false);
            } else {
              toast.error("Requirements must be accepted");
            }
          }}
          onCancel={() => setModalOpen(false)}
        >
          <div>
            <b>Dhaka University Masters Admission Circular 2023-2024 Program</b>
            <br />
            Computer Science and Engineering (CSE)
            <br />
            Admission Requirements:
            <br />
            Candidates must have a four-year Bachelors degree in Computer
            Science and Engineering (CSE) or a related field from a recognized
            university.
            <br />
            Candidates must have a minimum GPA of 3.00 (out of 4.00) or a First
            Class/Division in their Bachelors degree.
            <br />
            Candidates must pass the admission test with a minimum qualifying
            score. <br /> <br />
            Bachelors Degree Requirements: To be eligible for admission to the
            CSE Masters program, candidates must have completed a Bachelors
            degree in one of the following fields:
            <br />
            Computer Science and Engineering Computer Science Information
            Technology Electrical and Electronic Engineering (EEE) with a major
            or concentration in Computer Science Telecommunication Engineering
            with a major or concentration in Computer Science Mathematics,
            Physics or any other relevant field with a strong background in
            Computer Science and Mathematics.
            <br />
            <br />
            Application Procedure: Interested candidates can apply online
            through the Dhaka University website (www.du.ac.bd) during the
            application period.
            <br />
            The application form must be filled out completely and accurately,
            and all required documents must be submitted with the application.
            <br />
            The application fee can be paid online or in person at the
            designated bank branches.
            <br />
            <br />
            Important Dates: Application Deadline: March 31, 2023 Admission
            Test: May 14, 2023 For more information and detailed instructions,
            please refer to the official admission circular on the Dhaka
            University website.
          </div>
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="agreement"
                aria-describedby="agreement"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-0 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreement" className="font-light text-black">
                I have read and accepted the requirements and declare that the
                information I provided is true and correct. I also understand
                that any willful dishonesty may render for refusal of this
                application
              </label>
            </div>
          </div>
        </Modal>
        <Modal
          title="Confirmation"
          centered
          open={modal2Open}
          okText="Confirm"
          onOk={() => apply()}
          onCancel={() => setModal2Open(false)}
        >
          <div>Are you sure you want to apply?</div>
        </Modal>
      </div>
    </div>
  );
};

export default Apply;
