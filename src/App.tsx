import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard'
import LandingPage from './components/pages/LandingPage';
import Admin from "./components/pages/Admin"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home/:id' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
  </Route>
  )
);

const App = () => {
  return (
    <>
         <RouterProvider router={router} />
    </>
  );
};

export default App;