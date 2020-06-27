import React, { useState, useEffect } from 'react'
import { Card, Layout, Button } from 'antd'
import { useHistory } from "react-router-dom";
//css
import '../css/page/OrderPage.css'

//Url
import BaseUrl from '../utils/BaseUrl'

export default function OrderPage() {

    let history = useHistory();

    const [orderList, setOrderList] = useState([])

    const getOrderList = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/order/all`, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setOrderList(data)
        } catch (error) {
            console.error(error);
        }
    }

    const toOrderDetail = (orderId) => {
        let path = "/detail"
        history.push({ pathname: path, orderId })
    }

    useEffect(() => {
        getOrderList()
    }, [])
    return (
        <Layout>
            <Layout.Content>
                <div className="order-page-container">
                    <div className="order-element-container">
                        <div className="row">
                            {orderList.map(item => {
                                return (
                                    <Card
                                        title={`Customer name: ${item.customer_name}`}
                                        className="order-element col-xl-3 col-md-4 col-sm-6 col-xs-3"
                                        hoverable
                                        key={item.order_id}
                                        bordered={true}
                                        style={{ width: 1000 }}
                                        actions={[
                                            <Button type="primary" onClick={() => toOrderDetail(item.order_id)} style={{ width: "80%" }}>Details</Button>,
                                        ]}
                                    >
                                        <p>OrderId: {item.order_id}</p>
                                        <p>BrandId: {item.branch_id}</p>
                                        <p>Staff name: {item.staff_name}</p>
                                        <p>Order date: {item.order_at.substring(0, 10)}</p>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}
