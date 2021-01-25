import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MailOutlined,
    AppstoreOutlined
  } from '@ant-design/icons';

// import './index.less'





const { SubMenu } = Menu
const rootSubmenuKeys = ['/order', '/commodity', '/distribution']

function Sider(props) {
    const { FreshRouters } = props
    console.log(887, props)
    const [collapsed, usrCollapsed] = useState(true)
    const [openKeys, setOpenKeys] = useState(rootSubmenuKeys)
    const [routerPath, setRouterPath] = useState('/')
    const [current, setCurrent] = useState('')

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
        } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    };
    useEffect ((porps) => {
        // console.log(1233, window.location.pathname)
        // setRouterPath(window.location.pathname)
        setCurrent(window.location.pathname)
    })

    const handleClick = e => {
        console.log('click ', e)
        setCurrent(e.key)
      }

    const sidebarTree = menuList => {
        let isValidArr = value => value && Array.isArray(value)
        let isValidArrChild = value =>
          value &&
          value.operationObjectives &&
          Array.isArray(value.operationObjectives) &&
          value.operationObjectives.length > 0
    
        function recursive(data) {
          return (
            isValidArr(data) &&
            data.map((item, index) => {
              if (item.children.length) {
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        {/* <Icon component={Icons[item.code]} /> */}
                        <span> {item.title}</span>
                      </span>
                    }
                  >
                    {recursive(item.children)}
                  </SubMenu>
                )
              }
              return (
                <Menu.Item key={item.path} >
                  {
                    <Link to={item.path}>{item.title}</Link>
                  }
                </Menu.Item>
              )
            })
          )
        }
        return recursive(menuList)
      }
    
  return (
    <div className="menu">
        <div className="toggle-wrap" type="primary" style={{color: '#2781FF', paddingLeft: '21px'}}>
        <Icon style={{color: '#2781FF'}} type={collapsed ? 'menu-unfold' : 'menu-fold'} />  {!collapsed && <span style={{marginLeft: '10px'}}>收起菜单</span>}
        </div>
        <Menu
            onClick={handleClick}
            style={{ width: collapsed ? 196 : 80 }}
            openKeys={openKeys}
            selectedKeys={[current]}
            // onOpenChange={onOpenChange}
            defaultOpenKeys={[current]}
            mode="inline"
            // inlineCollapsed={collapsed}
            >
           {
               sidebarTree(FreshRouters)
           }
           
        </Menu>
    </div>
  )
}

export default Sider
