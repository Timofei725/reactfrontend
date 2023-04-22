import { UseLocalState } from './UseLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const [jwt, setJwt] = UseLocalState('', 'jwt');

  const handleLogout = () => {
    setJwt('');
    localStorage.removeItem('jwt');
    navigate('/login');
  };
  

  return (
    <div>
      <h1>Выход из системы</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
