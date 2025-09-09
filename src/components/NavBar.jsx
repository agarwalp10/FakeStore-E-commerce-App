// src/components/NavBar.jsx

import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavBar() {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="p-3 mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/" end className="fw-bold fs-2">
          Fake Store
        </Navbar.Brand>

        {/* Responsive Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
           {/* NavBar links to Home, Product Listing, and to Add Product */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Product Listing
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-products">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;