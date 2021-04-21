import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom"; // ADDED LINE !!!!!!!!!!!!!!!!!!!!!!
import { Navbar, Nav, Container, NavDropdown, useAccordionToggle } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from "react-icons/fa"

import { logout } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()
  let history = useHistory(); // ADDED LINE !!!!!!!!!!!!!!!!!!!!!!

 const userLogin = useSelector(state => state.userLogin)
 const { userInfo } = userLogin

 const logoutHandler = () => {
   dispatch(logout());
   // ADDED LINE !!!!!!!!!!!!!!!!!!!!!!
   history.push('/login')
 }
 
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand>Canvogh</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

              <LinkContainer to="/cart">
                <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ): <LinkContainer to="/login">
              <Nav.Link><FaUser/> Sign in</Nav.Link>
            </LinkContainer>}

            {userInfo && userInfo.isAdmin && 
              <NavDropdown title='Admin' id="adminmenu">
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
