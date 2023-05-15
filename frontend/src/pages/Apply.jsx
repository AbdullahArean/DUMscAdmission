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
import Footer from "../components/Footer";

const Apply = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useGlobalState("user");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const nav = useNavigate();

  const fetchData = () => {
    api.get("/department.php").then((res) => {
      setData(res.data);
      setStartDate(new Date(`${res.data[0].application_start.slice(0, 9)}`));
      setEndDate(new Date(`${res.data[0].application_end.slice(0, 9)}`));
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

  let today = new Date();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white relative min-h-screen h-full dark:bg-gray-900 flex flex-col">
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
      <div className="mt-20 lg:mt-24 mx-2 lg:mx-10 relative">
        <Table
          loading={loading}
          dataSource={data}
          rowKey="id"
          style={{ overflowX: "auto" }}
        >
          <Column title="Department" dataIndex="name"></Column>
          <Column
            title="Start Date"
            dataIndex="application_start"
            render={(approved, record) => (
              <div>{record.application_start.slice(0, 9)}</div>
            )}
          ></Column>
          <Column
            title="End Date"
            dataIndex="application_end"
            render={(approved, record) => (
              <div>{record.application_end.slice(0, 9)}</div>
            )}
          ></Column>
          <Column title="Fee (BDT)" dataIndex="fee"></Column>
          <Column
            title=""
            dataIndex="dept_id"
            render={(applied, record) => (
              <Space size="middle">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedDept(record.id);
                    setSelectedNotice(record.notice);
                  }}
                  disabled={
                    today > startDate && today <= endDate ? false : true
                  }
                  className={
                    today > startDate && today <= endDate
                      ? "hover:underline text-white bg-blue-500 px-4 py-1 rounded-lg font-medium"
                      : "text-white bg-black px-4 py-1 rounded-lg font-medium"
                  }
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
          <div className="whitespace-pre-wrap">
            {selectedNotice.replace("\\n", <br />)}
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
      <Footer />
    </div>
  );
};

export default Apply;
