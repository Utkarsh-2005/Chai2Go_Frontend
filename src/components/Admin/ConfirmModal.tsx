import React, { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface ConfirmModalProps {
  orderno: number; // Assuming orderno is of type string
  id: string;
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
  rerender: (data: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  id,
  orderno,
  rerender,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState(""); // State to store input value

  const deleteHandler = () => {
    onClose();
    const tokenString = localStorage.getItem("token");
    if (tokenString !== null) {
      const token = JSON.parse(tokenString);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .delete(`https://chai2go-backend.onrender.com/admin/delete/${id}`)
        .then(() => {
          const data = {
            message: inputValue
          }
          axios
          .post(`https://chai2go-backend.onrender.com/admin/message/${id}`, data)
          .then(()=> {
            enqueueSnackbar("Order Confirmed", { variant: "success" });
          }).catch((error) => {
            enqueueSnackbar(error.response.data , {variant: 'error'})
            console.log(error);
          })
        })
        .catch((error) => {
          enqueueSnackbar("Error", { variant: "error" });
          console.log(error);
        });
    }
    rerender(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update input value
    // console.log(inputValue)
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className=" bg-white rounded-xl p-4 flex flex-col relative justify-center lg:min-w-[400px] sm:px-[100px] items-center"
      >
        <h2 className="w-fit px-5 py-5">Confirm Order No. {orderno}?</h2>

        <div className="flex flex-col justify-center">
          <input
            type="text"
            className="peer h-10 rounded-md bg-gray-50 px-4 w-[255px] font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400 mb-[30px]"
            placeholder="Type your optional message here"
            value={inputValue} // Bind input value to state
            onChange={handleInputChange} // Call handleInputChange on change
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-500 hover:bg-green-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]"
              onClick={deleteHandler}
            >
              Yes
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 m-3 max-w-[100px]"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
