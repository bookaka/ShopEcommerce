"use client"

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext<any>(null);


export default function GlobalState({ children }: any) {
   const [isAuthUser, setIsAuthUser] = useState<boolean|null>(null);
   const [user, setUser] = useState<UserDataProps|null>(null);
   const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
   const [activeLink, setActiveLink] = useState(0);
   const [activeNavbar, setActiveNavbar] = useState(false)
   const [activeMenuUser, setActiveMenuUser] = useState(false)


   useEffect(()=>{
      if (Cookies.get("token") !== undefined) {
         setIsAuthUser(true);
         const userData: UserDataProps = JSON.parse(localStorage.getItem("user") || "{}");

         const getCartItems:CartItemProps[] = JSON.parse(localStorage.getItem("cartItems")|| '[]') ;
         setUser(userData);
         setCartItems(getCartItems);

      }else {
         setIsAuthUser(false);
         setUser(null); //unauthenticated user
       }
     }, [Cookies]);
     



   return(
      <GlobalContext.Provider
         value={{
            isAuthUser,
            setIsAuthUser,
            user,
            setUser,
            cartItems,
            setCartItems,
            activeLink,
            setActiveLink,
            activeNavbar,
            setActiveNavbar,
            activeMenuUser, 
            setActiveMenuUser,
         }}
   >
      {children}
   </GlobalContext.Provider>
   );
   
}

