import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';  
import NavBar from './layout/NavBar';
import AdminUsers from './pages/AdminUsers';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import AdminLunches from './pages/AdminLunches';
import EditLunch from './lunches/EditLunch';
import AddLunch from './lunches/AddLunch';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './privateRoute/PirvateRoute';
import { UseLocalState } from './util/UseLocalStorage';
import TodayLunches from './pages/TodayLunches';
import UserProfile from './users/UserProfile';
import Logout from './util/Logout';

function App() {
  const[jwt,setJwt] = UseLocalState("","jwt");

  return (
    <div className="App">
      <Router>
      <NavBar />

      <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/logout" element={<Logout />} />


        <Route exact path="/adduser" element={<PrivateRoute><AddUser/></PrivateRoute>} />
        <Route exact path="/apiadminusers" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route exact path="/edituser/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
        <Route exact path="/addlunches" element={<PrivateRoute><AddLunch /></PrivateRoute>} />
        <Route exact path="/apiadminlunches" element={<PrivateRoute><AdminLunches /></PrivateRoute>} />
        <Route exact path="/editlunch/:id" element={<PrivateRoute><EditLunch /></PrivateRoute>} />
        <Route exact path="/todaylunches" element={<PrivateRoute><TodayLunches /></PrivateRoute>} />
        <Route exact path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />


        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
