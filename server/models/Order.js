import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema({
   _idUser:{
      type: String,
      required: true,
   },
   sanpham:[
      {
         _idSp: {
            type: String,
            required: true,
        },
        
        SoLuong: Number,
        Size: String,
        Gia: Number,
        GiamGia: Number,
       
      }
   ],
   DiaChiGiaoHang: String,
   ChiPhiVanChuyen: Number,
   Tongtien: Number,
   TrangThai: {
        type: String,
        default: "Đang chờ xác nhận",
    },
    TimeReal : Date,
},{timestamps: true}
)
const Order = mongoose.model('Order',OrderSchema);
export default Order;