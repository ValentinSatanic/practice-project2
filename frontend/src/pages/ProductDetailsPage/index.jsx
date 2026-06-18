import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { getImageUrl } from '../../utils/api'; 
import Button from '../../components/UI/Button';
import s from './ProductDetailsPage.module.css';


const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [count, setCount] = useState(1); 
  
  const { selectedProduct: product, detailsStatus: status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

 const handleAddToCart = () => {
  if (product && count > 0) {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: Number(product.price) || 0,
      image: product.image,
      discont_price: product.discont_price !== null ? Number(product.discont_price) : null,
      quantity: Number(count),
    }));
    setCount(1);
  }
};
  

  const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
      setCount(prevCount => Math.max(1, prevCount - 1)); 
  };


  if (status === 'loading') return <div className={s.container}>Загрузка деталей товара...</div>;
  if (status === 'failed') return <div className={s.container}>Ошибка загрузки: {error}</div>;
  if (!product) return <div className={s.container}>Товар не найден.</div>;

  const isDiscounted = product.discont_price < product.price && product.discont_price !== null;
  const currentPrice = isDiscounted ? product.discont_price : product.price;
  const discountPercent = isDiscounted ? Math.round(((product.price - product.discont_price) / product.price) * 100) : 0;

  return (
    <div className={s.container}>
      <div className={s.content}>
       
        <img src={getImageUrl(product.image)} alt={product.title} className={s.image} />
        
      
        <div className={s.info}>
          <h1 className={s.title}>{product.title}</h1>

          <div className={s.priceBlock}>
            <p className={s.currentPrice}>{currentPrice} $</p>
            {isDiscounted && (
              <>
                <p className={s.originalPrice}>{product.price} $</p>
                <span className={s.discountTag}>-{discountPercent}%</span>
              </>
            )}
          </div>
          
          
          <div className={s.actionsBlock}>
            
        
            <div className={s.quantityCounter}>
                <button 
                    onClick={handleDecrement} 
                    className={s.countButton}
                    disabled={count === 1} 
                >
                    —
                </button>
                <span className={s.countValue}>{count}</span>
                <button 
                    onClick={handleIncrement} 
                    className={s.countButton}
                >
                    +
                </button>
            </div>
            
           
            <Button onClick={handleAddToCart} type="primary" className={s.addButton}>
                Add to cart
            </Button>
          </div>
          


          <div className={s.descriptionBlock}>
            <h2>Description</h2>
            <p className={s.description}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;