import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart } from '../../store/slices/cartSlice';
import { getImageUrl } from '../../utils/fixUrl';
import s from './ProductCard.module.css';

const ProductCard = ({ id, title, price, discont_price, image }) => { 
  const dispatch = useDispatch();
  
  
  const cartItems = useSelector(state => state.cart.items);
  const isAdded = cartItems.some(item => item.id === id); 
  
  const imageUrl = getImageUrl(image);
  

  const originalPrice = price || 0;
  const finalPrice = discont_price !== null ? discont_price : originalPrice;
  const isDiscounted = discont_price !== null && originalPrice > discont_price;
  
  let discountPercent = 0;
  if (isDiscounted) {
    discountPercent = Math.round(((originalPrice - discont_price) / originalPrice) * 100);
  }

 
  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
   
    if (!isAdded) {
        dispatch(addToCart({
            id,
            title,
            price: finalPrice, 
            image,
            count: 1 
        }));
    }
  };

  return (
    <div className={s.productCard}>
        
        <Link to={`/products/${id}`} className={s.link}>
            
            <div className={s.imageWrapper}>
                <img src={imageUrl} alt={title} className={s.image} />
                
                
                {isDiscounted && (
                    <div className={s.discountBadge}>
                        -{discountPercent}%
                    </div>
                )}

               
                <button 
                    
                    className={`${s.cartButton} ${isAdded ? s.addedButton : ''}`}
                    onClick={handleAddToCart}
                    disabled={isAdded} // Отключаем клик, если товар уже добавлен
                    title={isAdded ? "Product is already in cart" : `Add ${title} to cart`}
                >
                    {isAdded ? "Added" : "Add to cart"}
                </button>
            </div>
            
            <div className={s.content}>
                <h3 className={s.title}>{title}</h3>
                
                <div className={s.priceContainer}>
                    <p className={s.finalPrice}>
                        ${finalPrice.toFixed(2)}
                    </p>
                    {isDiscounted && (
                        <p className={s.originalPrice}>
                            ${originalPrice.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
        
    </div>
  );
};

export default ProductCard;