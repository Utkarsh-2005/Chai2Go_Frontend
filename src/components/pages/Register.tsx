import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
// import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can perform actions like sending the login data to the server
    const data = {
      username,  
      password
    };
    axios
    .post("http://localhost:3000/register", data)
    .then(()=> {
      // setLoading(false);
      enqueueSnackbar('User Created', {variant: 'success'})
      // navigate('/');
    })
    .catch((error) => {
      // setLoading(false);
      enqueueSnackbar(error.response.data , {variant: 'error'})
      console.log(error);
    })
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gradient-to-b from-slate-200 to-white p-8 rounded-lg  shadow-blue-900 shadow-lg hover:shadow-xl hover:shadow-blue-900 hover:transition-all">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
            />
          </div>
          <div className='flex justify-center'>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Register
          </button>
          </div>
          <div className='flex justify-center pt-4'>
          <a href="/login" className='hover:text-blue-500 hover:underline'>Login</a>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default Register;
