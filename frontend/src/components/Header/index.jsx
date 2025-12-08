import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cartIcon from '../../assets/icons/cart.svg';
import s from './Header.module.css';
import logoSrc from '../../assets/icons/logo.svg';

const Header = () => {
  const cartItemCount = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.count, 0)
  );

  return (
    <header className={s.header}>
      <div className={s.container}>

        <Link to="/" className={s.logo}>
          <img src={logoSrc} alt="Logo" />
        </Link>

        <nav className={s.nav}>
          <Link to="/">Main Page</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/products">All products</Link>

          <Link to="6">All sales</Link>
        </nav>

        <Link to="/cart" className={s.cart}>
          <img src={cartIcon} alt="Cart" className={s.cartIcon} />
          {cartItemCount > 0 && (
            <span className={s.badge}>{cartItemCount}</span>
          )}
        </Link>

      </div>
    </header>
  );
};

export default Header;
