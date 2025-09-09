// src/components/ProductDetail.jsx

import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

// ProductDetail component to show details of a product, just one
function ProductDetail() {
    const { id } = useParams(); // Get Id from route parameters (from the URL)
    const navigate = useNavigate(); // Hook to programmatically navigate to another route or another page, delete back to list
    const [searchParams] = useSearchParams(); // To read query parameters from the URL
    const askDeleteOnLoad = useMemo(() => searchParams.get('delete') === '1', [searchParams]); 

    const [product, setProduct] = useState(null);     // State to store product
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);    // Error state
    const [success, setSuccess] = useState('');

      // delete modal state
    const [showDelete, setShowDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // fetch product details from API
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
          .then(response => {
            setProduct(response.data);
            setLoading(false);
          })
          .catch(error => {
            setError(`Failed to fetch product details: ${error.message}`);
            setLoading(false);
          });

        }, [id]); // Re-run effect if Id changes

        // Show delete confirmation modal if ?delete=1 in URL
      useEffect(() => {
          if (!loading && product && askDeleteOnLoad) {
            setShowDelete(true);
          }
      }, [loading, product, askDeleteOnLoad]);

        // addToCart function to add product to cart in localStorage
      const addToCart = () => {
        if (!product) return; // safety check
        try {
          const prev = JSON.parse(localStorage.getItem('cart') || '[]');
          const idx = prev.findIndex(p => p.id === product.id);
          // checks if product already in cart, increment qty
          if (idx >= 0) {
            prev[idx].qty = (prev[idx].qty || 1) + 1;
            // else add new product with qty 1
          } else {
            prev.push({ ...product, qty: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(prev));
          setSuccess(`“${product.title}” added to cart.`);
        } catch (e) {
          setError('Could not add to cart.');
        }
      };

  // confirm deletion of product
    const confirmDelete = async () => {
      if (!product) return;
      try {
        setDeleting(true);
        await axios.delete(`https://fakestoreapi.com/products/${product.id}`);

        // ✨ Close the modal first so React-Bootstrap can clean up the backdrop
        setShowDelete(false);

        // Then navigate (short delay lets DOM cleanup complete)
        setTimeout(() => {
          navigate('/products', {
            replace: true,
            state: { flash: `“${product.title}” deleted (mock).` }
          });
        }, 0);
      } catch (err) {
        setError(`Failed to delete: ${err.message}`);
      } finally {
        setDeleting(false);
      }
    };



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
          Loading Product Detail...
        </h3>
      </Container>
    )
  }

if (error) return <p>{error}</p>;

if (!product) return <p>No product found.</p>;

// image, title, description, category, and price
// button - to add product to cart (Cart functionality optional)
// button to delete product (removes from API)


  return (
    <Container className="mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Product Detail</h3>
        <Button as={Link} to="/products" variant="link">Back to list</Button>
      </div>

      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Row>
        <Col className="mt-4" md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{ height: 300, objectFit: 'contain' }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{product.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
              <Card.Text className="mt-3">{product.description}</Card.Text>
              <Card.Text className="mt-2"><strong>Category:</strong> {product.category}</Card.Text>

              <div className="mt-3 d-flex flex-wrap gap-2">
                <Button variant="success" onClick={addToCart}>Add to Cart</Button>
                <Button as={Link} to={`/products/${product.id}/edit`} variant="outline-primary">Edit</Button>
                <Button variant="outline-danger" onClick={() => setShowDelete(true)}>Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete confirmation modal */}
      <Modal
        show={showDelete}
        onHide={() => !deleting && setShowDelete(false)}
        centered
        backdrop={deleting ? 'static' : true}
        keyboard={!deleting}
      >
        <Modal.Header closeButton={!deleting}>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{product.title}</strong>? This cannot be undone.
          <br />
          <small className="text-muted">
            (FakeStoreAPI returns success, but the change won’t persist after refresh.)
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetail;