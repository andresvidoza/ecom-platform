import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ListGroup, Image, Card, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2'

const OrderScreen = ( { match, history }) => {
    const orderId = match.params.id;

    const [SDKReady, setSDKReady] = useState(false)

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error} = orderDetails;

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay , success: successPay} = orderPay; // rename args

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver , success: successDeliver} = orderDeliver;



    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        }
    
        // CALCULATE PRICES
        order.itemsPrice = addDecimals((order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
    }

    useEffect(()=> {

        if(!userInfo){
            history.push('/login')
        }
        
        const addPayPalScript = async () => {
            //fetch client id from backend
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            script.onload = () => {
                setSDKReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver){
            dispatch( { type: 'ORDER_PAY_RESET' })
            dispatch( { type: 'ORDER_DELIVER_RESET' })
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSDKReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const successDeliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>

        <h1> Order {order._id} </h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered On {order.deliveredAt}</Message> :
                            <Message variant='danger'>Not delivered</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid On {order.paidAt} </Message> :
                            <Message variant='danger'>Not Paid</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Items in Cart</h2>
                        {order.orderItems.length == 0 ? <Message>Your Order is empty</Message>:
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => 
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}> {item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && 
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!SDKReady ? <Loader /> : 
                                <PayPalButton 
                                amount={order.totalPrice} 
                                onSuccess={successPaymentHandler} />}
                            </ListGroup.Item>
                        }
                    {loadingDeliver && <Loader />}
                    { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={successDeliverHandler}>Mark as delivered</Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    
}

export default OrderScreen
