import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';
import TimePicker from 'react-time-picker';

export default function Lunch() {
  const [jwt, setJwt] = UseLocalState('', 'jwt');
  const navigate = useNavigate();

  const [lunch, setLunch] = useState({
    startTime: '',
    endTime: '',
  });

  const onInputChange = (name, value) => {
    setLunch({ ...lunch, [name]: value });
  };

  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Cache-Control': null,
    'X-Requested-With': null,
  }; 

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `api/admin/lunches`,
      {
        startTime: lunch.startTime,
        endTime: lunch.endTime,
      },
      { headers }
    );
    navigate('/apiadminlunches');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">
            Создать обеды в заданные промежутки времени
          </h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Время начала промежутка
              </label>
              <TimePicker
                name="startTime"
                value={lunch.startTime}
                onChange={(value) => onInputChange('startTime', value)}
                clearIcon={null}
                disableClock={true}
                hourPlaceholder="HH"
                minutePlaceholder="mm"
                format="HH:mm"
                step={10}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                Время конца промежутка
              </label>
              <TimePicker
                name="endTime"
                value={lunch.endTime}
                onChange={(value) => onInputChange('endTime', value)}
                clearIcon={null}
                disableClock={true}
                hourPlaceholder="HH"
                minutePlaceholder="mm"
                format="HH:mm"
                step={10}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Сохранить
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/apiadminlunches">
              Отмена
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
