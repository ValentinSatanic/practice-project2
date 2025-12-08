import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../../utils/api'; 
import s from './CouponForm.module.css';

const CouponForm = ({ className, s }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    if (isSubmitted) return;

    setIsError(false);

    try {
      const response = await fetch(`${BASE_URL}/sale/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: data.name, 
            phone: data.phone,
            email: data.email 
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset(); 
      } else {
        setIsError(true);
        console.error('Ошибка при отправке заявки:', response.status);
      }
    } catch (error) {
      setIsError(true);
      console.error('Ошибка сети:', error);
    }
  };
  
  const buttonText = isSubmitted ? 'Request Submitted' : 'Get a discount';
  
  const buttonClass = isSubmitted ? s.submittedButton : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
        
        <input
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Введите имя' })}
        />

        <input
            type="tel"
            placeholder="Phone number"
            {...register('phone', { required: 'Введите номер телефона' })}
        />
       
        <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Введите email' })}
        />

        <button 
            type="submit"
            className={buttonClass} 
            disabled={isSubmitted}     
        >
          {buttonText}
        </button>
        
        {isError && <p className={s.formError}>An error occurred during submission.</p>}

    </form>
  );
};

export default CouponForm;