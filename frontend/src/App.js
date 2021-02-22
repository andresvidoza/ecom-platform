import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* use exact to match exact route of / */}
          <Route path='/' component ={HomeScreen} exact/>
          {/* :id is the placeholder expecting something */}
          <Route path='/product/:id' component ={ProductScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
