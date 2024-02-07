import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from 'react-router-dom'


import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home/:id' element={<Dashboard/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Route>
  ))

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;