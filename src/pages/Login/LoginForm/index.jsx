import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "@/redux/actions/login";

import "./index.less";

const { TabPane } = Tabs;

@withRouter
@connect(null, {
  login,
})
class LoginForm extends Component {
  onFinish = ({ username, password }) => {
    this.props.login(username, password).then((token) => {
      // 登录成功
      // console.log("登陆成功~");
      // 持久存储token
      localStorage.setItem("user_token", token);
      this.props.history.replace("/");
    });
    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  };

  render() {
    return (
      <>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Tabs
            defaultActiveKey="user"
            tabBarStyle={{ display: "flex", justifyContent: "center" }}
          >
            <TabPane tab="账户登录" key="user">
              <Form.Item name="username">
                <Input
                  prefix={<UserOutlined className="form-icon" />}
                  placeholder="用户名：admin"
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="form-icon" />}
                  type="password"
                  placeholder="密码: 111111"
                />
              </Form.Item>
            </TabPane>
            <TabPane tab="手机登录" key="phone">
              <Form.Item name="phone">
                <Input
                  prefix={<MobileOutlined className="form-icon" />}
                  placeholder="手机号"
                />
              </Form.Item>

              <Row justify="space-between">
                <Col span={16}>
                  <Form.Item name="verify">
                    <Input
                      prefix={<MailOutlined className="form-icon" />}
                      placeholder="验证码"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Button className="verify-btn">获取验证码</Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col>
                <span>
                  第三方账号登录：
                  <GithubOutlined className="login-icon" />
                  <WechatOutlined className="login-icon" />
                  <QqOutlined className="login-icon" />
                </span>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default LoginForm;
