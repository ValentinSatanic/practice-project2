import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseCount, decreaseCount, removeFromCart } from '../../store/slices/cartSlice';
import { getImageUrl } from '../../utils/fixUrl';
import s from './CartItem.module.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const imageUrl = getImageUrl(item.image);

  const handleIncrease = () => dispatch(increaseCount({ id: item.id }));
  const handleDecrease = () => dispatch(decreaseCount({ id: item.id }));
  const handleRemove = () => dispatch(removeFromCart({ id: item.id }));

  const count = Number(item.count) || 1;
  const price = Number(item.price) || 0;
  const originalPrice = Number(item.originalPrice) || 0;

  const itemTotalPrice = (price * count).toFixed(2);
  const showDiscount = originalPrice > price;
  const priceBeforeDiscount = showDiscount ? originalPrice.toFixed(2) : null;

  return (
    <div className={s.item}>
      <img src={imageUrl} alt={item.title} className={s.image} />
      <div className={s.details}>
        <h3>{item.title}</h3>
        <div className={s.controls}>
          <div className={s.quantity}>
            <button onClick={handleDecrease} disabled={count <= 1}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button className={s.removeButton} onClick={handleRemove}>×</button>
        </div>
      </div>
      <div className={s.priceBlock}>
        {priceBeforeDiscount && <span className={s.originalPrice}>{priceBeforeDiscount} $</span>}
        <span className={s.unitPrice}>({price.toFixed(2)} $ / pcs.)</span>
        <p className={s.totalPrice}>Total: {itemTotalPrice} $</p>
      </div>
    </div>
  );
};

export default CartItem;

