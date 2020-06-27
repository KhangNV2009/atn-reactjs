import React, { useEffect, useState } from 'react'
import { Carousel, Card, Layout, Button } from 'antd';
// css
import '../css/page/Home.css'

//utils
import BaseUrl from '../utils/BaseUrl'

const { Meta } = Card;

export default function HomePage(props) {

    const [product, setProduct] = useState([])

    const getProducts = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/product/all`, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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

    useEffect(() => {
        getProducts()
    })

    return (
        <Layout>
            <Layout.Content>
                <Carousel autoplay>
                    <div className="carousel-container">
                        <div className="carousel-text-container">
                            <h1>New LEGO Sets Out Now!</h1>
                            <h2>Shop now and click and collect same day!</h2>
                        </div>
                        <div className="carousel-image-container" >
                            <img className="image-carousel carousel-image-container" src={require('../assets/image/lego.jpg')} alt="" />
                        </div>
                    </div>
                    <div className="carousel-container">
                        <div className="carousel-text-container">
                            <h1>New LEGO Sets Out Now!</h1>
                            <h2>Shop now and click and collect same day!</h2>
                        </div>
                        <div className="carousel-image-container" >
                            <img className="image-carousel carousel-image-container" src={require('../assets/image/lego.jpg')} alt="" />
                        </div>
                    </div>
                </Carousel>
                <div className="card-container">
                    <div className="row">
                        {product.map(item => {
                            return (
                                <div className="col-xl-3 col-md-4 col-sm-6 col-xs-3" key={item.product_id}>
                                    <Card
                                        className="card-element"
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt={item.product_name} src={item.product_image} style={{ height: '32vh' }} />}
                                        // actions={[
                                        //     <Button style={{ width: '80%' }} type="primary">Add to Cart</Button>,
                                        // ]}
                                    >
                                        <Meta title={item.product_name} description={`Price: ${item.product_price}`} />
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout.Content>
        </Layout>
    )
}