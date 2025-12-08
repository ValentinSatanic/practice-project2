import React from 'react';
import { Link } from 'react-router-dom';
import s from './CategoryItem.module.css';
import { BASE_URL } from '../../utils/api';

const CategoryItem = ({ id, title, image }) => {
  const imageUrl = image.startsWith('/category_img/')
    ? `${BASE_URL}${image}`
    : `${BASE_URL}/category_img/${image}`;

  return (
    <Link to={`/categories/${id}`} className={s.cardLink}>
      <div className={s.categoryCard}>
        <div className={s.imageContainer}>
          <img src={imageUrl} alt={title} className={s.image} />
        </div>
        <p className={s.title}>{title}</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
