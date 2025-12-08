import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchAllProducts } from '../../store/slices/productsSlice';

import CategoryItem from '../../components/CategoryItem';
import ProductCard from '../../components/ProductCard';
import CouponForm from '../../components/CouponForm';
import Button from '../../components/UI/Button';

import s from './MainPage.module.css';

import bannerImage from '../../assets/images/garden_banner.png';
import handsImage from '../../assets/images/hands.png';


const MainPage = () => {
  const dispatch = useDispatch();

  const categoriesStatus = useSelector(state => state.categories.status);
  const categories = useSelector(state => state.categories.list);

  const allProducts = useSelector(state => state.products.list);

  const discountedProducts = allProducts
    .filter(p => p.discont_price !== null && p.discont_price < p.price)
    .slice(0, 4);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
    dispatch(fetchAllProducts());
  }, [dispatch, categoriesStatus]);


  return (
    <div className={s.mainContainer}>
      
      <section 
        className={s.heroBanner}
        style={{ backgroundImage: `url(${bannerImage})` }} 
      >
        <div className={s.heroContent}>
          <h1>Amazing Discounts on Garden Products!</h1>
          <Button className={s.heroBtn}>Check out</Button>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2>Categories</h2>
          <div className={s.line}></div>

          <Link to="/categories">
            <button className={s.outlineBtn}>All categories</button>
          </Link>
        </div>

        <div className={s.categoriesGrid}>
          {categories &&
            categories.slice(0, 4).map(cat => (
              <CategoryItem key={cat.id} {...cat} />
          ))
        }
</div>
      </section>

      <section className={s.discountSection}>
        <div className={s.discountContent}>
          <h2>5% off on the first order</h2>

          <div className={s.discountLayout}>
            <div className={s.imageWrapper}>
              <img src={handsImage} alt="Hands" />
            </div>

            <div className={s.formWrapper}>
              <CouponForm className={s.customForm} s={s} />
            </div>
          </div>

        </div>
      </section>


      <section className={s.section}>
        <div className={s.sectionHeader}>
            <h2>Sale</h2>
            <div className={s.line}></div>

            <Link to="/products">
                <button className={s.outlineBtn}>All sales</button>
            </Link>
        </div>

        <div className={s.productsGrid}>
          {discountedProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default MainPage;
