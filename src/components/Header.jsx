import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { token, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!token) return null;

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav-logo">
          <Store size={24} />
          <span>ShoppingSite</span>
        </Link>
        <div className="nav-links">
          <Link to="/cart" className="nav-link">
            <ShoppingCart size={20} />
            <span className="cart-count">{getCartCount()}</span>
          </Link>
          <button onClick={handleLogout} className="nav-link" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <LogOut size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;