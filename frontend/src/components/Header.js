import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from "react-icons/fa"

const Header = () => {
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

              <LinkContainer to="/login">
                <Nav.Link><FaUser /> Sign in</Nav.Link>
              </LinkContainer>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
