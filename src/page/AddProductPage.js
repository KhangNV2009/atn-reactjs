import React from 'react'
import { Layout } from 'antd'
//css
import '../css/page/AddProductPage.css'

//component
import AddProductForm from '../component/AddProductForm.js'

export default function AddProductPage() {
    return (
        <Layout>
            <Layout.Content>
                <div className="add-product-page-container">
                    <div className="add-product-page-form-container">
                        <h1 style={{ marginBottom: '2vh' }} >Add New Product</h1>
                        <AddProductForm />
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
