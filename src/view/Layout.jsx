import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Home from '@/view/Home.jsx'
import Routes from '@/router/index'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Layouts(props) {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);


  useEffect(() => {
    form.setFieldsValue({
      username: 'Bamboo',
    });
  }, []);

  const getInput = () => {
    setCount(count + 1)
    // console.log(form.getFieldsValue('username'), form.getFieldsValue());
  }

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  
  return (
    <Router>
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to="/home">nav 2</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Route exact path="/home" component={Home} />
        </Content>
      </Layout>
    </Layout>
  </Router>
  );
}

export default Layouts
