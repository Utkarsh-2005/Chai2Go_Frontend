import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { useEffect } from 'react';

const OrderForm = () => {
  const [alignment, setAlignment] = React.useState<string | null>('left');
  const [spiceAlignment, setspiceAlignment] = React.useState<string | null>('left');

  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string | null,
  // ) => {
  //   setAlignment(newAlignment);
  // };
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  
  };
  useEffect(() => {
    console.log(alignment);
  }, [alignment]);
  const handlespiceAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setspiceAlignment(newAlignment);
    console.log(spiceAlignment);
  };

  return (
    <>
    <h2 className='m-2'>What would be the base of your Tea?</h2>
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="water" aria-label="left aligned">
        <div className='flex flex-col'>
        <img src="https://images.unsplash.com/photo-1606214554814-e8a9f97bdbb0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW4lMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D" className='w-[150px] p-0 mb-2 rounded-sm'/>
        <p>Water</p>
        </div>
      </ToggleButton>
      <ToggleButton value="skimmed-milk" aria-label="centered">
      <div className='flex flex-col'>
        <img src="https://www.oatmealwithafork.com/wp-content/uploads/2013/09/milk-pour.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Skimmed Milk</p>
        </div>
      </ToggleButton>
      <ToggleButton value="creamy-milk" aria-label="right aligned">
      <div className='flex flex-col'>
        <img src="https://static.toiimg.com/thumb/msid-73072387,width-1280,height-720,resizemode-4/73072387.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Creamy Milk</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
    <h2 className='m-2'>Select Add-ons in your tea (You can select multiple)</h2>
    <ToggleButtonGroup
      value={spiceAlignment}
      onChange={handlespiceAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="ginger" aria-label="left aligned">
        <div className='flex flex-col'>
        <img src="https://images.unsplash.com/photo-1606214554814-e8a9f97bdbb0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW4lMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D" className='w-[150px] p-0 mb-2 rounded-sm'/>
        <p>Ginger</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cinnamon" aria-label="centered">
      <div className='flex flex-col'>
        <img src="https://www.oatmealwithafork.com/wp-content/uploads/2013/09/milk-pour.jpg" className='w-[100px] p-0 mb-2 rounded-sm mx-7'/>
        <p>Cinnamon</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cardamom" aria-label="right aligned">
      <div className='flex flex-col'>
        <img src="https://static.toiimg.com/thumb/msid-73072387,width-1280,height-720,resizemode-4/73072387.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cardamom</p>
        </div>
      </ToggleButton>
      <ToggleButton value="cloves" aria-label="right aligned">
      <div className='flex flex-col'>
        <img src="https://static.toiimg.com/thumb/msid-73072387,width-1280,height-720,resizemode-4/73072387.jpg" className='w-[120px] p-0 mb-2 rounded-sm'/>
        <p>Cloves</p>
        </div>
      </ToggleButton>
    </ToggleButtonGroup>
    </>
  )
}

export default OrderForm;