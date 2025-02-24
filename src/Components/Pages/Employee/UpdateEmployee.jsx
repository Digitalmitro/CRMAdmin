import React, { useState, useEffect } from "react";
import { Drawer, Button, Form, Input, Row, Col, Select, Space } from "antd";
import { createStyles } from "antd-style";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  
  const adminToken = localStorage.getItem('token')
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null); 

  const initialValues = data ? {
    name: data.name,
    aliceName: data.aliceName,
    email: data.email,
    phone: data.phone,
    type: data.type,
    password: '' // Set password to empty
  } : {};


  const handleData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/auth/${id}`, {
          headers: { token: adminToken },
        }
      );
      setData(res?.data);
      console.log("dataaaaaa", res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      handleData();

    }, 500)
    return () => {
      clearTimeout(timeoutRef)
    }

  }, []);

  const handleUpdate = async (values) => {
    const payload = { user_id: id, ...values };
    // console.log('payload emp ', payload)
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/auth/${id}`, payload,
        {
          headers: { token: adminToken },
        }
      );
      toast.success(res.data, {});
      setTimeout(() => {
        navigate('/activity');
      }, 1500);
    } catch (error) {
      toast.warning(error?.response.data, {});
    }
  }

  return (
    <div className="">
     <ToastContainer />
      <div className='m-4'>
        <div className='my-4'>
          <h3><b>Update Employee</b></h3>
        </div>
        <div className='m-5'>
          {data && (
            <Form
              layout="vertical"
              hideRequiredMark
              initialValues={initialValues}
              onFinish={handleUpdate}
            >
              <Row gutter={16}>
                <Col span={11}>
                  <Form.Item
                    name="name"
                    label="Employee Name"
                    rules={[
                      { required: true, message: 'Enter Employee Name' },
                    ]}
                  >
                    <Input placeholder="Enter Employee Name" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="aliceName"
                    label="Alice Name"
                    rules={[
                      {  message: 'Enter Alice Name' },
                    ]}
                  >
                    <Input placeholder="Enter Alice Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={22}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Enter Email' },
                    ]}
                  >
                    <Input placeholder="Enter Email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={11}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      { required: true, message: 'Enter Phone' },
                    ]}
                  >
                    <Input placeholder="Enter Phone" />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: 'Enter Password' },
                    ]}
                  >
                    <Input placeholder="Enter Password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={11}>
                  <Form.Item
                    name="type"
                    label="Employee Type"
                    rules={[
                      { required: true, message: 'Choose Type' },
                    ]}
                  >
                    <Select placeholder="Select Type">
                      <Option value="Day">Day</Option>
                      <Option value="Night">Night</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Space className='text-center d-flex my-4 gap-4'>
                <Button className='buttonFilled' type="primary" htmlType="submit">
                  Update
                </Button>
                <Button className='buttonLine' onClick={() => navigate('/employeeactivity')}>
                  Cancel
                </Button>
              </Space>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
