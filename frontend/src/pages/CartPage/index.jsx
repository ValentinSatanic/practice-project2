import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import OrderForm from '../../components/OrderForm';
import s from './CartPage.module.css';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.count); 
  }, 0);
  
  const formattedTotal = totalAmount.toFixed(2);
  
  if (cartItems.length === 0) {
    return (
      <div className={s.emptyContainer}>
        <h1>Your cart is empty</h1>
        <p>Start shopping by browsing our catalog!</p>
        <Link to="/products" className={s.catalogButton}>
            Go to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1>Shopping Cart</h1>
      <div className={s.content}>
        <div className={s.itemsList}>
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
            />
          ))}
        </div>

        <div className={s.orderSummary}>
          <h2>Order Details</h2>
          <div className={s.total}>
            <span>Total:</span>
            <span className={s.totalPrice}>{formattedTotal} $</span>
          </div>
          
          <OrderForm total={formattedTotal} /> 
        </div>

      </div>
    </div>
  );
};

export default CartPage;
