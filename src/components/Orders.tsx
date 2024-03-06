import axios from "axios";
import { useEffect, useState} from "react";
import OrderCard from "./OrderCard";
import Spinner from "./Spinner";
// import CancelModal from "./CancelModal"

interface OrderProps {
  username: string;
}

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


const Orders : React.FC<OrderProps> = ({username}) => {
  const [data, setData] = useState<Order[]>([]);
  const [render, setReRender] = useState(false);
  const [loading, setLoading] = useState(false);

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
    axios.get(`http://localhost:3000/view/${username}/orders`)
      .then(response => {
        setLoading(false)
        setData(
          response.data
        )
        ;
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });}
      setReRender(false)
  }, [render]);

  function setreRender(data: boolean){
    setReRender(data);
  }

  return (
    <>
     {loading ===true? <div className="flex justify-center items-center w-full mt-[150px]"><Spinner /></div> : 
      data.length===0? <div className="flex justify-center items-center w-full mt-[150px]"><h2 className="font-semibold text-3xl text-gray-400">Oops! Looks like You Haven't Ordered Yet</h2></div>:
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {data.map((item) => (
        <OrderCard key={item._id} base={item.base} spice={item.spice} quantity={item.quantity} _id={item._id} username={item.username} sugar={item.sugar} container={item.container} orderno={item.orderno} rerender={setreRender}/>
      ))}
    </div>}
    </>
  )
}

export default Orders;