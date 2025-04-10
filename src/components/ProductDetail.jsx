import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-detail-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-category">{product.category}</p>
        <p style={{ marginBottom: '1rem' }}>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span>Rating: {product.rating.rate}/5</span>
          <span>({product.rating.count} reviews)</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;