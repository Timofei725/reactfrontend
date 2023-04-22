import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UseLocalState } from '../util/UseLocalStorage';



export default function AdminUsers() {
    const[users,setUsers]=useState([]);
    const[jwt,setJwt] = UseLocalState("","jwt");

    const{id}=useParams 

    useEffect(()=>{
      return ()=>{ loadUsers()}
        },[]);

    

        const headers = {
          'Authorization': `Bearer ${jwt}`,
          'Cache-Control': null,
          'X-Requested-With': null,
        };
    const loadUsers=async()=>{     
        const result=await axios.get("api/admin/users", { headers })
        setUsers(result.data)
       
    };
    const deleteUser=async (id)=>{
      await axios.delete(`api/admin/users/${id}`,{headers})
      loadUsers()
    }
  return (
    
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Имя</th>
      <th scope="col">id</th>
      <th scope="col">Почта</th>
      <th scope="col">Часы работы</th>
      <th scope="col">Действия</th>
      <Link className="btn btn-outline-primary mx-2"
to={"/adduser"}
>Добавить 
    </Link>
    </tr>      
  </thead>
  <tbody>
    {
        users.map((user,index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.workingHours}</td>
            <td>
                <Link className="btn btn-outline-primary mx-2"
                to={`/edituser/${user.id}`}
                >Редактировать
                    </Link>
                <button className="btn btn-danger mx-2"
                onClick={()=>deleteUser(user.id)}
                >Удалить</button>
            </td>
          </tr>
        ))}
   
    
  </tbody>
</table>

        </div>
        </div>
  );
}
