"use client";

import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

import Navbar from "@/components/navbar";
import Header from "@/components/header";


export default function Home() {
  const { isAuthUser,setIsAuthUser } = useContext(GlobalContext);
  const router = useRouter()
  function handleLogout(){
    setIsAuthUser(false);
    localStorage.removeItem('user')
    Cookies.remove('token');
    console.log(isAuthUser)
    router.push("/login")

  };

  return (
    <>
      <Navbar activeLink = {0}/>
      <Header title = {"Dashboard"}/>
      
 
    </>
  )
}
