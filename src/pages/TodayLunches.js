import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';

export default function TodayLunches() {
  const [lunches, setLunches] = useState([]);
  const [jwt, setJwt] = UseLocalState("", "jwt");

  const { id } = useParams();

  useEffect(() => {
    loadLunches();
  }, []);

  const headers = {
    'Authorization': `Bearer ${jwt}`,
    'Cache-Control': null,
    'X-Requested-With': null,
  }; 

  const setLunchOwner = async (id) => {
    for (let i = 0; i < lunches.length; i++) {
      if (lunches[i].id === id) {
        await axios.post(`api/lunches/${id}`, lunches[i], { headers });
        loadLunches();
        break;
      }
    }
  };

  const loadLunches = async () => {
    const result = await axios.get("api/lunches", { headers });
    setLunches(result.data);
  };



  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Дата</th>
              <th scope="col">Время начала</th>
              <th scope="col">Время конца</th>
              <th scope="col">Владелец</th>
              <th scope="col">Действия</th>
              <Link className="btn btn-outline-primary mx-2" to={"/addlunches"}>Добавить</Link>
            </tr>
          </thead>
          <tbody>
            {
              lunches.map((lunch, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{lunch.date}</td>
                  <td>{lunch.startTime}</td>
                  <td>{lunch.endTime}</td>
                  <td>{lunch.user ? lunch.user.name ? lunch.user.name : null : "Нету владельца"}</td>
                  <td>
                    <div>
                      {lunch.user ? (
                        <button className="btn btn-primary mx-2">Обед уже выбран</button>) :
                        <button className="btn btn-danger mx-2" onClick={() => setLunchOwner(lunch.id)}>Взять обед</button>}
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
