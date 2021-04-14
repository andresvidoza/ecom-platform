import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match }) => {
  // dispatch the action for details
  const dispatch = useDispatch();

  const productDetails = useSelector( state => state.productDetails );
  const { loading, error, product} = productDetails


  // this will run as soon as the component loads  - Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    dispatch(listProductDetails(match.params.id));

  }, [dispatch, match]) // if these variables change then the code inside fires off in the array


  return <>
    <Link className='btn btn-light my-3' to="/">
      Go back
    </Link>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                  <Button className="btn-block" type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    }
  </>
}

export default ProductScreen
