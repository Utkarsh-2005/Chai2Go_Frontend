import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import OrderForm from '../OrderForm';
import Orders from '../Orders';
// import { number } from 'yup';
import SubmitModal from '../SubmitModal';
import ClientConfirmModal from '../ClientConfirmModal';

interface userInfo {
  username: string,
  password: string,
}

// interface dashBoardProps {
//   username: string,
//   orderno: (data: number) => void
// }

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('place');
  const [error, setError] = useState(false);
  const [orderNo, setOrderNo] = useState<number>(0);
  const [confirmedOrderNo, setConfirmedOrderNo] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [render, setRender] = useState(false);
  const [message, setMessage] = useState('')
  const [data, setData] = useState<userInfo>({
    username: '',
    password: ''
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a socket connection
    const newSocket = io('https://chai2go-backend.onrender.com/'); // Replace with your server URL
    setSocket(newSocket);
  
    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  

  useEffect(() => {
    if (socket) {
      // console.log('hey')
      // Listen for 'order_confirmed' event from the server
      socket.on('order_confirmed', (orderData) => {
        if (orderData.username === data.username){
        console.log({orderData});
        setConfirmedOrderNo(orderData.orderno)
        setMessage(orderData.message)
        setShowClientModal(true)
        setRender(true)
        // Update UI or take appropriate action
    }});
    }
  }, [socket]);
  
  // function setReload(data: boolean){
  //   setRender(data);
  // }
  function reloadHandler(data: boolean){
    setRender(data);
  }
  function orderHandler(data: number){
    setOrderNo(data);
  }

  function modalHandler(data: boolean){
    setShowModal(data);
  }

  function redirectHandler(data: string){
    setSelectedOption(data);
  }
  const { id } = useParams();

  // const renderOption = () => {
  //   switch (selectedOption) {
  //     case 'place':
  //       // function orderHandler(data: number){
  //       //   setOrderNo(data);
  //       // }

  //       // function modalHandler(data: boolean){
  //       //   setShowModal(data);
  //       // }

  //       // function redirectHandler(data: string){
  //       //   setSelectedOption(data);
  //       // }

  //       return <>{showModal && (
  //         <SubmitModal orderno={orderNo} onClose={() => setShowModal(false)} redirect={redirectHandler}/>
  //       )}
  //     <OrderForm username={data.username} orderno={orderHandler} showmodal={modalHandler}/></>;
  //     case 'view':
  //       return <Orders username={data.username}/>;
  //     default:
  //       return null;
  //   }
  // };
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
    axios.get(`https://chai2go-backend.onrender.com/view/${id}`)
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
    <div className='hover:cursor-default'>
      {data && (
          <>
          {error? 
          <div className='h-[100vh] flex justify-center items-center bg-black'>
          <div className='p-5 border-4 border-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-900 shadow-lg hover:shadow-blue-900 hover:shadow-xl hover:transition-all hover:cursor-default'>
          <h2 className='text-2xl text-white'> Invalid Access </h2>
          </div>
          </div>:
          <div className='min-h-full'>
          {showClientModal && (
            <ClientConfirmModal orderno={confirmedOrderNo} message={message} onClose={() => setShowClientModal(false)}/>)}
          <div className="p-5 pb-10 flex justify-between text-white bg-gradient-to-b from-black to-slate-900 sm:sticky sm:top-0">
            <h2 className='m-1'>Welcome {data.username}</h2>
            <ul className='flex'>
              <li onClick={() => setSelectedOption('place')} className={`m-1 hover:cursor-pointer ${selectedOption==='place'? 'font-bold':''}`}>Place Order</li>
              <li onClick={() => setSelectedOption('view')} className={`m-1 hover:cursor-pointer ${selectedOption==='view'? 'font-bold':''}`}>View Orders</li>
            </ul>
          </div>
          <div className='h-full flex justify-center bg-slate-800'>
               {selectedOption==="place"? <> {showModal && (
          <SubmitModal orderno={orderNo} onClose={() => setShowModal(false)} redirect={redirectHandler}/>)}

          <OrderForm username={data.username} orderno={orderHandler} showmodal={modalHandler}/></>:
          <Orders username={data.username} reload={render} reloadUp={reloadHandler}/>}
              </div>
              </div>
              }
      
      </>
      )}
    </div>
  );
};
export default Dashboard;
