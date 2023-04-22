import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';

export default function AddUser() {
  const [jwt, setJwt] = UseLocalState('', 'jwt');
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Cache-Control': null,
    'X-Requested-With': null,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/auth/register', user);
      const jwtToken = response.data.token;
      setJwt(jwtToken); 
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Регистрация</h2>

          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Имя
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите имя пользователя'
                name='name'
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Почта
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Введите почту'
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Пароль
              </label>
              <input
                type='password'
                className='form-control'
                placeholder='Введите пароль'
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className='mb-3'>
          
        
            </div>
            <button type='submit' className='btn btn-outline-primary'>
              Сохранить
            </button>
            <Link className='btn btn-outline-danger mx-2' to='/apiadminusers'>
              Отмена
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

