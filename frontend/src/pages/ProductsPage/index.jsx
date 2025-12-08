import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { 
  fetchProductsByCategory,
  fetchAllProducts,
  fetchDiscountedProducts
} from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import FilterBar from '../../components/FilterBar';
import s from './ProductsPage.module.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const location = useLocation(); 

  const isSalePage = location.pathname === '/sale';

  const { 
    list: products, 
    status, 
    error,
    filters 
  } = useSelector(state => state.products);

  const categoriesList = useSelector(state => state.categories.list);

  useEffect(() => {
    if (isSalePage) {
      dispatch(fetchDiscountedProducts(filters));
    } 
    else if (id) {
      dispatch(fetchProductsByCategory({ id, filters }));
    } 
    else {
      dispatch(fetchAllProducts(filters));
    }
  }, [
    dispatch,
    id,
    isSalePage,
    filters.priceFrom,
    filters.priceTo,
    filters.discount,
    filters.sortBy
  ]);

  const pageTitle = useMemo(() => {
    if (isSalePage) return 'Promotional items';

    if (id) {
      const currentCategory = categoriesList.find(cat => cat.id === +id);
      return currentCategory ? currentCategory.title : 'Products category';
    }

    return 'All products';
  }, [id, categoriesList, isSalePage]);

  if (status === 'loading') {
    return <div className={s.container}>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className={s.container}>Loading error: {error}</div>;
  }

  if (products.length === 0 && status === 'succeeded') {
    const isFiltered =
      filters.priceFrom ||
      filters.priceTo ||
      filters.discount !== false ||
      filters.sortBy !== 'default';

    return (
      <div className={s.container}>
        <h1 className={s.pageTitle}>{pageTitle}</h1>
        <FilterBar />
        <p className={s.emptyMessage}>
          {isFiltered
            ? 'There are no products matching the selected filters.'
            : 'No products found'}
        </p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <h1>{pageTitle}</h1>
      <FilterBar />
      <div className={s.list}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            discont_price={product.discont_price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;