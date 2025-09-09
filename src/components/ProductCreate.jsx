// src/components/ProductCreate.jsx


import { useState, } from 'react'; 
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';

// ProductCreate compopnent to add a new product
function ProductCreate() {
  // using API error and success state to show messages
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState('');

// Handler to create a new product via POST request
// payload contains the product data from the form
  const handleCreate = async (payload) => {
    try {
      setApiError(null);
      setSuccess('');
      // payload is the product data from the form and send POST request
      const res = await axios.post('https://fakestoreapi.com/products', payload);
      // showing success message with product title
      const title = res.data.title || payload.title;
      setSuccess(`“${title}” created successfully! (mock)`);

    } catch (err) {
      setApiError(`Failed to create product: ${err.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Add Product</h2>
        <Button as={Link} to="/products" variant="link">
          Back to list
        </Button>
      </div>

      {/* Reusing ProductForm for creating a product */}
      <ProductForm
        // onSubmit handler to create product
        onSubmit={handleCreate}
        submitLabel="Create Product"
        apiError={apiError}
        successMessage={success}
      />
    </Container>
  );
}

export default ProductCreate;
