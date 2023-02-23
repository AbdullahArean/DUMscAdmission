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
  const data = [
    {
      dept_name: "Computer Science and Engineering",
      end_date: "10/6/23",
      applied: false,
    },
  ];
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
          <Column title="Department" dataIndex="dept_name"></Column>
          <Column title="End Date" dataIndex="end_date"></Column>
          <Column
            title=""
            dataIndex="applied"
            render={(applied, record) => (
              <Space size="middle">
                {applied === false ? (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    className="hover:underline text-white bg-blue-500 px-4 py-1 rounded-lg font-medium"
                  >
                    Apply
                  </button>
                ) : (
                  <div className="flex gap-1 items-center">
                    <FcOk />
                    <p>Applied</p>
                  </div>
                )}
              </Space>
            )}
          ></Column>
        </Table>
        <Modal
          title="Application requirements"
          centered
          open={modalOpen}
          okText="Confirm"
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        >
          <p>Minimum CGPA should be 3.25</p>
        </Modal>
      </div>
    </div>
  );
};

export default Apply;
