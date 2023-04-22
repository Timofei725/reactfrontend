import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseLocalState } from '../util/UseLocalStorage';

export default function AddUser() {
    const [jwt, setJwt] = UseLocalState("", "jwt");

    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        workingHours: ""
    });

    const { name, email, password, workingHours } = user;
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
        await axios.post("api/admin/users", user, { headers });
        navigate("/apiadminusers");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Добавить пользователя</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="from-label">
                                Имя
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Введите имя пользователя"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="from-label">
                                Почта
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Введите почту"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="from-label">
                                Пароль
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Введите пароль"
                                name="password"
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Text" className="from-label">
                                Продолжительность смены в часах
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Введите количество часов"
                                name="workingHours"
                                value={workingHours}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Сохранить
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/apiadminusers">
                            Отмена
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
