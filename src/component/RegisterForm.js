import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select, Alert } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

//css
import '../css/component/RegisterForm.css'

//utils
import BaseUrl from '../utils/BaseUrl'

export default function RegisterForm() {

    const [branch, setBranch] = useState([])
    const [branchId, setBranchId] = useState(0)

    const [visible, setVisible] = useState(false);
    const handleClose = () => {
        setVisible(false);
    }

    const onBranchChange = value => {
        setBranchId(value)
    }
    const onFinish = values => {
        submitRegisterStaff(branchId, values.name, values.email, values.password)
    }
    const submitRegisterStaff = async (brachId, name, email, password) => {
        try {
            const response = await fetch(`${BaseUrl}/api/staff/register?branchId=${brachId}&name=${name}&email=${email}&password=${password}`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data)
            setVisible(true)
        } catch (error) {
            console.error(error);
        }
    }

    const getBranchId = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/branch/all`, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setBranch(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBranchId()
    }, [])

    return (
        <Form
            name="normal_login"
            className="register-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item>
                {visible ? (
                    <Alert message="Register Successfully" type="success" closable afterClose={handleClose} />
                ) : null}
            </Form.Item>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!'
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirm-password"
                rules={[
                    {
                        required: true,
                        message: 'Please input Confirm-password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                />
            </Form.Item>

            <Form.Item name="branch" label="Branch" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onBranchChange}
                    allowClear
                >
                    {branch.map(id => {
                        return (
                            <Select.Option value={id.branch_id}>{id.branch_id}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                    </Button>
                <p style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                    I have already Account!<Link style={{ marginLeft: '0.2vw' }} to="/login">Login</Link>
                </p>
            </Form.Item>
        </Form>
    )
}
