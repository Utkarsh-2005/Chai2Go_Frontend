import { useState } from "react";

interface ClientConfirmModalProps {
  orderno: number; // Assuming orderno is of type string
  message: string;
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
}


const ClientConfirmModal: React.FC<ClientConfirmModalProps>  = ({orderno, message, onClose}) => {


  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
        <div onClick={(event) => event.stopPropagation()}
        className=' bg-white rounded-xl p-4 flex flex-col relative justify-center lg:min-w-[300px] sm:px-[50px] items-center max-w-[500px]'>
            <h2 className={`w-fit px-5
             py-4 font-bold ${message === "" ? "mb-[80px]":""}`}>Your Order No. {orderno} has been Confirmed!</h2>
          {message !== "" ? <><p className="text-gray-500">Message from Admin:</p>
          <p className="h-[80px] py-2 font-semibold">{message}</p></>:""}
        <div className="flex justify-center">
        <button type="button" className="focus:outline-none text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]" onClick={onClose}>Okay</button>
        </div>

        </div>
    </div>
  )
}

export default ClientConfirmModal;