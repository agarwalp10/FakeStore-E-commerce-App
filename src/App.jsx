// src/App.jsx

// CHANGED: import useEffect + useLocation to run a cleanup on each route change
import { Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductEdit from './components/ProductEdit';
import ProductDetail from './components/ProductDetail';

function App() {

  return (
    <>
      {/* NavBar not part of Routes */}
      <NavBar />
      <Routes>
        {/* Adding Routes in order */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-products" element={<ProductCreate />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/product-details/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;

