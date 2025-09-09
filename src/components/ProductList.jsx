// src/components/ProductList.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import Alert from 'react-bootstrap/Alert';

// ProductList component to show list of products
function ProductList() {
  const [products, setProducts] = useState([]);     // State to store product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);    // Error state
  const [success, setSuccess] = useState(''); // flash from ProductDetail

  //  useLocation to read flash message from navigation state 
  const location = useLocation(); 
  const navigate = useNavigate(); 


  // useEffect to fetch product when component mounts
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (err) {
        setError(`Failed to fetch products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []); // Empty dependency array ensures this runs only once

  // useEffect to show flash message from navigation state, then clear it
  useEffect(() => {
    if (location.state && location.state.flash) {
      setSuccess(location.state.flash);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <Container>
        <h3>
            {/* spinner shows an animation that tells the user something is being loaded */}
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading Products...
        </h3>
      </Container>
    )
  }

  if (error) return <p>{error}</p>;

    return (
    <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className='fw-bold fs-2"'>Product List</h3>
            <Button as={Link} to="/add-products" variant="primary">+ Add Product</Button>
        </div>

      {/* show flash success if returning from a delete */}
      {success && (
        <Alert
          className="mt-3"
          variant="success"
          dismissible
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}


      <Row className="mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gx-2 gy-3">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}  className="mt-4">
            <Card className="h-100 shadow-sm border-0 rounded-3 card-product">
                <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
                    <div className="mt-auto d-flex gap-2">

                        <Button as={Link} to={`/product-details/${product.id}`} size="sm" variant="secondary">Details</Button>


                    </div>
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    </Container>
  );
}

export default ProductList;