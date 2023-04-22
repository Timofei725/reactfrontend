import React, { useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import { Link  } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = UseLocalState('', 'jwt');

  function sendLoginRequest() {
    const reqBody = {
      email: email,
      password: password,
    };

    fetch('api/auth/authenticate', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          throw new Error('Неверный логин или пароль');
        } else {
          throw new Error('Ошибка авторизации');
        }
      })
      .then((responseJson) => {
        setJwt(responseJson.token);
        window.location.href = '/todaylunches';
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }

  return (
    
    <div className="container">

      <div className="row">


        
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <Link className="btn btn-outline-primary mx-2" to={"/register"}>Зарегистрироваться</Link>

          <h2 className="text-center m-4">Авторизация</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Почта
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              id="submit"
              type="button"
              className="btn btn-primary w-100"
              onClick={() => sendLoginRequest()}
            >
              Авторизоваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
