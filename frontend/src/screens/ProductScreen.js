import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match, history }) => {
  //Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
  const [qty, setQty] = useState(1) // // Declare a new state variable, which we'll call "qty", This is similar to this.state.count and this.setState in a class, except you get them in a pair
  // We declare a state variable called count, and set it to 0.


  // dispatch the action for details
  const dispatch = useDispatch();

  const productDetails = useSelector( state => state.productDetails );
  const { loading, error, product} = productDetails


  // this will run as soon as the component loads  - Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    dispatch(listProductDetails(match.params.id));

  }, [dispatch, match]) // if these variables change then the code inside fires off in the array

  // HANDLERS
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as='select' value={qty} onChange={ (e) => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map( x => ( <option key={x + 1} value={x + 1}>{x + 1}</option>))}
                     </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                  <Button 
                  onClick={addToCartHandler}
                  className="btn-block" 
                  type='button' 
                  disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    }
  </>
}

export default ProductScreen
