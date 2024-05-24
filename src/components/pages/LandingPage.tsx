import './Landing.css'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from 'react-icons/fa';
import { IconContext } from "react-icons";

const LandingPage = () => {
  return (
<div className="h-fit items-center justify-between cursor-default select-none flex bg-slate-700 flex-col sm:flex-row relative">
<IconContext.Provider value={{ color: "white", size: "2em"}}>
  <div className="flex top-0 absolute w-screen justify-center sm:mt-5 mt-[50px]">
    <div className="flex sm:justify-between justify-center sm:w-[100px] w-screen sm:ml-[300px] 2xl:invisible">
    <a href="https://github.com/Utkarsh-2005">
      <FaGithub className='hover:scale-105 duration-300 text-[1.5em] sm:text-[1em] mx-2'/>
    </a>
    <a href="https://www.linkedin.com/in/utkarsh-jha-002b23266/">
      <FaLinkedin className='hover:scale-105 duration-300 text-[1.5em] sm:text-[1em] mx-2'/>
    </a>
    </div>
  </div>
</IconContext.Provider>
  <div className='flex flex-col items-center h-screen xl:w-[40%] lg:w-[70%] sm:w-[99%] w-full' style={{ backgroundColor: '#1f3145' }}>
  <div className="flex flex-col h-screen justify-center items-center">
  <div className="p-10 flex flex-col text-white items-start w-fit">
  <img src="/logo.jpeg" className="sm:h-fit w-fit pt-[40px] sm:p-0 p-10"/>  
  <p className="text-center w-full mt-1 roboto">Blended to your Taste</p>
  </div>
  <ul className="flex flex-col items-center space-y-4 w-fit">
    <li>
      <a href="/login">
        <button className="bg-[#2b4f8a] rounded-xl text-white py-2 hover:scale-105 duration-300 w-[200px] mb-5">
          Login</button>
      </a>
    </li>
    <li className='border-t border-white'>
    <div className="mt-4 text-xs flex justify-between items-center text-[#002D74]">
        <p className='text-white mx-2'>Don't have an account?</p>
        <a href="/register">
        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 mx-2">Register</button>
        </a>
      </div>
    </li>
  </ul>
  </div>
  </div>
  <div className='text-white dancing text-3xl 2xl:text-6xl w-full flex justify-center sm:py-0 py-[100px] sm:px-0 px-[100px] bg-gradient-to-b from-[#1f3145] from-20% to-slate-700 sm:bg-none'>
  <IconContext.Provider value={{ color: "white", size: "1em"}}>
  <div className="flex top-0 absolute w-fit justify-center sm:mt-5 mt-[50px]">
    <div className="2xl:flex sm:justify-between justify-center sm:w-[100px] w-screen hidden">
    <a href="https://github.com/Utkarsh-2005">
      <FaGithub className='hover:scale-105 duration-300 text-[1.5em] sm:text-[1em] mx-2'/>
    </a>
    <a href="https://www.linkedin.com/in/utkarsh-jha-002b23266/">
      <FaLinkedin className='hover:scale-105 duration-300 text-[1.5em] sm:text-[1em] mx-2'/>
    </a>
    </div>
  </div>
</IconContext.Provider>
    <p className='max-w-[500px] lg:p-1 sm:p-4'>We know each person likes their chai their own way and aim to deliver that to you. Customize your chai according to your prefernces and choose from the variety of add-ons and other options and we will get it ready within a few minutes.</p>
  </div>
</div>
 

  )
}

export default LandingPage;