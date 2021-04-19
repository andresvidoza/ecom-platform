import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <Route path='/login' component ={LoginScreen}/>
        <Route path='/register' component ={RegisterScreen}/>
        <Route path='/profile' component ={ProfileScreen}/>
        <Route path='/shipping' component ={ShippingScreen}/>
        <Route path='/payment' component ={PaymentScreen}/>
        <Route path='/placeorder' component ={PlaceOrderScreen}/>
        <Route path='/order/:id' component ={OrderScreen}/>
          {/* use exact to match exact route of / */}
          <Route path='/' component ={HomeScreen} exact/>
          {/* :id is the placeholder expecting something */}
          <Route path='/product/:id' component ={ProductScreen}/>
          {/* :id is the placeholder expecting something and the ? makes it optional because you wont always have an ID */}
          <Route path='/cart/:id?' component ={CartScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
