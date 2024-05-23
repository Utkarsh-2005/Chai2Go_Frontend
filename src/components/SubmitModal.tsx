// import axios from "axios";
// import { enqueueSnackbar } from "notistack";

interface CancelModalProps {
  orderno: number; // Assuming orderno is of type string
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
  redirect: (data: string) => void;
}


const CancelModal: React.FC<CancelModalProps>  = ({orderno, onClose, redirect}) => {

  const viewHandler = () => {
    onClose();
    redirect("view");
  }

  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()}
        className='max-w-full bg-gradient-to-br bg-white  rounded-xl p-4 flex flex-col relative justify-center'>
            <h2 className='w-fit px-5
             py-5 mb-[80px]'>Your Order No. {orderno} has been placed</h2>

        <div className="flex justify-center">
        <button type="button" className="focus:outline-none text-white bg-green-500 hover:bg-green-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]" onClick={onClose}>Order More</button>
        <button type="button" className="focus:outline-none text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]" onClick={viewHandler}>View Orders</button>
        </div>

        </div>
    </div>
  )
}

export default CancelModal;