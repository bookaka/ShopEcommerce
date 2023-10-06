import Link from 'next/link';
import { useContext, useState } from 'react';
import { GlobalContext } from "@/context";



interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
   const {activeNavbar, setActiveNavbar,activeMenuUser, setActiveMenuUser} = useContext(GlobalContext)


   function handleActiveNavbar(){
      setActiveNavbar(!activeNavbar)
      console.log(activeNavbar)
   }
   function handleMenuUser(){
      setActiveMenuUser(!activeMenuUser)
      console.log(activeMenuUser)
   }


  return (
    <>
      <div className={`w-${activeNavbar ? 'full' : 'full md:w-[calc(100%-256px)]'} ${activeNavbar ? 'md:ml-0' : 'md:ml-64'} bg-gray-50 min-h-screen transition-all`}>
        <div className="py-2 px-3 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <button type="button" className="text-lg text-gray-6000" onClick={handleActiveNavbar}>
                <i className='bx bx-menu text-lg p-2 mt-1' ></i>
            </button>
            <p className="flex items-center text-gray-800 mr-2 font-bold text-lg ">
                {title}
            </p>
            <ul className="ml-auto flex items-center">
               
                
            <div className="dropdown ml-3">
                    <button type="button" className="dropdown-toggle flex items-center"
                    onClick={handleMenuUser}>
                        <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded block object-cover align-middle"/>
                    </button>
                    <ul className={`dropdown-menu absolute translate-x-[-120px]  shadow-md shadow-black/5 z-30 py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px] ${activeMenuUser? 'bottom-[-200%]':'hidden'}`}>
                        <li>
                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
      
        </div>

    </>
  );
};

export default Header;
