const api = 'http://localhost:3001/'

export const postProduct = async (formData:FormProduct) => {
   try {
  
     const response = await fetch(`${api}adminProduct/postProduct`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
  
     const responseData: { newProduct: ProductItemProps, success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
 };
export const deleteProduct = async (id: string) => {
   try {
  
     const response = await fetch(`${api}adminProduct/deleteProduct/${id}`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
     });
  
     const responseData: { success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};

export const UpdateProduct = async (formData:ProductItemProps,id:string) => {
   try {
  
     const response = await fetch(`${api}adminProduct/UpdateProduct/${id}`, {
       method: "POST",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });
  
     const responseData: { updatedProduct: ProductItemProps, success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};

export const searchProduct = async (formData:FormSearchProduct) => {
   try {
  
     const response = await fetch(`${api}commonProduct/searchProduct?search=${formData.search}&tags=${formData.tags}&sort=${formData.sort}&colors=${formData.colors}&pages=${formData.page}&pageSize=${formData.pageSize}`, {
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

export const infProduct = async (id:string) => {
   try {
  
     const response = await fetch(`${api}commonProduct/getProduct/${id}`, {
       method: "GET",
       headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
       },
   
     });
  
     const responseData: { infProduct: ProductItemProps, success: boolean,message: string } = await response.json();
     
     return responseData
   } catch (error) {
     console.log(error);
   }
};
