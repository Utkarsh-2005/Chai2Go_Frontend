import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { FormEvent, useEffect, useState} from 'react';
import QuantityInput from './NumberInput';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Spinner from './Spinner';

interface OrderFormProps {
  username: string;
  orderno: (data: number) => void;
  showmodal: (data: boolean) => void;
}
interface OrderNos {
  orderno: number;
  _id: string;
  // other properties
}
// import { useEffect } from 'react';

const OrderForm : React.FC<OrderFormProps> = ({username, orderno, showmodal}) => {
  const [alignment, setAlignment] = React.useState<string | null>('');
  const [spiceAlignment, setSpiceAlignment] = React.useState<Array<string>>(() => []);
  const [sugar, setSugar] = React.useState('');
  const [container, setContainer] = React.useState('');
  const [error, setError] = React.useState(false);
  const [quantity, setQuantity] = React.useState('1');
  const [loading, setLoading] = useState(false);
  const [orderNos, setOrderNos] = useState<OrderNos[]>([]);
  const [orderNo, setOrderNo] = useState<number | undefined>(undefined);
  const errorRef = React.useRef(null);
 

  const handleQuantityChange = (value: number | undefined) => {
    setQuantity(JSON.stringify(value))
    console.log(quantity)
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  
  };
  const handlespiceAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newMultiple: string[],
  ) => {
    setSpiceAlignment(newMultiple)
    // console.log(spiceAlignment);
  };

  const handleSugar = (event: SelectChangeEvent) => {
    setSugar(event.target.value as string);
  };
  const handleContainer = (event: SelectChangeEvent) => {
    setContainer(event.target.value as string);
  };
  // const handleQuantityChange = (value: string) => {
  //   setQuantity(value); 
  // };
  useEffect(() => {
    if (orderNo !== undefined) {
      // If orderNo is updated and is not undefined, proceed with other actions
      console.log('Received updated orderNo:', orderNo);
      const data = {
        username: username,
        base: alignment,
        spice: JSON.stringify(spiceAlignment),
        sugar: sugar,
        container: container,
        quantity: quantity,
        orderno: orderNo
      }
      axios
      .post(`http://localhost:3000/view/${username}`, data)
      .then(()=> {
        // showmodal(true);
        orderno(orderNo);
        setLoading(false);
        enqueueSnackbar('Order Placed', {variant: 'success'})
        showmodal(true);
        // navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.response.data , {variant: 'error'})
        console.log(error);
      })
      // You can include any actions you want to perform when orderNo is updated here
    }
  }, [orderNo]);
  function formSubmitHandler (e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (alignment==="" || sugar==="" || container==="" || alignment===null){
      if (errorRef.current) {
        (errorRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
      return setError(true)
    }
    setError(false)
    const tokenString = localStorage.getItem('token');
    // const userString = localStorage.getItem('username');
    if (tokenString !== null) {
      // Token is not null, proceed with setting the header
      const token = JSON.parse(tokenString);
    // Set token in Axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Make a sample request using the token
    // axios.get(`http://localhost:3000/ordernos`)
    //   .then(response => {
    //     setLoading(false)
    //     setOrderNos(
    //       response.data
    //     )
    axios.get(`http://localhost:3000/ordernos`)
    .then(response => {
      setLoading(false)
      setOrderNos(
        response.data
      )  })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
      function orderNoGenerator(): number {
        let num: number;
        let unique: boolean;
    
        do {
            num = Math.floor(Math.random() * 9000) + 1000;
            unique = orderNos.every((order) => order.orderno !== num);
        } while (!unique);
    
        return num;
    }
          // console.log(num)
          setOrderNo(orderNoGenerator())
  }
          // const data = {
          //   username: username,
          //   base: alignment,
          //   spice: JSON.stringify(spiceAlignment),
          //   sugar: sugar,
          //   container: container,
          //   quantity: quantity,
          //   orderno: orderNo
          // }
          // axios
          // .post(`http://localhost:3000/view/${username}`, data)
          // .then(()=> {
          //   setLoading(false);
          //   enqueueSnackbar('Order Placed', {variant: 'success'})
          //   // navigate('/');
          // })
          // .catch((error) => {
          //   setLoading(false);
          //   enqueueSnackbar(error.response.data , {variant: 'error'})
          //   console.log(error);
          // })
      //   })
      // .catch(error => {
      //   setLoading(false);
      //   console.error('Error fetching data:', error);
      // });}
    // const data = {
    //   username: username,
    //   base: alignment,
    //   spice: JSON.stringify(spiceAlignment),
    //   sugar: sugar,
    //   container: container,
    //   quantity: quantity,
    //   orderno: orderNo
    // }
    // axios
    // .post(`http://localhost:3000/view/${username}`, data)
    // .then(()=> {
    //   setLoading(false);
    //   enqueueSnackbar('Order Placed', {variant: 'success'})
    //   // navigate('/');
    // })
    // .catch((error) => {
    //   setLoading(false);
    //   enqueueSnackbar(error.response.data , {variant: 'error'})
    //   console.log(error);
    // })
   }
  return (
    <form className='h-fit bg-slate-200 rounded-md flex flex-col items-center p-2' onSubmit={formSubmitHandler}>
      {loading ? <Spinner /> : ''}
    <label className='m-2'>What would be the base of your Tea?*</label>
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="water" aria-label="Water">
        <div className='flex flex-col'>
        <img src="https://images.unsplash.com/photo-1606214554814-e8a9f97bdbb0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW4lMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D" className='w-[150px] p-0 mb-2 rounded-sm'/>
        <p>Water</p>
        </div>
      </ToggleButton>
      <ToggleButton value="skimmed-milk" aria-label="skimmed-milk">
      <div className='flex flex-col'>
        <img src="https://www.oatmealwithafork.com/wp-content/uploads/2013/09/milk-pour.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Skimmed Milk</p>
        </div>
      </ToggleButton>
      <ToggleButton value="creamy-milk" aria-label="creamy-milk">
      <div className='flex flex-col'>
        <img src="https://static.toiimg.com/thumb/msid-73072387,width-1280,height-720,resizemode-4/73072387.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Creamy Milk</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
    <label className='m-2 mt-5'>Select Add-ons in your tea (You can select multiple)</label>
    <ToggleButtonGroup
      value={spiceAlignment}
      onChange={handlespiceAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="ginger" aria-label="ginger">
        <div className='flex flex-col'>
        <img src="https://files.nccih.nih.gov/ginger-thinkstockphotos-531052216-square.jpg" className='w-[100px] p-0 mb-2 rounded-sm'/>
        <p>Ginger</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cinnamon" aria-label="cinnamon">
      <div className='flex flex-col'>
        <img src="https://www.eatrightbasket.com/wp-content/uploads/2019/03/Cinnamon.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Cinnamon</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cardamom" aria-label="cardamom">
      <div className='flex flex-col'>
        <img src="https://www.keralaspicesonline.com/wp-content/uploads/2022/03/DSC06553-scaled.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cardamom</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cloves" aria-label="cloves">
      <div className='flex flex-col'>
        <img src="https://spicehillfarms.com/cdn/shop/products/6-_1.png?v=1681373731&width=1946" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cloves</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
    <div className='flex'>
    <Box sx={{ minWidth: 120 }} className="m-10">
      <FormControl fullWidth>
        <InputLabel id="sugar">Sugar*</InputLabel>
        <Select
          labelId="sugar"
          id="sugar"
          value={sugar}
          label="Sugar"
          onChange={handleSugar}
        >
          <MenuItem value={'none'}>None</MenuItem>
          <MenuItem value={'low'}>Low</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120 }} className="m-10">
      <FormControl fullWidth>
        <InputLabel id="container">Container*</InputLabel>
        <Select
          labelId="container"
          id="container"
          value={container}
          label="Container"
          onChange={handleContainer}
        >
          <MenuItem value={'kulhad'}>Kulhad</MenuItem>
          <MenuItem value={'paper-cup'}>Paper Cup</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <div className='flex flex-col items-center mt-[22.5px]'>
      <label className="text-sm text-gray-600 p-1">Quantity</label>
      <QuantityInput onChange={handleQuantityChange} />
    </div>
    </div>
    <Button variant='contained' type="submit">Submit</Button>
    {error? <p className='text-red-500' ref={errorRef}>Select all required fields. (*)</p>:<p ref={errorRef} className="invisible">-</p>}
    </form>
  )
  }

export default OrderForm;