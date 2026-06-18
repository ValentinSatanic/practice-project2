import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';
import notFoundImage from '../../assets/images/404.png';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
       <img 
        src={notFoundImage} 
        alt="Page not found" 
        className={s.image}
      />
      </div>

      <h1 className={s.title}>Page Not Found</h1>
      <p className={s.message}>
        We’re sorry, the page you requested could not be found.
        <br /> 
        Please go back to the homepage.
      </p>
      <Link to="http://localhost:3000/" className={s.button}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
