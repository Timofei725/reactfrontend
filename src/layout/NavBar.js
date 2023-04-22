import React from 'react';
import { Link } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';

export default function NavBar() {
  const [jwt, setJwt] = UseLocalState('', 'jwt');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Расписание обедов    
          </a>
          <button className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <Link className="btn btn-outline-light" to="/todaylunches">
            Обеды
          </Link>
          <Link className="btn btn-outline-light" to="/profile">
            Профиль
          </Link>
          <Link className="btn btn-outline-light" to="/apiadminlunches">
            Управлениe обедами 
            для администратора
          </Link>
          <Link className="btn btn-outline-light" to="/apiadminusers">
            Управлениe пользователями
            для администратора
          </Link>
          {jwt ? (
            <Link className="btn btn-outline-light" to="/logout">
              Выйти
            </Link>
          ) : (
            <Link className="btn btn-outline-light" to="/login">
              Войти
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
