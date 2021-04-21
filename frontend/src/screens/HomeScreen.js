import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

// They let you use state and other React features without writing a class.

const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword

  // use dispatch for REDUX
  const dispatch = useDispatch();
  // to display and use data
  const productList = useSelector(state => state.productList); // get the store state and take out what you want
  const { loading, error, products } = productList;

  // this will run as soon as the component loads  - Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // dispotch action
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]); // if these variables change then the code inside fires off in the array

  return (
    <>
     {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      { loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
      <Row>
        {products.map(product =>  (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
        ))}
      </Row>
      }
    </>
  )
}

export default HomeScreen;
