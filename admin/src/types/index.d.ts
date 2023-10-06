

 interface UserDataProps {
   _id : string;
   email : string;
   hoten: string;
   hinhanh: string;
   SDT:string;
   diachi: string;
   gioitinh: string;
} ;
 interface CartItemProps {
   _idSP: string,
   Soluong: number,
   Size: string,
   Gia: number,
   GiamGia: number,
}

 interface ProductItemProps {
   _id: string;
   TenSp: string;
   Soluong: [
      {
        Size: string,
        Sl: number,

      }
    ],
    SoSpDaBan: number,
    Color: string,
    Mota: string [],
    HinhAnh: string [],
    Gia: number,
    GiamGia: number,
    Tag: string [],
    TimeReal : Date,
}
 interface OrderProps{
   _id: string;
   _idUser: string;
   anpham:[
      {
         _idSp: string,
        
        SoLuong: number,
        Size: string,
        Gia: number,
        GiamGia: number,
       
      }
   ],
   DiaChiGiaoHang: string,
   ChiPhiVanChuyen: number,
   Tongtien: number,
   TrangThai: string,
    TimeReal : Date,
}

/** FORM INIT TYPE */

interface  FormLogin {
  email: string;
  password: string;
}

interface FormProduct{
  TenSp: string;
  Soluong: [
     {
       Size: string,
       Sl: number,

     }
   ],
   Color: string,
   Mota: string [],
   Gia: number,
   GiamGia: number,
   Tag: string [],
}

interface FormSearchProduct {
  search: string,
  tags: string,
  sort: string,
  colors: string,
  page: number,
  pageSize: number,
}

interface FormGetRevenue{
  startDate : Date, 
  endDate: Date, 
  year: number, 
  month: number
}

interface FormGetOrder {
  startDate : Date, 
  endDate: Date, 
  status: string,
  page: number,
  pageSize: number,
}