import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas';

const Login: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://chai2go-backend.onrender.com/login", values);
        const accessToken = response.data.accessToken;
        localStorage.setItem('token', JSON.stringify(accessToken));
        enqueueSnackbar('Login Successful', { variant: 'success' });
        if (values.username==="Admin321"){
           navigate('/admin')
        }else{
        navigate(`/home/${values.username}`)};
      } catch (error: any) { // Specify AxiosError type for the error variable
        enqueueSnackbar(error.response?.data || 'An error occurred', { variant: 'error' });
        console.log(error)
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#1f3145] flex justify-center items-center">
      <div className="bg-gradient-to-b from-slate-200 to-white p-8 rounded-lg  shadow-cyan-900 shadow-lg hover:shadow-xl hover:shadow-cyan-900 hover:transition-all">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps('username')}
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps('password')}
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
