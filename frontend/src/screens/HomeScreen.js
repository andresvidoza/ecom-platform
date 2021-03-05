import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

// They let you use state and other React features without writing a class.

const HomeScreen = () => {
  // whhat we want to call this piece of state, what we want to call the function to manipulate products
  const [products, setProducts] = useState([]); // pass default for products - empty array in this case

  // this will run as soon as the component loads  - Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Make axios request
    const fetchProducts = async () => {
      const res = await axios.get('api/products') // only proceed once this is resolved (promise)

      setProducts(res.data) // CHANGE STATE 
    }

    fetchProducts()
  }, []) // if these variables change then the code inside fires off in the array

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product =>  (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
