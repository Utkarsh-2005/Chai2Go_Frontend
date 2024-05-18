import { AiOutlineBorder , AiOutlineClose} from "react-icons/ai";
import CancelModal from "./CancelModal"
import {useState} from "react";

interface OrderCardProps {
  _id: string;
  username: string;
  base: string;
  spice: string;
  sugar: string;
  container: string;
  quantity: string;
  orderno: number;
  rerender: (data: boolean) => void;
}

const OrderCard: React.FC<OrderCardProps>  = (props) => {
  const [showModal, setShowModal] = useState(false);
function capitalizeAllWords(str:string) {
  str = str.replace(/-/g, ' ');
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

  function setReRender(data: boolean) {
    props.rerender(data);
  }

  return (
    <>
      {showModal && (
        <CancelModal orderno={props.orderno} id={props._id} onClose={() => setShowModal(false)} rerender={setReRender}/>
      )}
    <div className="flex flex-col m-5 p-2 bg-white h-[270px] rounded-lg shadow-lg hover:shadow-lg hover:shadow-sky-200 shadow-slate-500">
    <div className="flex justify-center m-1 mb-3">
      <h2 className="font-bold">Order No. {props.orderno}</h2>
    </div>
    <div className="flex">
      <h2 className='w-[70px] font-semibold'>Base</h2>
      <div className={`flex justify-center w-[150px] mx-1 border border-black rounded-sm ${props.base==='water'? 'bg-blue-400': props.base==='creamy-milk'? 'bg-orange-100': props.base==='skimmed-milk'? 'bg-stone-300': 'bg-transparent'}`}>
      <h2>{capitalizeAllWords(props.base)}</h2>
      </div>
    </div>
    <div className="flex">
      <h2 className='w-[80px] font-semibold'>Spice</h2>
      <div>
        <h2>
          {props.spice === "[]" ? "None" : (() => {
            const obj = JSON.parse(props.spice).map((spice: string) => spice.charAt(0).toUpperCase() + spice.slice(1) + ', ');
            let str = '';
            obj.map((char: string) => { return str += char });
            return str.slice(0, -2);
          })()}
        </h2>
      </div>
    </div>
    <div className="flex">
      <h2 className='w-[80px] font-semibold'>Sugar</h2>
      <div className="pt-1">
        {props.sugar === 'none'? <AiOutlineClose/>: props.sugar === 'low'? <AiOutlineBorder/>: props.sugar === 'medium'? <div className="flex"><AiOutlineBorder/><AiOutlineBorder/></div>: props.sugar === 'high'? <div className="flex"><AiOutlineBorder/><AiOutlineBorder/><AiOutlineBorder/></div>:''}
      </div>
    </div>
    <div className="flex">
      <h2 className='w-[80px] font-semibold'>Container</h2>
      <p>{capitalizeAllWords(props.container)}</p>
    </div>
    <div className="flex">
      <h2 className='w-[80px] font-semibold'>Quantity</h2>
      <p>{props.quantity}</p>
    </div>
    <div className="mt-auto flex justify-center"> {/* This div pushes the button to the bottom */}
      <button type="button" className="focus:outline-none text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 m-3" onClick={() => setShowModal(true)}>Cancel Order</button>
    </div>
    {/* <p>{props._id}</p> */}
  </div>
  </>
    );
    

};

export default OrderCard;