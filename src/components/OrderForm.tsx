import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import React, { FormEvent, useEffect, useState, useRef} from 'react';
import QuantityInput from './NumberInput';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Spinner from './Spinner';
import { Pagination, Navigation} from 'swiper/modules';
import SwiperCore from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css'; 
import { SwiperRef } from 'swiper/react'; 


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
  SwiperCore.use([Pagination, Navigation]);
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      
      // Cast to any to bypass type checking for internal properties
      (swiperInstance as any).params.touchStartPreventDefault = false;
      (swiperInstance as any).touchEventsData.formElements = 'undefined';
    }
  }, []);
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
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  
  };
  const handlespiceAlignment = (
    _event: React.MouseEvent<HTMLElement>,
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
      .post(`https://chai2go-backend.onrender.com/view/${username}`, data)
      .then(()=> {
        // showmodal(true);
        orderno(orderNo);
        setLoading(false);
        enqueueSnackbar('Order Placed', {variant: 'success'})
        showmodal(true);
        // navigate('/');
        setAlignment('')
        setSpiceAlignment([])
        setSugar('')
        setContainer('')
        setQuantity('1')
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.slideTo(0);  // Navigate to the first slide
        }
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
    axios.get(`https://chai2go-backend.onrender.com/ordernos`)
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
    // <form className='h-fit bg-slate-200 rounded-md flex flex-col items-center p-2' onSubmit={formSubmitHandler}>
    //   {loading ? <Spinner /> : ''}
    // <label className='m-2'>What would be the base of your Tea?*</label>
    // <ToggleButtonGroup
    //   value={alignment}
    //   exclusive
    //   onChange={handleAlignment}
    //   aria-label="text alignment"
    // >
    //   <ToggleButton value="water" aria-label="Water">
    //     <div className='flex flex-col'>
    //     <img src="/water.jpg" className='w-[150px] p-0 mb-2 rounded-sm'/>
    //     <p>Water</p>
    //     </div>
    //   </ToggleButton>
    //   <ToggleButton value="skimmed-milk" aria-label="skimmed-milk">
    //   <div className='flex flex-col'>
    //     <img src="/skimmed.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
    //     <p>Skimmed Milk</p>
    //     </div>
    //   </ToggleButton>
    //   <ToggleButton value="creamy-milk" aria-label="creamy-milk">
    //   <div className='flex flex-col'>
    //     <img src="/creamy.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
    //     <p>Creamy Milk</p>
    //     </div>
    //   </ToggleButton>
    // </ToggleButtonGroup>
    // <label className='m-2 mt-5'>Select Add-ons in your tea (You can select multiple)</label>
    // <ToggleButtonGroup
    //   value={spiceAlignment}
    //   onChange={handlespiceAlignment}
    //   aria-label="text alignment"
    // >
    //   <ToggleButton value="ginger" aria-label="ginger">
    //     <div className='flex flex-col'>
    //     <img src="/ginger.jpg" className='w-[100px] p-0 mb-2 rounded-sm'/>
    //     <p>Ginger</p>
    //     </div>
    //   </ToggleButton>
    //   <ToggleButton value="cinnamon" aria-label="cinnamon">
    //   <div className='flex flex-col'>
    //     <img src="/cinnamon.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
    //     <p>Cinnamon</p>
    //     </div>
    //   </ToggleButton>
    //   <ToggleButton value="cardamom" aria-label="cardamom">
    //   <div className='flex flex-col'>
    //     <img src="/cardamom.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
    //     <p>Cardamom</p>
    //     </div>
    //   </ToggleButton>
    //   <ToggleButton value="cloves" aria-label="cloves">
    //   <div className='flex flex-col'>
    //     <img src="/cloves.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
    //     <p>Cloves</p>
    //     </div>
    //   </ToggleButton>
    // </ToggleButtonGroup>
    // <div className='flex'>
    // <Box sx={{ minWidth: 120 }} className="m-10">
    //   <FormControl fullWidth>
    //     <InputLabel id="sugar">Sugar*</InputLabel>
    //     <Select
    //       labelId="sugar"
    //       id="sugar"
    //       value={sugar}
    //       label="Sugar"
    //       onChange={handleSugar}
    //     >
    //       <MenuItem value={'none'}>None</MenuItem>
    //       <MenuItem value={'low'}>Low</MenuItem>
    //       <MenuItem value={'medium'}>Medium</MenuItem>
    //       <MenuItem value={'high'}>High</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Box>
    // <Box sx={{ minWidth: 120 }} className="m-10">
    //   <FormControl fullWidth>
    //     <InputLabel id="container">Container*</InputLabel>
    //     <Select
    //       labelId="container"
    //       id="container"
    //       value={container}
    //       label="Container"
    //       onChange={handleContainer}
    //     >
    //       <MenuItem value={'kulhad'}>Kulhad</MenuItem>
    //       <MenuItem value={'paper-cup'}>Paper Cup</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Box>
    // <div className='flex flex-col items-center mt-[22.5px]'>
    //   <label className="text-sm text-gray-600 p-1">Quantity</label>
    //   <QuantityInput onChange={handleQuantityChange} />
    // </div>
    // </div>
    // <Button variant='contained' type="submit">Submit</Button>
    // {error? <p className='text-red-500' ref={errorRef}>Select all required fields. (*)</p>:<p ref={errorRef} className="invisible">-</p>}
    //  </form>
      <div className="h-screen flex items-center">
       <form className='h-fit rounded-md' onSubmit={formSubmitHandler}>
      {loading ? <Spinner /> : ''}
      <Swiper
      ref={swiperRef}
      centeredSlides={true}
      slidesPerView={1}
      loop={false}
      navigation={true}
      spaceBetween={50}
      pagination={{ clickable: true }}
      className='max-w-[1000px] w-screen sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]'
      touchStartForcePreventDefault={false}>
      <SwiperSlide className='my-auto p-10 sm:p-2'><div className='flex flex-col bg-white items-center p-5 max-w-[700px] mx-auto justify-center'>
      <h1 className='text-lg sm:text-3xl mb-10'>Let's begin with your order</h1>
      <label className='m-2'>What would be the base of your Tea?*</label>
   <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      className="flex sm:flex-row flex-col space-y-4"
    >
      <ToggleButton value="water" aria-label="Water">
        <div className='flex flex-col'>
        <img src="/water.jpg" className='w-[150px] p-0 mb-2 rounded-sm'/>
        <p>Water</p>
        </div>
      </ToggleButton>
      <ToggleButton value="skimmed-milk" aria-label="skimmed-milk">
      <div className='flex flex-col'>
        <img src="/skimmed.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Skimmed Milk</p>
        </div>
      </ToggleButton>
      <ToggleButton value="creamy-milk" aria-label="creamy-milk">
      <div className='flex flex-col'>
        <img src="/creamy.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Creamy Milk</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup></div></SwiperSlide>
    <SwiperSlide className='my-auto p-10 sm:p-2'><div className='flex flex-col bg-white items-center p-5 max-w-[700px] mx-auto my-auto'> <label className='m-2 mt-5'>Select Add-ons in your tea (You can select multiple)</label>
     <ToggleButtonGroup
      value={spiceAlignment}
      onChange={handlespiceAlignment}
      aria-label="text alignment"
      className="flex flex-col sm:flex-row space-y-4"
    >
      <ToggleButton value="ginger" aria-label="ginger">
        <div className='flex flex-col'>
        <img src="/ginger.jpg" className='w-[100px] p-0 mb-2 rounded-sm'/>
        <p>Ginger</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cinnamon" aria-label="cinnamon">
      <div className='flex flex-col'>
        <img src="/cinnamon.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Cinnamon</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cardamom" aria-label="cardamom">
      <div className='flex flex-col'>
        <img src="/cardamom.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cardamom</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cloves" aria-label="cloves">
      <div className='flex flex-col'>
        <img src="/cloves.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cloves</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup></div></SwiperSlide>
    <SwiperSlide className='my-auto p-10 sm:p-2'><div className=' bg-white p-5 max-w-[700px] mx-auto flex flex-col my-auto items-center'>
    <label className='m-2 mt-5'>Give us a few more details</label>
      <div className='flex mb-5 flex-col sm:flex-row'>    
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
    
    <Button variant='contained' type="submit" className='w-[150px]'>Order Now</Button></div>
   </SwiperSlide>
    {error? <p className='text-red-500 text-center mb-5' ref={errorRef}>Select all required fields. (*)</p>:<p ref={errorRef} className="invisible">-</p>}
    </Swiper> 
    </form>
    </div>
  )
  }

export default OrderForm;