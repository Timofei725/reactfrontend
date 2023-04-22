import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import moment from 'moment';

export default function AdminLunches() {
  const [lunches, setLunches] = useState([]);
  const [jwt, setJwt] = UseLocalState("", "jwt");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    loadLunches();
  }, [startTime, endTime, date]);

  const headers = {
    'Authorization': `Bearer ${jwt}`,
    'Cache-Control': null,
    'X-Requested-With': null,
  };

  const loadLunches = async () => {
    let selectedDate = date;
    let startTimeFormatted = startTime ? moment(startTime, 'HH:mm').format('HH:mm') : undefined;
    let endTimeFormatted = endTime ? moment(endTime, 'HH:mm').format('HH:mm') : undefined;
  
    if (!startTimeFormatted && !endTimeFormatted) {
      selectedDate = moment(selectedDate).startOf('day');
    }
  
    const response = await axios.get('api/admin/lunches/filter', {
      params: {
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        date: moment(selectedDate).format('DD-MM-YYYY')
      },
      headers: headers
    });
    setLunches(response.data);
  };
  

  const deleteLunch = async (id) => {
    await axios.delete(`api/admin/lunches/${id}`, { headers });
    loadLunches();
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    
    <div className='container'>
    <div className="my-3 d-flex justify-content-between align-items-center">
        <div>
    

          <label className="me-2">Время начала</label>
          <TimePicker
            value={startTime}
            onChange={handleStartTimeChange}
            disableClock={true}
            format={"HH:mm"}
          />
        </div>
        <div>
          <label className="me-2">Время конца</label>
          <TimePicker
            value={endTime}
            onChange={handleEndTimeChange}
            disableClock={true}
            format={"HH:mm"}
          />
        </div>
        <div>
          <label className="me-2">Дата</label>
          <DatePicker
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <Link className="btn btn-outline-primary mx-2" to={"/addlunches"}>Добавить</Link>
      </div>

      <table className="table border shadow my-3">
        <thead className="thead-light">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Дата</th>
        <th scope="col">Время начала</th>
        <th scope="col">Время окончания</th>
        <th scope="col">Владелец</th>
        <th scope="col">Действия</th>
    </tr>
</thead>
<tbody>
    {lunches.map((lunch, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{lunch.date}</td>
            <td>{lunch.startTime}</td>
            <td>{lunch.endTime}</td>
            <td>{lunch.user ? lunch.user.name ? lunch.user.name :null : "Нету владельца" }</td>
            <td>
              <Link className="btn btn-outline-primary mx-2"
                  to={`/editlunch/${lunch.id}`}
                >Редактировать
                </Link>
                <button
    className="btn btn-sm btn-danger"
    onClick={() => deleteLunch(lunch.id)}
>
    Удалить
</button>

            </td>
        </tr>
    ))}
</tbody>
</table>
</div>
  );
}