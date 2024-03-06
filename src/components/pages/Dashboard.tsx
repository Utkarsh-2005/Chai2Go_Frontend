import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import OrderForm from '../OrderForm';
import Orders from '../Orders';

interface userInfo {
  username: string,
  password: string
}

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('place');
  const [error, setError] = useState(false);
  const [data, setData] = useState<userInfo>({
    username: '',
    password: ''
  });
  const { id } = useParams();

  const renderOption = () => {
    switch (selectedOption) {
      case 'place':
        return <OrderForm username={data.username}/>;
      case 'view':
        return <Orders username={data.username}/>;
      default:
        return null;
    }
  };
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
        setError(true);
      });}
  }, []);

  return (
    <div>
      {data && (
        <div>
          {error? 
          <div className='h-[100vh] flex justify-center items-center bg-black'>
          <div className='p-5 border-4 border-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-900 shadow-lg hover:shadow-blue-900 hover:shadow-xl hover:transition-all'>
          <h2 className='text-2xl text-white'> Invalid Access </h2>
          </div>
          </div>:
          <>
          <div className='m-5 mb-10 flex justify-between'>
            <h2>Welcome {data.username}</h2>
            <ul className='flex'>
              <li onClick={() => setSelectedOption('place')} className={`m-1 hover:cursor-pointer ${selectedOption==='place'? 'font-bold':''}`}>Place Order</li>
              <li onClick={() => setSelectedOption('view')} className={`m-1 hover:cursor-pointer ${selectedOption==='view'? 'font-bold':''}`}>View Orders</li>
            </ul>
          </div>
          <div className='flex flex-col items-center h-[100vh]'>
               {renderOption()}
          </div>
          </>
          }
        </div>
  
      )}
    </div>
  );
};

export default Home;
