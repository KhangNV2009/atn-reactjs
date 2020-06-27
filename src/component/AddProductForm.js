import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd';
//utils
import BaseUrl from '../utils/BaseUrl';


export default function AddProductForm() {
    const [category, setCategory] = useState([])
    const [supplier, setSupplier] = useState([])

    const [categoryId, setCategoryId] = useState(0)
    const [supplierId, setSupplierId] = useState(0)

    const onCategoryChange = value => {
        setCategoryId(value)
        console.log(value)
    }

    const onSupplierChange = value => {
        setSupplierId(value)
    }

    const addProduct = async (suppilerId, categoryId, productName, productPrice, productImage, productQuantity) => {
        try {
            const response = await fetch(`${BaseUrl}/api/product/add?suppilerId=${suppilerId}&categoryId=${categoryId}&productName=${productName}&productPrice=${productPrice}&productImage=${productImage}&productQuantity=${productQuantity}`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/category/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setCategory(data)

        } catch (error) {
            console.error(error);
        }
    }

    const getAllSupplier = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/supplier/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setSupplier(data)

        } catch (error) {
            console.error(error);
        }
    }

    const submitAddProduct = (values) => {
        addProduct(supplierId, categoryId, values.name, values.price, values.imageLink, parseInt(values.quantity))
    }

    useEffect(() => {
        getAllCategory()
        getAllSupplier()
    }, [])

    return (
        <Form name="control-ref" onFinish={submitAddProduct}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onCategoryChange}
                    allowClear
                >
                    {category.map(item => {
                        return (
                            <Select.Option key={item.category_id} value={item.category_id}>{item.category_name}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item name="supplier" label="Supplier" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onSupplierChange}
                    allowClear
                >
                    {supplier.map(item => {
                        return (
                            <Select.Option key={item.supplier_id} value={item.supplier_id}>{item.supplier_name}</Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="imageLink"
                label="Image Link"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Submit</Button>
        </Form>
    )
}
