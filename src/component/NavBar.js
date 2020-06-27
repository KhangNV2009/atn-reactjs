import React, { useState, useEffect } from 'react';

import { Menu, Affix } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

import '../css/component/NavBar.css'

export default function NavBar(props) {

  const [current, setCurrent] = useState("home");
  const [staffInfo, setStaffInfo] = useState(null)

  useEffect(() => {
    const staff = localStorage.getItem("staffInfo")
    const json = JSON.parse(staff)
    setStaffInfo(json)
  }, [])

  const handleClick = e => {
    setCurrent(e.key)
  }

  const onLogOut = () => {
    setStaffInfo(null)
    localStorage.clear()
  }

  const isLogin = (staffInfo) => {
    if (staffInfo !== null) {
      return (
        <Menu.SubMenu icon={<UserOutlined />} style={{ float: "right" }} title={staffInfo.staff_name}>
          <Menu.Item key="logOut" onClick={onLogOut}>Log Out</Menu.Item>
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item style={{ float: 'right' }} key="register"><Link to="/register">Register</Link></Menu.Item>
      )
    }
  }

  const showLogin = (staffInfo) => {
    if (staffInfo == null) {
      return (
        <Menu.Item style={{ float: 'right' }} key="login"><Link to="/login">Login</Link></Menu.Item>
      )
    }
  }

  const showAddProduct = (staffInfo) => {
    if (staffInfo !== null) {
      return (
        <Menu.Item key="add-product"><Link to="/add-product">Add Product</Link></Menu.Item>
      )
    }
  }

  const showOrder = (staffInfo) => {
    if (staffInfo !== null) {
      return (
        <Menu.Item key="order"><Link to="/order">Order</Link></Menu.Item>
      )
    }
  }

  const showOrderDetail = (staffInfo) => {
    if (staffInfo !== null) {
      return (
        <Menu.Item key="detail"><Link to="/add-order">Create Order</Link></Menu.Item>
      )
    }
  }

  return (
    <Affix>
      <Menu
        onClick={handleClick}
        selectedKeys={current}
        mode="horizontal"
        style={{ zIndex: 5 }}
        className="shadow-sm"
      >
        <Menu.Item
          disabled={true}
          key="ATNlogo">
          <img src={require('../assets/logo/ATNlogo.png')} className="logo" alt="ant logo" />
        </Menu.Item>

        <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>

        {showAddProduct(staffInfo)}

        {showOrder(staffInfo)}

        {showOrderDetail(staffInfo)}

        {isLogin(staffInfo)}

        {showLogin(staffInfo)}

      </Menu>
    </Affix>
  )
}