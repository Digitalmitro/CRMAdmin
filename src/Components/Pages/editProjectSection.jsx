import React from 'react'

function editProjectSection() {
  return (
    <div>

<Modal
        title="Assign tasks"
        visible={modalIsOpen}
        onOk={handleSaveSubList}
        onCancel={() => setModalIsOpen(false)}
        style={{ height: "200px" }}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item>
                <Input
                  name="TaskName"
                  value={newSubList.TaskName}
                  onChange={handleChange}
                  placeholder="Enter Task Name"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Select
                  placeholder="Enter Assignee Name"
                  onChange={(value) => {
                    const selectedUser = userdata.find(
                      (user) => user._id === value
                    );
                    handleSelectChange({
                      name: selectedUser.name,
                      id: selectedUser._id,
                    });
                  }}
                  virtual={false}
                  dropdownStyle={{
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                  }}
                >
                  {userdata.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item>
                <Input
                  name="DeadLine"
                  type="date"
                  value={newSubList.DeadLine}
                  onChange={handleChange}
                  placeholder="DeadLine"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Input.TextArea
                  name="comments"
                  type="date"
                  value={newSubList.comments}
                  onChange={handleChange}
                  placeholder="Comments"
                />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item>
                <Select
                  placeholder="priority"
                  //   value={newSubList.AsigneeName}
                  onChange={handleSelectPriority}
                  virtual={false}
                  dropdownStyle={{
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                  }}
                >
                  <Option value="Urgent" style={{ color: "red" }}>
                    Urgent
                  </Option>
                  <Option value="High" style={{ color: "blue" }}>
                    High
                  </Option>
                  <Option value="normal" style={{ color: "#FFD700" }}>
                    normal
                  </Option>
                  <Option value="low" style={{ color: "green" }}>
                    low
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default editProjectSection