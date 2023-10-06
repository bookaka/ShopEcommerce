
export const login = async (formData:FormLogin) => {
   try {
  
     const response = await fetch(`http://localhost:3001/auth/loginAdmin`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
  
     const responseData: { user: UserDataProps, token: string, success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
 };
 export const refreshToken = async()=>{
  try{
     const response = await fetch(`http://localhost:3001/auth/refreshToken`, {
      method: "GET",
      headers: {
       Accept: "application/json, text/plain, */*",
       "Content-Type": "application/json",
      },
    });
    const responseData: { token: string,message: string } = await response.json();
    
    return responseData
  }catch(error){
     console.log(error)
  }
}
export const logout = async ()=>{
  try{
    const response = await fetch(`http://localhost:3001/auth/logout`, {
     method: "POST",
     headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
     },
   });
   const responseData: { success: boolean,message: string } = await response.json();
   
   return responseData
 }catch(error){
    console.log(error)
 }
}
 