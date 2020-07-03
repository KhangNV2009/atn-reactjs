import React, { useEffect, useState } from 'react'
import { List, Button, Form, Select, InputNumber } from 'antd';
import { useHistory } from "react-router-dom";

import BaseUrl from '../utils/BaseUrl'

export default function AddOrderPage() {

    const history = useHistory()

    const [product, setProduct] = useState([])
    const [customer, setCustomer] = useState([])
    const [orderList, setOrderList] = useState([])
    const [position, setPosition] = useState(0)
    const [staff, setStaff] = useState(null)
    const [customerId, setCustomerId] = useState(0)

    const getProducts = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/product/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error(error);
        }
    }

    const getCustomers = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/customer/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setCustomer(data)
        } catch (error) {
            console.error(error);
        }
    }

    const getOrders = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/order/all`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setPosition(data.length + 1)
        } catch (error) {
            console.error(error);
        }
    }

    const postOrder = async () => {
        if (orderList[0] != undefined) {
            try {
                await fetch(`${BaseUrl}/api/order/add?customerId=${customerId}&staffId=${staff.staff_id}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                orderList.map(async item => {
                    if (item.quantity > 0) {
                        await fetch(`${BaseUrl}/api/order-detail/add?orderId=${position}&productId=${item.product[1]}&quantity=${item.quantity}`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                    }
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("Failed")
        }
    }

    const onProductChange = (value) => {
        console.log(value)
    }

    const onCustomerChange = (value) => {
        setCustomerId(value)
    }

    useEffect(() => {
        getProducts()
        getCustomers()
        getOrders()
        const staffInfo = JSON.parse(localStorage.getItem("staffInfo"))
        setStaff(staffInfo)
    }, []);

    const onFinish = values => {
        setOrderList(prev => [...prev, values])
    };
    return (
        <div style={{ minHeight: "68vh" }}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={orderList}
                renderItem={item => (
                    <List.Item
                        style={{ padding: '20px' }}
                        actions={[<h5>${parseFloat(item.product[3].replace(/[$,]+/g, "") * item.quantity)}</h5>]}
                    >
                        <List.Item.Meta
                            avatar={
                                <img src={item.product[2]} style={{ height: '70px', width: '70px' }} />
                            }
                            title={<h4>{item.product[0]}</h4>}
                            description={<h5>Product price: {item.product[3]}</h5>}
                        />
                        <h5>Quantity: {item.quantity}</h5>
                    </List.Item>
                )}
            />
            <div>
                <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="product"
                        rules={[{ required: true, message: 'Please type the product!' }]}
                    >
                        <Select
                            placeholder="Select a product"
                            onChange={onProductChange}
                            allowClear
                        >
                            {product.map(item => {
                                return (
                                    <Select.Option
                                        key={item.product_name}
                                        value={[item.product_name, item.product_id, item.product_image, item.product_price]}
                                    >
                                        {item.product_name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="customer"
                        rules={[{ required: true, message: 'Please choose customer!' }]}
                    >
                        <Select
                            placeholder="Select any customer"
                            onChange={onCustomerChange}
                            allowClear
                        >
                            {customer.map(item => {
                                return (
                                    <Select.Option key={item.customer_id} value={item.customer_id}>{item.customer_name}</Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="quantity" rules={[{ required: true, message: 'Please input your quantity!' }]}>
                        <InputNumber type="number" placeholder="Quantity" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>{() => (<Button type="primary" htmlType="submit">Add</Button>)}</Form.Item>
                    <Form.Item shouldUpdate={true}>{() => (<Button onClick={() => postOrder()} type="default">Done</Button>)}
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}
