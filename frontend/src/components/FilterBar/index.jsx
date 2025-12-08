import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsFilter } from '../../store/slices/productsSlice';
import Button from '../UI/Button';
import s from './FilterBar.module.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector(state => state.products.filters);

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    reset 
  } = useForm({
    defaultValues: {
      priceFrom: currentFilters.priceFrom,
      priceTo: currentFilters.priceTo,
      discount: currentFilters.discount,
      sortBy: currentFilters.sortBy,
    }
  });

  const watchedFields = watch();
  
  useEffect(() => {
    const payload = {
      priceFrom: watchedFields.priceFrom,
      priceTo: watchedFields.priceTo,
      discount: watchedFields.discount,
      sortBy: watchedFields.sortBy,
    };
    
    dispatch(setProductsFilter(payload));
  }, [watchedFields, dispatch]);


  const handleClearFilters = () => {
    reset({
        priceFrom: '',
        priceTo: '',
        discount: false,
        sortBy: 'default'
    });
  };
  
  return (
    <div className={s.filterBar}>
      <form className={s.form}>
        
        <div className={s.group}>
          <label className={s.label}>Price:</label>
          <input 
            type="number" 
            placeholder="from" 
            className={s.input}
            {...register('priceFrom')} 
          />
          <input 
            type="number" 
            placeholder="to" 
            className={s.input}
            {...register('priceTo')} 
          />
        </div>
        <div className={s.group}>
          <label className={s.label}>Discounted products</label>
          <input 
            type="checkbox" 
            className={s.checkbox}
            {...register('discount')} 
          />
        </div>
      

        <div className={s.group}>
          <label className={s.label}>Sort by:</label>
          <select className={s.select} {...register('sortBy')}>
            <option value="default">default</option>
            <option value="price_asc">price (ascending)</option>
            <option value="price_desc">price (descending)</option>
            <option value="title_asc">title (A-Z)</option>
            <option value="title_desc">title (Z-A)</option>
          </select>
        </div>
        
      </form>
    </div>
  );
};

export default FilterBar;