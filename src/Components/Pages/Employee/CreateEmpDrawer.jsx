// src/components/CustomDrawer.js

import React, { useState } from "react";
import { Drawer, Button, Form, Input, Row, Col, Select, Space } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
// import "../Projects/Projects.css";
import { createStyles } from "antd-style";

const { Option } = Select;
const useStyle = createStyles(({ token }) => ({
  "my-drawer-mask": {
    boxShadow: `inset 0 0 15px #fff`,
  },
  "my-drawer-content": {
    borderLeft: "2px dotted #333",
  },
}));

const CustomDrawer = ({ open, onClose }) => {
  const { styles } = useStyle();
  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [aliceName, setAliceName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Day");

  const handleSubmit = async () => {
    console.log("Backend API URL:", import.meta.env.VITE_BACKEND_API);
    try {
      console.log("hello22");

      await form.validateFields();
      console.log("hello");
      const payload = {
        name,
        aliceName,
        email,
        phone,
        password,
        type,
      };
      console.log("payload", payload);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/registeruser`,
        payload
      );

      console.log("res", res);
      toast.success(res.data, {});
      setName("");
      setAliceName("");
      setEmail("");
      setPhone("");
      setPassword("");
      onClose();
    } catch (error) {
      if (error.response) {
        toast.warning(error.response.data, {});
      } else {
        console.log("Validation failed:", error);
      }
    }
  };

  // antd Styling

  const classNames = {
    body: styles["my-drawer-body"],
    mask: styles["my-drawer-mask"],
    header: styles["my-drawer-header"],
    footer: styles["my-drawer-footer"],
    content: styles["my-drawer-content"],
  };

  const drawerStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
    content: {
      boxShadow: "-10px 0 10px #666",
    },
  };

  const emailValidator = (_, value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailPattern.test(value)) {
      return Promise.resolve();
    }
    toast.error("Please enter a valid email address.");
    return Promise.reject(new Error("Please enter a valid email address."));
  };

  const minLengthValidator = (minLength) => (_, value) => {
    if (!value || value.length >= minLength) {
      return Promise.resolve();
    }
    toast.error(`Minimum length should be ${minLength} characters.`);
    return Promise.reject(
      new Error(`Minimum length should be ${minLength} characters.`)
    );
  };

  return (
    <div className="drawerPage">
      <Drawer
        title="Create Employee Profile"
        width={650}
        onClose={onClose}
        open={open}
        classNames={classNames}
        styles={drawerStyles}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <div className="projectDrawer mt-3">
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  name="name"
                  label="Employee Name"
                  rules={[
                    {
                      required: true,
                      message: "Enter Employee Name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Employee Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="aliceName"
                  label="Alice Name"
                  rules={[
                    {
                      required: true,
                      message: "Enter Alice Name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Alice Name"
                    value={aliceName}
                    onChange={(e) => setAliceName(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={22}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Enter Email",
                    },
                    {
                      validator: emailValidator,
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Enter Phone",
                    },
                    {
                      validator: minLengthValidator(10),
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Enter Password",
                    },
                    {
                      validator: minLengthValidator(6),
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  name="type"
                  label="Employee Type"
                  rules={[
                    {
                      required: true,
                      message: "Choose Type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Type"
                    value={type}
                    onChange={(value) => setType(value)}
                  >
                    <Option value="Day">Day</Option>
                    <Option value="Night">Night</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Space className="text-center d-flex  my-4 gap-4">
              <Button
                onClick={handleSubmit}
                className="buttonFilled"
                type="primary"
              >
                Submit
              </Button>
              <Button className="buttonLine" type="button" onClick={onClose}>
                Cancel
              </Button>
            </Space>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
