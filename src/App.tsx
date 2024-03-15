import { Routes, Route } from 'react-router-dom';


import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard'
import LandingPage from './components/pages/LandingPage';
import Admin from "./components/pages/Admin"


const App = () => {
  return (
    <Routes>
    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/admin' element={<Admin/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/home/:id' element={<Dashboard/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
  </Routes>
  );
};

export default App;