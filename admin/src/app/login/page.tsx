"use client"

import  { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

import { login } from "@/services/login";


const initialFormLogin: FormLogin = {
   email: "",
   password: "",
 };

interface LoginResponse{
  user: UserDataProps,
  token: string,
  success: boolean,
  message: string
}

export default function Login(){
   const [formData, setFormData] = useState(initialFormLogin);
   const [error, setError] = useState<string>("");
   const [emailError, setEmailError] = useState<string>("");
   const [passwordError, setPasswordError] = useState<string>("");
   const {
      isAuthUser,
      setIsAuthUser,
      user,
      setUser,
    } = useContext(GlobalContext);
    const router = useRouter();

    function handleKeyPress(event:any) {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        handleLogin(); 
      }
    }

    async function handleLogin() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!formData.email) {
        setEmailError("Email is required");
        return;
      }
      
      if (!formData.password) {
        setPasswordError("Password is required");
        return;
      }
      if (!emailRegex.test(formData.email)){
        setEmailError("Email is not valid");
        return;
      }
      const loginRespone = await login(formData) as LoginResponse;
      if (loginRespone.success){
        setIsAuthUser(true);
        setUser(loginRespone.user)
        Cookies.set("token", loginRespone.token);
        localStorage.setItem("user", JSON.stringify(loginRespone.user));
      } else{
        setIsAuthUser(false);
        setError(`${loginRespone.message}`);
      }
     }
    useEffect(() => {
      if (isAuthUser) router.push("/");
    }, [isAuthUser]);
     
     return (
       <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-20 h-20 mr-2" src="/logo.png" alt="logo" />
            Boo Clother    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex flex-col items-center justify-center">
                Login Admin
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${emailError ? 'border-red-500' : ''}`}
                    placeholder="Name@BooClother.com"
                    required
                    value = {formData.email}
                    onKeyPress={handleKeyPress}
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                      setError('')
                      setEmailError('')
                    }}
                    
                    />
                    {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${passwordError ? 'border-red-500' : ''}`}
                    required
                    value = {formData.password}
                    onChange={(e)=>{
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                      setError('')
                      setPasswordError('')

                    }}
                    onKeyPress={handleKeyPress}
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
      
                  
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in



                                  
                </button>
                
              </form>
            </div>
          </div>
        </div>
 </section>
 
     )
} 
