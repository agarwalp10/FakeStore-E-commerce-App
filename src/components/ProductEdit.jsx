// src/components/ProductEdit.jsx

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ProductForm from './ProductForm';

// ProductEdit component to edit an existing product
// using product form component
function ProductEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState('');

  // Fetch product details to pre-fill the form
  useEffect(() => {
    // cancelled boolean to avoid setting state on unmounted component
    let cancelled = false;
    (async () => {
      try {
        setApiError(null);
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if (!cancelled) {
          setInitialValues({
            title: res.data.title || '',
            price: String(res.data.price ?? ''),
            description: res.data.description || '',
            category: res.data.category || ''
          });
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setApiError(`Failed to load product: ${err.message}`);
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [id]); // re-run effect if Id changes

  // Handler to update the product via PUT request
  // payload contains the updated product data from the form
  const handleUpdate = async (payload) => {
    try {
      setApiError(null);
      setSuccess('');
      const res = await axios.put(`https://fakestoreapi.com/products/${id}`, payload);
      setSuccess(`“${res.data.title || payload.title}” updated successfully! (mock)`);
    } catch (err) {
      setApiError(`Failed to update product: ${err.message}`);
    }
  };

  // Render loading spinner, error message, or the ProductForm
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Edit Product</h2>
        <Link to="/products">Back to list</Link>
      </div>

      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading…</span>
        </Spinner>
      )}

      {!loading && initialValues && (
        <ProductForm
          key={id}
          initialValues={initialValues}
          onSubmit={handleUpdate}
          submitLabel="Update Product"
          apiError={apiError}
          successMessage={success}
        />
      )}

      {!loading && apiError && <p className="text-danger">{apiError}</p>}
    </Container>
  );
}

export default ProductEdit;