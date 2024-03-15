import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas'; // Import registration schema

const Register: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema, // Use registration schema
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://chai2gobackend-production.up.railway.app/register", values);
        const accessToken = response.data.accessToken;
        localStorage.setItem('token', JSON.stringify(accessToken));
        enqueueSnackbar('Registration Successful', { variant: 'success' });
      } catch (error: any) { // Specify AxiosError type for the error variable
        enqueueSnackbar(error.response?.data || 'An error occurred', { variant: 'error' });
      }
    },
  });

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gradient-to-b from-slate-200 to-white p-8 rounded-lg  shadow-blue-900 shadow-lg hover:shadow-xl hover:shadow-blue-900 hover:transition-all">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center">Register</h2>
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
          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className="border border-gray-300 rounded-md p-2 w-full mt-1"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div> */}
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
