import { Carousel, Image } from 'react-bootstrap'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {

    const dispatch = useDispatch();

    const productTopRated = useSelector( state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name}({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
