import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import CategoryItem from '../../components/CategoryItem';
import s from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { list: categories, status, error } = useSelector(state => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className={s.container}>Loading categories...</div>;
  }

  if (status === 'failed') {
    return <div className={s.container}>Loading error: {error}</div>;
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Categories</h1>
      <div className={s.list}>
        {categories.map(category => (
          <CategoryItem 
            key={category.id} 
            id={category.id}
            title={category.title} 
            image={category.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;