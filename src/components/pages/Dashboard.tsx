import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import OrderForm from '../OrderForm';

interface userInfo {
  username: string,
  password: string
}

const Home = () => {
  const [data, setData] = useState<userInfo>({
    username: '',
    password: ''
  });
  const { id } = useParams();

  useEffect(() => {
    // Retrieve token from localStorage
    const tokenString = localStorage.getItem('token');
    // const userString = localStorage.getItem('username');
    if (tokenString !== null) {
      // Token is not null, proceed with setting the header
      const token = JSON.parse(tokenString);
    // Set token in Axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Make a sample request using the token
    axios.get(`http://localhost:3000/view/${id}`)
      .then(response => {
        setData({
          username: response.data.username,
          password: response.data.password
        }
        )
        ;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });}
  }, []); // Run only once on component mount

  return (
    <div>
      {data && (
        <div>
          {data.username === ""? 
          <div className='h-[100vh] flex justify-center items-center bg-black'>
          <div className='p-5 border-4 border-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-900 shadow-lg hover:shadow-blue-900 hover:shadow-xl hover:transition-all'>
          <h2 className='text-2xl text-white'> Invalid Access </h2>
          </div>
          </div>:
          <div className='flex flex-col items-center h-[100vh]'>
          <h2 className='m-5'>Welcome {data.username}</h2>
            <OrderForm/>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default Home;
