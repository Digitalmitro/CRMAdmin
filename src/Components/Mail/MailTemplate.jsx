import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Row, Col, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";

const MailForm = () => {
  const [form] = Form.useForm();
  const [mailData, setMailData] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BasicWebMailIntro: "",
    BasicWebMailMainBody: "",
    BasicWebMailList: "",
    BasicWebMailConclude: "",
    BasicWebMailLink: [""],
    DmMailIntro: "",
    DmMailMainBody: "",
    DmMailList: "",
    DmMailConclude: "",
    DmMailLink: [""],
    EcomMailIntro: "",
    EcomMailMainBody: "",
    EcmoMailList: "",
    EcomMailConclude: "",
    EcomMailLink: [""],
    SeoMailIntro: "",
    SeoMailMainBody: "",
    SeoMailList: "",
    SeoMailConclude: "",
    SeoMailLink: [""],
    SmoMailIntro: "",
    SmoMailMainBody: "",
    SmoMailList: "",
    SmoMailConclude: "",
    SmoMailLink: [""],
    user_id: "", // You should get the user_id from your authentication system
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, fieldName, index) => {
    const { value } = e.target;
    const newArray = [...formData[fieldName]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [fieldName]: newArray,
    });
  };
  const handleSubmit = async (e) => {
    const payload = {};
    // Add fields to payload only if they exist in formData
    formData.BasicWebMailIntro &&
      (payload.BasicWebMailIntro = formData.BasicWebMailIntro);
    formData.BasicWebMailMainBody &&
      (payload.BasicWebMailMainBody = formData.BasicWebMailMainBody);
    formData.BasicWebMailList &&
      (payload.BasicWebMailList = formData.BasicWebMailList);
    formData.BasicWebMailConclude &&
      (payload.BasicWebMailConclude = formData.BasicWebMailConclude);
    formData.BasicWebMailLink?.length &&
      (payload.BasicWebMailLink = formData.BasicWebMailLink);

    formData.DmMailIntro && (payload.DmMailIntro = formData.DmMailIntro);
    formData.DmMailMainBody &&
      (payload.DmMailMainBody = formData.DmMailMainBody);
    formData.DmMailList && (payload.DmMailList = formData.DmMailList);
    formData.DmMailConclude &&
      (payload.DmMailConclude = formData.DmMailConclude);
    formData.DmMailLink?.length && (payload.DmMailLink = formData.DmMailLink);

    formData.EcomMailIntro && (payload.EcomMailIntro = formData.EcomMailIntro);
    formData.EcomMailMainBody &&
      (payload.EcomMailMainBody = formData.EcomMailMainBody);
    formData.EcmoMailList && (payload.EcmoMailList = formData.EcmoMailList);
    formData.EcomMailConclude &&
      (payload.EcomMailConclude = formData.EcomMailConclude);
    formData.EcomMailLink?.length &&
      (payload.EcomMailLink = formData.EcomMailLink);

    formData.SeoMailIntro && (payload.SeoMailIntro = formData.SeoMailIntro);
    formData.SeoMailMainBody &&
      (payload.SeoMailMainBody = formData.SeoMailMainBody);
    formData.SeoMailList && (payload.SeoMailList = formData.SeoMailList);
    formData.SeoMailConclude &&
      (payload.SeoMailConclude = formData.SeoMailConclude);
    formData.SeoMailLink?.length &&
      (payload.SeoMailLink = formData.SeoMailLink);

    formData.SmoMailIntro && (payload.SmoMailIntro = formData.SmoMailIntro);
    formData.SmoMailMainBody &&
      (payload.SmoMailMainBody = formData.SmoMailMainBody);
    formData.SmoMailList && (payload.SmoMailList = formData.SmoMailList);
    formData.SmoMailConclude &&
      (payload.SmoMailConclude = formData.SmoMailConclude);
    formData.SmoMailLink?.length &&
      (payload.SmoMailLink = formData.SmoMailLink);

    formData.user_id && (payload.user_id = formData.user_id);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/mailData`,
        payload
      );
      console.log("Mail data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting mail data:", error);
    }

    console.log(formData);
  };

  const handleGetMailData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/mailData`
      );
      console.log("Mail data get successfully:", response.data);
      console.log("response", response);
      setMailData(mailData);
    } catch (error) {
      console.error("Error submitting mail data:", error);
    }
  };

  useEffect(() => {
    handleGetMailData();
  }, []);

  return (
    <>
      <div className="mb-5 p-3">
        <div
          className="d-flex"
          style={{
            gap: "2rem",
            justifyContent: "flex-start",
          }}
        >
          <button
            className="btn btn-success"
            onClick={() => navigate("/seoMail")}
          >
            Seo Proposal
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/smoMail")}
          >
            Smo Proposal
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/dmMail")}
          >
            Digital Marketing Proposal
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/basicwebMail")}
          >
            Basic Website Proposal
          </button>
          <button
            className="btn btn-success"
            onClick={() => navigate("/ecomMail")}
          >
            E-commerce Proposal
          </button>
        </div>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <h3>Basic Website Mail</h3>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="BasicWebMailIntro"
              label="Basic Web Mail Intro"
              rules={[
                {
                  message: "Enter Basic Web Mail Intro",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Basic Web Mail Intro"
                value={formData.BasicWebMailIntro}
                onChange={handleChange}
                name="BasicWebMailIntro"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="BasicWebMailMainBody"
              label="Basic Web Mail Main Body"
              rules={[
                {
                  message: "Enter Basic Web Mail Main Body",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Basic Web Mail Main Body"
                value={formData.BasicWebMailMainBody}
                onChange={handleChange}
                name="BasicWebMailMainBody"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="BasicWebMailList"
              label="Basic Web Mail List"
              rules={[
                {
                  message: "Enter Basic Web Mail List",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Basic Web Mail List"
                value={formData.BasicWebMailList}
                onChange={handleChange}
                name="BasicWebMailList"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="BasicWebMailConclude"
              label="Basic Web Mail Conclude"
              rules={[
                {
                  message: "Enter Basic Web Mail Conclude",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Basic Web Mail Conclude"
                value={formData.BasicWebMailConclude}
                onChange={handleChange}
                name="BasicWebMailConclude"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="Basic Web Mail Links">
              {formData.BasicWebMailLink.map((link, index) => (
                <Input.TextArea
                  key={index}
                  value={link}
                  onChange={(e) =>
                    handleArrayChange(e, "BasicWebMailLink", index)
                  }
                  placeholder="Enter Link"
                  name={`BasicWebMailLink_${index}`}
                  style={{ marginBottom: "8px" }}
                />
              ))}
            </Form.Item>
          </Col>
        </Row>

        <h3>Add Digital Marketing Mail Fields</h3>
        {/* DmMail fields */}
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="DmMailIntro"
              label="DM Mail Intro"
              rules={[
                {
                  message: "Enter DM Mail Intro",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter DM Mail Intro"
                value={formData.DmMailIntro}
                onChange={handleChange}
                name="DmMailIntro"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="DmMailMainBody"
              label="DM Mail Main Body"
              rules={[
                {
                  message: "Enter DM Mail Main Body",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter DM Mail Main Body"
                value={formData.DmMailMainBody}
                onChange={handleChange}
                name="DmMailMainBody"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="DmMailList"
              label="DM Mail List"
              rules={[
                {
                  message: "Enter DM Mail List",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter DM Mail List"
                value={formData.DmMailList}
                onChange={handleChange}
                name="DmMailList"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="DmMailConclude"
              label="DM Mail Conclude"
              rules={[
                {
                  message: "Enter DM Mail Conclude",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter DM Mail Conclude"
                value={formData.DmMailConclude}
                onChange={handleChange}
                name="DmMailConclude"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="DM Mail Links">
              {formData.DmMailLink.map((link, index) => (
                <Input.TextArea
                  key={index}
                  value={link}
                  onChange={(e) => handleArrayChange(e, "DmMailLink", index)}
                  placeholder="Enter Link"
                  name={`DmMailLink_${index}`}
                  style={{ marginBottom: "8px" }}
                />
              ))}
            </Form.Item>
          </Col>
        </Row>

        <h3>Add Ecommerce Mail Fields</h3>
        {/* EcomMail fields */}
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="EcomMailIntro"
              label="Ecom Mail Intro"
              rules={[
                {
                  message: "Enter Ecom Mail Intro",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Ecom Mail Intro"
                value={formData.EcomMailIntro}
                onChange={handleChange}
                name="EcomMailIntro"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="EcomMailMainBody"
              label="Ecom Mail Main Body"
              rules={[
                {
                  message: "Enter Ecom Mail Main Body",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Ecom Mail Main Body"
                value={formData.EcomMailMainBody}
                onChange={handleChange}
                name="EcomMailMainBody"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="EcomMailList"
              label="Ecom Mail List"
              rules={[
                {
                  message: "Enter Ecom Mail List",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Ecom Mail List"
                value={formData.EcomMailList}
                onChange={handleChange}
                name="EcomMailList"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="EcomMailConclude"
              label="Ecom Mail Conclude"
              rules={[
                {
                  message: "Enter Ecom Mail Conclude",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Ecom Mail Conclude"
                value={formData.EcomMailConclude}
                onChange={handleChange}
                name="EcomMailConclude"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="Ecom Mail Links">
              {formData.EcomMailLink.map((link, index) => (
                <Input.TextArea
                  key={index}
                  value={link}
                  onChange={(e) => handleArrayChange(e, "EcomMailLink", index)}
                  placeholder="Enter Link"
                  name={`EcomMailLink_${index}`}
                  style={{ marginBottom: "8px" }}
                />
              ))}
            </Form.Item>
          </Col>
        </Row>

        <h3>Add Seo Mail Fields</h3>
        {/* SeoMail fields */}
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="SeoMailIntro"
              label="SEO Mail Intro"
              rules={[
                {
                  message: "Enter SEO Mail Intro",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SEO Mail Intro"
                value={formData.SeoMailIntro}
                onChange={handleChange}
                name="SeoMailIntro"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="SeoMailMainBody"
              label="SEO Mail Main Body"
              rules={[
                {
                  message: "Enter SEO Mail Main Body",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SEO Mail Main Body"
                value={formData.SeoMailMainBody}
                onChange={handleChange}
                name="SeoMailMainBody"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="SeoMailList"
              label="SEO Mail List"
              rules={[
                {
                  message: "Enter SEO Mail List",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SEO Mail List"
                value={formData.SeoMailList}
                onChange={handleChange}
                name="SeoMailList"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="SeoMailConclude"
              label="SEO Mail Conclude"
              rules={[
                {
                  message: "Enter SEO Mail Conclude",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SEO Mail Conclude"
                value={formData.SeoMailConclude}
                onChange={handleChange}
                name="SeoMailConclude"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="SEO Mail Links">
              {formData.SeoMailLink.map((link, index) => (
                <Input.TextArea
                  key={index}
                  value={link}
                  onChange={(e) => handleArrayChange(e, "SeoMailLink", index)}
                  placeholder="Enter Link"
                  name={`SeoMailLink_${index}`}
                  style={{ marginBottom: "8px" }}
                />
              ))}
            </Form.Item>
          </Col>
        </Row>

        <h3>Add SMO Mail Fields</h3>
        {/* SmoMail fields */}
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="SmoMailIntro"
              label="SMO Mail Intro"
              rules={[
                {
                  message: "Enter SMO Mail Intro",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SMO Mail Intro"
                value={formData.SmoMailIntro}
                onChange={handleChange}
                name="SmoMailIntro"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="SmoMailMainBody"
              label="SMO Mail Main Body"
              rules={[
                {
                  message: "Enter SMO Mail Main Body",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SMO Mail Main Body"
                value={formData.SmoMailMainBody}
                onChange={handleChange}
                name="SmoMailMainBody"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="SmoMailList"
              label="SMO Mail List"
              rules={[
                {
                  message: "Enter SMO Mail List",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SMO Mail List"
                value={formData.SmoMailList}
                onChange={handleChange}
                name="SmoMailList"
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="SmoMailConclude"
              label="SMO Mail Conclude"
              rules={[
                {
                  message: "Enter SMO Mail Conclude",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter SMO Mail Conclude"
                value={formData.SmoMailConclude}
                onChange={handleChange}
                name="SmoMailConclude"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="SMO Mail Links">
              {formData.SmoMailLink.map((link, index) => (
                <Input.TextArea
                  key={index}
                  value={link}
                  onChange={(e) => handleArrayChange(e, "SmoMailLink", index)}
                  placeholder="Enter Link"
                  name={`SmoMailLink_${index}`}
                  style={{ marginBottom: "8px" }}
                />
              ))}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={10} className="text-center">
            <Button className="buttonFilled" type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MailForm;
