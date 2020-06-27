import React, { useState, useEffect } from 'react'
import { Table, Layout, Descriptions } from 'antd';

//Url
import BaseUrl from '../utils/BaseUrl'

export default function OrderDetail(props) {

    const columns = [
        {
            title: 'Product name',
            dataIndex: 'productName',
            key: 'productName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const [list, setList] = useState([])
    const [branchId, setBranchId] = useState(0)
    const [customerName, setCustomerName] = useState("")
    const [staffName, setStaffName] = useState("")
    const [orderAt, setOrderAt] = useState("")
    const getListProduct = async (orderId) => {
        try {
            const response = await fetch(`${BaseUrl}/api/order-detail/all?orderId=${orderId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setList(data)
            setBranchId(data[0].branch_id)
            setCustomerName(data[0].customer_name)
            setStaffName(data[0].staff_name)
            setOrderAt(data[0].order_at)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(props.location.orderId != null) {
            getListProduct(props.location.orderId)
        }
    }, [props.location.orderId])

    return (
        <div style={{ minHeight: '68vh' }}>
            <Layout>
                <Layout.Content>
                    <Descriptions title="Order Details" column={1} size="middle" style={{padding: "2vw"}}>
                        <Descriptions.Item label="BranchId">{branchId}</Descriptions.Item>
                        <Descriptions.Item label="Customer name">{customerName}</Descriptions.Item>
                        <Descriptions.Item label="Staff name">{staffName}</Descriptions.Item>
                        <Descriptions.Item label="Order date">{orderAt.substring(0, 10)}</Descriptions.Item>
                    </Descriptions>
                    <Table
                        columns={columns}
                        dataSource={
                            list.map(item => {
                                return {
                                    key: item.order_at,
                                    productName: item.product_name,
                                    quantity: item.order_detail_quantity,
                                    price: (parseFloat(item.product_price.replace(/[$,]+/g,"")) * item.order_detail_quantity)
                                }
                            })
                        }
                        footer={() => `Total: $${list.reduce(function (total, current) {
                            return total + parseFloat(current.product_price.replace(/[$,]+/g,"")) * current.order_detail_quantity
                        }, 0)}`}
                    />
                </Layout.Content>
            </Layout>
        </div>
    )
}
