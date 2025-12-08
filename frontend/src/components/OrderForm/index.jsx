import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import { BASE_URL } from '../../utils/api';
import s from './OrderForm.module.css';
import Button from '../UI/Button';

const OrderForm = ({ total }) => {
  const dispatch = useDispatch();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const onSubmit = async (data) => {
    
    const requestBody = {
      ...data,
      total_amount: total,
    };

    try {
      const response = await fetch(`${BASE_URL}/order/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert('Order placed successfully! Thank you!');
        dispatch(clearCart()); 
        reset(); 
      } else {
        alert('Error placing the order. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      
      <input
        type="text"
        placeholder="Name"
        className={s.input}
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <p className={s.error}>{errors.name.message}</p>}

      <input
        type="tel"
        placeholder="Phone number"
        className={s.input}
        {...register('phone', { 
          required: 'Phone number is required',
          pattern: {
            value: /^\+?[0-9\s-()]{7,20}$/, 
            message: 'Enter a valid phone number'
          }
        })}
      />
      {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
      
      <input
        type="email"
        placeholder="Email (optional)"
        className={s.input}
        {...register('email', { 
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Enter a valid email'
          }
        })}
      />
      {errors.email && <p className={s.error}>{errors.email.message}</p>}

      <Button type="submit" className={s.submitButton}>
        Place Order
      </Button>
    </form>
  );
};

export default OrderForm;
