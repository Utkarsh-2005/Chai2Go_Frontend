import axios from "axios";
import { useEffect, useState} from "react";
import OrderViewCard from "../Admin/OrderViewCard";
import Spinner from "../Spinner";
import { io, Socket } from 'socket.io-client';
import { enqueueSnackbar } from 'notistack';
// import CancelModal from "./CancelModal"



interface Order {
  _id: string;
  username: string;
  base: string;
  spice: string;
  sugar: string;
  container: string;
  quantity: string;
  orderno: number;
}


const Admin = () => {
  const [data, setData] = useState<Order[]>([]);
  const [render, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  
  useEffect(() => {
    // Create a socket connection
    const newSocket = io('https://chai2gobackend-production.up.railway.app'); // Replace with your server URL
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
      socket.on('order_cancelled', (data) => {
      enqueueSnackbar(`Order No. ${data.orderno} has been cancelled`, {variant: 'success'})
        setReRender(true);
        // Update UI or take appropriate action
      });
      socket.on('order_placed', (data) => {
        enqueueSnackbar(`Order No. ${data.orderno} has been placed`, {variant: 'success'})
          setLoading(true);
          setReRender(true);

          // Update UI or take appropriate action
        });
        setLoading(true);
    }
  }, [socket]);

  useEffect(() => {
    setLoading(true);
    // Retrieve token from localStorage
    const tokenString = localStorage.getItem('token');
    // const userString = localStorage.getItem('username');
    if (tokenString !== null) {
      // Token is not null, proceed with setting the header
      const token = JSON.parse(tokenString);
    // Set token in Axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Make a sample request using the token
    axios.get(`https://chai2gobackend-production.up.railway.app/admin`)
      .then(response => {
        setLoading(false)
        setData(
          response.data
        )
        ;
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        console.error('Error fetching data:', error);
      });}
      setReRender(false)
  }, [render]);

  function setreRender(data: boolean){
    setReRender(data);
  }

  return (
    <>
     {error? 
          <div className='h-[100vh] flex justify-center items-center bg-black'>
          <div className='p-5 border-4 border-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-900 shadow-lg hover:shadow-blue-900 hover:shadow-xl hover:transition-all hover:cursor-default'>
          <h2 className='text-2xl text-white'> Not Allowed Baby </h2>
          </div>
          </div>:loading ===true? <div className="flex justify-center items-center h-screen"><Spinner /></div> :
      data.length===0? <div className="flex justify-center items-center mt-[150px]"><h2 className="font-semibold text-3xl text-gray-400">Oops! Looks like You Haven't Ordered Yet</h2></div>:
      <>
      <h1 className="text-center text-3xl m-5">Confirm Orders from here</h1>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-zinc-300'>
      {data.map((item) => (
        <OrderViewCard key={item._id} base={item.base} spice={item.spice} quantity={item.quantity} _id={item._id} username={item.username} sugar={item.sugar} container={item.container} orderno={item.orderno} rerender={setreRender}/>
      ))}
    </div></>}
    </>
  )
}

export default Admin;