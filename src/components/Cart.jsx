import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="cart-container">
      {items.length === 0 && !showToast ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {items.length > 0 && (
            <>
              <h2>Shopping Cart</h2>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn"
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: '1rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <p>Total: ${getCartTotal().toFixed(2)}</p>
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{ marginTop: '1rem' }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}

      {showToast && (
        <div className="toast">
          Order placed successfully!
        </div>
      )}
    </div>
  );
}

export default Cart;
