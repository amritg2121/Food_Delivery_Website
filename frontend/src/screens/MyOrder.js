import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const API_URL = process.env.REACT_APP_API_URL;
export default function MyOrder() {
    const [orderData, setorderData] = useState("")
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
            await fetch(`${API_URL}/api/myOrderData`, {
            // credentials: 'include',
            // Origin:"https://food-delivery-website-dfou.onrender.com/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })


    }
    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData != {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData, idx) => {
                                            return (
                                                <React.Fragment key={idx}>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-sm-6 col-lg-4 col-xl-3' >
                                                            <div className="card mt-3 food-card">
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0'>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </React.Fragment>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </>
    )
}
