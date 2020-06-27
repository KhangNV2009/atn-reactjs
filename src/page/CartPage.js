import React from 'react'

import '../css/page/CartPage.css'
import { Button, Layout } from 'antd'

//component
import CartElement from '../component/CartElement'

export default function CartPage() {
    return (
        <Layout>
            <Layout.Content>
                <div className="cart-page-container">
                    <div className="cart-page-form-container shadow">
                        <h1>Cart List</h1>
                        <CartElement />
                        <Button type="primary" style={{ width: '100%', marginTop: '2vh' }}>Pay</Button>
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
