import React from 'react'
import { UseLocalState } from '../util/UseLocalStorage';
import { Navigate} from 'react-router-dom';

const PrivateRoute =({children})=> {
    const [jwt,setJwt] = UseLocalState("","jwt");
  return jwt ? children : <Navigate to="/login" />;
};
export default PrivateRoute