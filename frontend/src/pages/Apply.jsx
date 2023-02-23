/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import axios from "axios";
import "../index.css";
import { IoWarning } from "react-icons/io";
import { FcOk, FcCancel } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useGlobalState } from "../components/UserContext";

const Apply = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  const [data, setData] = useState([]);

  const fetchData = () => {
    api.get("/department.php").then((res) => {
      setData(res.data);
    });
  };

  const apply = () => {
    setModal2Open(false);
    toast.success("Application Succesful");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white h-screen dark:bg-gray-900 flex flex-col">
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
            title="Notice"
            dataIndex="dept_id"
            render={(applied, record) => (
              <Space size="middle">
                <button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className="hover:underline text-white bg-blue-500 px-4 py-1 rounded-lg font-medium"
                >
                  View
                </button>
              </Space>
            )}
          ></Column>
          <Column
            title="Action"
            dataIndex="dept_id"
            render={(applied, record) => (
              <Space size="middle">
                <button
                  onClick={() => {
                    setModal2Open(true);
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
          cancelText={"Close"}
          onCancel={() => setModalOpen(false)}
        >
          <div>
            Dhaka University Masters Admission Circular 2023-2024 Program:
            Computer Science and Engineering (CSE) Admission Requirements:
            Candidates must have a four-year Bachelors degree in Computer
            Science and Engineering (CSE) or a related field from a recognized
            university. Candidates must have a minimum GPA of 3.00 (out of 4.00)
            or a First Class/Division in their Bachelors degree. Candidates must
            pass the admission test with a minimum qualifying score. Bachelors
            Degree Requirements: To be eligible for admission to the CSE Masters
            program, candidates must have completed a Bachelors degree in one of
            the following fields: Computer Science and Engineering Computer
            Science Information Technology Electrical and Electronic Engineering
            (EEE) with a major or concentration in Computer Science
            Telecommunication Engineering with a major or concentration in
            Computer Science Mathematics, Physics or any other relevant field
            with a strong background in Computer Science and Mathematics.
            Application Procedure: Interested candidates can apply online
            through the Dhaka University website (www.du.ac.bd) during the
            application period. The application form must be filled out
            completely and accurately, and all required documents must be
            submitted with the application. The application fee can be paid
            online or in person at the designated bank branches. Important
            Dates: Application Deadline: March 31, 2023 Admission Test: May 14,
            2023 For more information and detailed instructions, please refer to
            the official admission circular on the Dhaka University website.
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
          <div>Are you sure want to apply?</div>
        </Modal>
      </div>
    </div>
  );
};

export default Apply;
