import React from 'react'
import { Layout } from 'antd';

//component
import LoginForm from '../component/LoginForm'

//css
import '../css/page/LoginPage.css'

export default function LoginPage() {
    return (
        <Layout>
            <Layout.Content>
                <div className="login-page-container">
                    <div className="login-page-form-container shadow">
                        <h1 style={{ marginBottom: '2vh' }} >Login</h1>
                        <LoginForm />
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
