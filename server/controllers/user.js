import bcrypt from 'bcrypt'


import { UploadSingle, deleteImage } from "../components/UploadImage.js";
import { ConvertTimeZone } from "../components/ConvertTimeZone.js";


import User from "../models/User.js";
import Order from '../models/Order.js';
import Product from '../models/Product.js';
/** Update Infor User  */

export const UpdateInforUser = async (req,res) =>{ 
   try{
      const idU = req.user.id;
      const updateUser = req.body;
      const image = req.files[0];
      const urlImage ='';
      const user = await User.findById(idU);
      if (!user) return res.status(404).json({message:' User not found'});
      if (image)  {
         urlImage = UploadSingle(image);
         if (user.hinhanh) {
            deleteImage(user.hinhanh);
            
         }
         user.hinhanh = urlImage;
      }
      user.hoten = updateUser.hoten;
      user.SDT = updateUser.SDT;
      user.diachi = updateUser.diachi;
      user.gioitinh = updateUser.gioitinh;
      const newUser = await  user.save();
      res.json({newUser,success: true});
   }catch(e){
      res.status(500).json({ message: e.message });
   }
}

/** Change Password */

export const ChangePassword = async (req,res) =>{
   try{
      const idU = req.user.id;
      const {currentPass, newPass} = req.body;
      const user = await User.findById(idU);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
       }
      const isPass = await bcrypt.compare(currentPass, user.pass);
      if (!isPass) {
         return res.status(401).json({ message: 'Password invalid' });
       }
      const sailt = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(newPass,sailt);
      user.pass = passHash;
      await user.save();
      newPass = undefined;
      currentPass = undefined;
      return res.status(200).json({ success: true });

   }catch(e){
      res.status(500).json({ message: e.message });
   }
}


/** get cart */

export const getCart = async (req, res) => {
   try {
      const idU = req.user.id;
      const user = await User.findById(idU);

      if (!user) {
         return res.status(404).json({ message: 'User not found!' });
      }

      const cart = user.giohang;

      return res.status(200).json({cart,success: true});
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

/** Add Product to Cart */

export const AddProductToCart = async (req, res) => {
   try {
      const idU = req.user.id;
      const user = await User.findById(idU);

      if (!user) {
         return res.status(404).json({ message: 'User not found!' });
      }
      const product = req.body;
      const newProduct = {
         _idSP: product.id,
        Soluong:product.Soluong ,
        Size: product.Size,
        Gia: product.Gia,
        GiamGia: product.giamGia,
      }
      Carts = user.giohang;
      Carts.unshift(newProduct);
      user.giohang = Carts;
      await user.save();
      res.status(200).json({Carts,success:true});

      
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
/** Delete Product in cart  */
export const DeleteProductInCart = async (req, res) => {
   try {
      const idU = req.user.id;
      const user = await User.findById(idU);

      if (!user) {
         return res.status(404).json({ message: 'User not found!' });
      }
      const index = req.params.index;
      user.giohang.splice(index, 1);
      res.status(200).json({success: true});

      
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

/** get order */
export const getOrder = async (req, res) => {
   try {
      const idU = req.user.id;
      const user = await User.findById(idU);

      if (!user) {
         return res.status(404).json({ message: 'User not found!' });
      }

      const idOrderList = user.donhang;
      const orderList = await Promise.all(
         idOrderList.map((idOrder) => Order.findOne({ _id: idOrder }))
      );

      return res.status(200).json({orderList, success: true});
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

/** Add order */
export const AddOrder = async (req, res) => {
   try {
      const idU = req.user.id;
      const listProducts = req.body.sanpham;
      const listProductsError =[];
      for (const item of listProducts) {
         const product = await Product.findById(item._idSp);
         if (!product) {
            listProductsError.push({
               _idSp: item._idSp,
               message: 'Sản phẩm không tồn tại',
            })
         } else {
            const sizeInfo = product.Soluong.find((sizeObj) => sizeObj.Size === item.Size);
            if (!sizeInfo || sizeInfo.Sl < item.SoLuong) {
               listProductsError.push({
                  _idSp: item._idSp,
                  message:  'Không đủ sản phẩm cho đơn đặt hàng',
               })
             }
         }
      }

      if (listProductsError) {
         res.status(400).json({listProductsError,success: false})
      }
      const newOrder = new Order({
         _idUser: idU,
         sanpham: listProducts,
         DiaChiGiaoHang: req.body.DiaChiGiaoHang,
         ChiPhiVanChuyen: req.body.ChiPhiVanChuyen,
         Tongtien: req.body.Tongtien,
      })
      for (const item of listProducts) {
         const product = await Product.findById(item._idSp);
         const sizeInfo = product.Soluong.find((sizeObj) => sizeObj.Size === item.Size);
         sizeInfo.Sl -= item.SoLuong;
         product.SoSpDaBan += item.SoLuong;

         await product.save();

      }
      await newOrder.save();
      newOrder.TimeReal = ConvertTimeZone(newOrder.updatedAt);
      newOrder.save();
      return res.status(200).json({ success: true});

   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

/** Cancel Order */

export const CancelOrder = async (req, res) => {
   try {
      const idU = req.user.id;
      const idOrder = req.params.id;
      const infoOrder = Order.findById(idOrder);
      if (!infoOrder) {
         return res.status(404).json({message: 'Order Not Found'});
      }
      if (idU !== infoOrder._idUser){
         return res.status(404).json({message:'Access Denied'});
      }
      if (infoOrder.TrangThai ==='Đang vận chuyển'){
         return res.status(403).json({message: 'Order can not cancel'});
      }
      for (const item of infoOrder.sanpham){
         const product = await Product.findById(item._idSp);
         const sizeInfo = product.Soluong.find((sizeObj) => sizeObj.Size === item.Size);
         sizeInfo.Sl += item.SoLuong;
         product.SoSpDaBan -= item.SoLuong;
         await product.save();
      }
      infoOrder.TrangThai = 'Đã Hủy';
      await infoOrder.save();

      
      res.status(200).json({infoOrder, success: true});
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}



