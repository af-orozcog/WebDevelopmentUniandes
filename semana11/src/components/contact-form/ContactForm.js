import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import './ContactForm.scss';

export const ContactForm = () => {
  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    phone: '',
    comments: '',
  });

  const { name, email, phone, comments } = formValues;

  useEffect(() => {
    console.log('email cambió');
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);
  };

  return (
    <div className='contact-container'>
      <form className='contact-form' onSubmit={handleSubmit}>
        <h2>Contact Form</h2>
        <hr />

        <div className='form-group'>
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Tu nombre'
            autoComplete='off'
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            name='email'
            className='form-control'
            placeholder='email@gmail.com'
            autoComplete='off'
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className='form-group'>
          <input
            type='phone'
            name='phone'
            className='form-control'
            placeholder='Phone'
            value={phone}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <textarea
            type='text'
            name='comments'
            className='form-control'
            placeholder='Comentarios'
            value={comments}
            onChange={handleInputChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Guardar
        </button>
      </form>
    </div>
  );
};
