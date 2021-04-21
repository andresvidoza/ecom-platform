import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, FormControl } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'

const ProductScreen = ({ match, history }) => {
  //Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
  const [qty, setQty] = useState(1) // // Declare a new state variable, which we'll call "qty", This is similar to this.state.count and this.setState in a class, except you get them in a pair
  // We declare a state variable called count, and set it to 0.

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  // dispatch the action for details
  const dispatch = useDispatch();

  const productDetails = useSelector( state => state.productDetails );
  const { loading, error, product} = productDetails

  const userLogin = useSelector( state => state.userLogin );
  const { userInfo } = userLogin

  const productReviewCreate = useSelector( state => state.productReviewCreate );
  const { success: successProductReview, error: errorProductReview} = productReviewCreate


  // this will run as soon as the component loads  - Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if(successProductReview){
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({type: 'PRODUCT_CREATE_REVIEW_RESET'})
    }
    dispatch(listProductDetails(match.params.id));

  }, [dispatch, match, successProductReview]) // if these variables change then the code inside fires off in the array

  // HANDLERS
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, {
      rating,
      comment
    }))
  }


  return <>
    <Link className='btn btn-light my-3' to="/">
      Go back
    </Link>
    { loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
      <>
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
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message> No reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map(review => 
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating}/>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>)}
            <ListGroup.Item>
              <h2>Write a customer review</h2>
              {errorProductReview && <Message varinat='danger'>{errorProductReview}</Message>}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select ...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Awesome</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row='3' value={comment} onChange={ (e) => setComment(e.target.value)}>

                    </Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>Submit</Button>
                </Form>
              ) : <Message>Please <Link to='/login'>Log In</Link>to write a review</Message>}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      </>
    }
  </>
}

export default ProductScreen
