import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface CancelModalProps {
  orderno: number; // Assuming orderno is of type string
  id:string;
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
  rerender: (data: boolean) => void;
}


const CancelModal: React.FC<CancelModalProps>  = ({id, orderno, rerender, onClose}) => {

  const deleteHandler = () => {
    onClose();
    const tokenString = localStorage.getItem('token');
    // const userString = localStorage.getItem('username');
    if (tokenString !== null) {
      // Token is not null, proceed with setting the header
      const token = JSON.parse(tokenString);
    // Set token in Axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
    .delete(`https://chai2go-backend.onrender.com/view/delete/${id}`)
    .then(()=> {
      enqueueSnackbar('Order Cancelled successfully', {variant: 'success'})
    })
    .catch((error) => {
      enqueueSnackbar('Error', {variant: 'error'})
      console.log(error);
    })}
    rerender(true)
  }

  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()}
        className='max-w-full bg-white rounded-xl p-4 flex flex-col relative justify-center'>
            <h2 className='w-fit px-5
             py-5 mb-[80px]'>Are you sure you want to cancel your Order No. {orderno}?</h2>

        <div className="flex justify-center">
        <button type="button" className="focus:outline-none text-white bg-red-500 hover:bg-red-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]" onClick={deleteHandler}>Yes</button>
        <button type="button" className="focus:outline-none text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]" onClick={onClose}>No</button>
        </div>

        </div>
    </div>
  )
}

export default CancelModal;