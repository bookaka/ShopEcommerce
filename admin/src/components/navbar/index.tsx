import Link from 'next/link';
import { useContext, useState } from 'react';
import { GlobalContext } from "@/context";
import './style.css'



const links = [
  { name: 'Dashboard', link: '/' ,icon: 'bx bxs-dashboard'},
  { name: 'Products', link: '/products' ,icon: 'bx bxs-package'},
  { name: 'Order', link: '/order' ,icon: 'bx bxs-data'},
]

interface NavbarProps {
  activeLink: number;
}
const Navbar: React.FC<NavbarProps> = ({ activeLink }) => {
  const {activeNavbar,setActiveNavbar} = useContext(GlobalContext)


  function handleOverlayClick(){
    setActiveNavbar(!activeNavbar)
   
  }
  function handleLinkClick(){
    const overlayDiv:any = document.querySelector('.overlayok');
    // if (!overlayDiv.classList.contains('check'))
    //   setActiveNavbar(!activeNavbar)
 

   
  }


  return (
    <>
      <div className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${
      activeNavbar ? '-translate-x-full' : ''}`}>
        <Link href="/">
          <p className="flex items-center pb-4 border-b border-b-gray-800">
            <img src="/logo.png" alt="" className="w-10 h-10 rounded object-cover" />
            <span className="text-lg font-bold text-white ml-3">Boo Clother</span>
          </p>
        </Link>
        <ul className="mt-4">
          {links.map((linkItem, index) => (
            <li className={`mb-1 group ${activeLink === index ? 'active' : ''}`} key={index}>
              <Link href={linkItem.link}>
                <div
                  className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md ${
                    activeLink === index
                      ? 'group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100'
                      : ''
                  }`}
                  onClick={handleLinkClick}
                 
                >
                  <div className="w-8 h-8  flex  items-center">
                    <i className={`${linkItem.icon} w-8 h-8 mr-1 mt-3 text-lg items-center text-xl `}></i>
                  </div>
                    <span className="text-sm">{linkItem.name}</span>

                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
   
      <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden ${activeNavbar? 'check':''} `}
        onClick={handleOverlayClick}
      ></div>

    </>
  );
};

export default Navbar;
