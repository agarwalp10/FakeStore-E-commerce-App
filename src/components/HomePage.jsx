// src/components/HomePage.jsx


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto" className='text-center'>
                    <h1>Welcome to the FakeStore</h1>
                    <hr className="border border-2 border-secondary opacity-100 w-100 mx-auto mb-3" />

                    <p className="fst-italic">Your one-stop shop for all things fake!</p>
                    <div className='d-flex justify-content-center mb-4 gap-3'>
                        <Button as={Link} to="/products" variant="info">
                            View Products
                        </Button>
                        <Button as={Link} to="/add-products" variant="warning">
                            Add Products
                        </Button>
                    </div>
                </Col>
            </Row>
        
                
        </Container>
    );
}

export default HomePage;