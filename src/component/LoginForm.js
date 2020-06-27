import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { LockOutlined, MailOutlined } from '@ant-design/icons';

//css
import '../css/component/LoginForm.css'

//utils
import BaseUrl from '../utils/BaseUrl'

export default function LoginPage() {
    let history = useHistory();
    const onFinish = (values) => {
        submitStaffLogin(values.email, values.password)
    }

    const submitStaffLogin = async (email, password) => {
        try {
            const response = await fetch(`${BaseUrl}/api/staff/login?email=${email}&password=${password}`, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if(data[0] !== undefined) {
                localStorage.setItem("staffInfo", JSON.stringify(data[0]))
                let path = "/"
                history.push(path)
                window.location.reload(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                        type: 'email'
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
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link className="login-form-forgot">
                    Forgot password
                    </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                <p style={{ display: 'flex', justifyContent: 'center', marginTop: '2vh' }}>
                    Don't have an account?<Link style={{ marginLeft: '0.2vw' }} to="/login">Register</Link>
                </p>
            </Form.Item>
        </Form>
    )
}