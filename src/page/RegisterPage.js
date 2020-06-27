import React from 'react'
import { Layout } from 'antd';

//component
import RegisterForm from '../component/RegisterForm'

//css
import '../css/page/RegisterPage.css'

export default function RegisterPage() {
    return (
        <Layout>
            <Layout.Content>
                <div className="register-page-container">
                    <div className="register-page-form-container shadow">
                        <h1 style={{ marginBottom: '2vh' }} >Register</h1>
                        <RegisterForm />
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
