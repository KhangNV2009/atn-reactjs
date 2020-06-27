import React from 'react'
import { Button } from 'antd'

import '../css/component/CartElement.css'

export default function CartElement () {
        return (
            <div className="cart-element-container">
                <h5>Product name: Xe điều khiển</h5>
                <h5>Quantity: 10</h5>
                <h5>Price: 50$</h5>
                <Button type="danger">Delete</Button>
            </div>
        )
}
