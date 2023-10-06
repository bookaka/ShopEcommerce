const api = 'http://localhost:3001/'

export const updateOrderStatus = async (id:string,status: string) => {
   try {
  
     const response = await fetch(`${api}adminOrder/updateOrderStatus/${id}`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
       body: JSON.stringify(status),
     });
  
     const responseData: {  success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};

export const getRevenueOrder = async (formData: FormGetRevenue) => {
   try {
  
     const response = await fetch(`${api}adminOrder/getRevenueOrder/`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
  
     const responseData: {  revenue: number, totalOrder: number   ,success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};

export const getOrder = async (formData:FormGetOrder) => {
   try {
  
     const response = await fetch(`${api}adminOrder/getOrder?startDate=${formData.startDate}&endDate=${formData.endDate}&status=${formData.status}&pages=${formData.page}&pageSize=${formData.pageSize}`, {
       method: "GET",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
     });
  
     const responseData: { products: ProductItemProps[],currentPage: number,totalPages: number,totalProducts: number, success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};
