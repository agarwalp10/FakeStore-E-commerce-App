// src/components/ProductForm.jsx


import { useState, useEffect, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// create ONE stable empty object (same reference every render)
const EMPTY_PRODUCT = Object.freeze({
  title: '',
  price: '',
  description: '',
  category: '',
});

// ProductForm component for both creating and editing a product
function ProductForm({
  // initialValues prop passed to the ProductForm component
  // it can be undefined (for creating a product) or an object (for editing)
  initialValues,                      // was: initialValues = { ... }
  onSubmit,
  submitLabel = 'Save',
  apiError = null,
  successMessage = ''
}) {
  // pick a stable initial (either the real one from props, or our constant)
  const safeInitialValues = useMemo(
    () => initialValues ?? EMPTY_PRODUCT,
    [initialValues]
  );

  // seed state from the *stable* value
  const [formData, setFormData] = useState(safeInitialValues);
  const [validated, setValidated] = useState(false);

  // only update state when the parent actually supplies initialValues (Edit page).
  // If initialValues is undefined (Create page), do nothing—formData already equals EMPTY_PRODUCT.
  useEffect(() => {
    if (initialValues) setFormData(initialValues);
  }, [initialValues]); // only re-run if initialValues changes

  // Generic change handler for all form fields
  // Updates the corresponding field in formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  // Validates the form and calls onSubmit prop with formData if valid
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Ensure price is a number
    const priceNum = Number(formData.price);
    if (!Number.isFinite(priceNum)) {
      setValidated(true);
      return;
    }

    // Call the onSubmit prop function with formData
    // Spread formData to ensure price is a number
    await onSubmit({
      ...formData,
      price: priceNum,
    });

    setValidated(true);
  };

  return (
    <>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      {/* noValidate disables default HTML5 validation UI */}
      {/* validated prop enables Bootstrap validation styles */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Product Title */}
          <Col md={7}>
            <FloatingLabel controlId="title" label="Product Title" className="mb-3">
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          {/* Product Price */}
          <Col md={5}>
            <FloatingLabel controlId="price" label="Price (USD)" className="mb-3">
              <Form.Control
                required
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                inputMode="decimal"
                step="0.01"
                min="0"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a price.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

          {/* Product Category and Description */}
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel controlId="category" label="Category">
              <Form.Select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                aria-label="Category"
              >
                <option value="">Choose...</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men&apos;s clothing</option>
                <option value="women's clothing">Women&apos;s clothing</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please pick a category.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="description" label="Description">
              <Form.Control
                as="textarea"
                style={{ height: 120 }}
                required
                name="description"
                placeholder="Describe the product"
                value={formData.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please add a description.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;