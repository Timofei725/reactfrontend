import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';

export default function EditLunch() {
    const[jwt,setJwt] = UseLocalState("","jwt");

    let navigate=useNavigate() 

    const{id}=useParams()

    const[lunch,setLunch]=useState({
        startTime:"",
        endTime:"",
        date:"",
        userId:""
    });
   

    const{ startTime, endTime, date,userId}=lunch 
    const onInputChange=(e)=>{
          setLunch({...lunch,[e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadLunch();
    }, []);

    const headers = { 'Authorization':`Bearer ${jwt}`,
    'Cache-Control': null,
    'X-Requested-With': null, }; 

    const onSubmit=async (e)=>{
e.preventDefault();
await axios.put(`api/admin/lunches/${userId}`, lunch, { headers });
navigate("/apiadminlunches")
    };
    
   const loadLunch=async()=>{
        const result=await axios.get(`api/admin/lunches/${id}`, { headers })
        setLunch(result.data)
    }

  return ( <div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
<h2 className="text-center m-4">Редактировать обед</h2>

<form onSubmit={(e)=>onSubmit(e)}>
<div className="mb-3">
    <label htmlFor="Name" className="from-label">
        Время начала
    </label>
    <input type={"text"} 
    className="form-control"
    placeholder="Введите время начала"
    name="startTime"
    value={startTime} 
    onChange={(e)=>onInputChange(e)}/>
</div>
<div className="mb-3">
    <label htmlFor="Email" className="from-label">
        Время конца 
    </label>
    <input type={"text"} 
    className="form-control"
    placeholder="Введите время конца"
    name="endTime"
    value={endTime}
    onChange={(e)=>onInputChange(e)} />
</div>
<div className="mb-3">
    <label htmlFor="Date" className="from-label">
        Дата
    </label>
    <input type="text"
    className="form-control"
    placeholder="Введите дату"
    name="date"
    value={date} 
    onChange={(e)=>onInputChange(e)}/>
</div>
<div className="mb-3">
    <label htmlFor="Text" className="from-label">
        id пользователя
    </label>
    <input type={"text"} 
    className="form-control"
    placeholder="Введите id пользователя"
    name="userId"
    value={userId} 
    onChange={(e)=>onInputChange(e)}/>
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