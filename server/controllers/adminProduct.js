import jwt from "jsonwebtoken";
import { UploadSingle, UploadMultiple,deleteImage } from "../components/UploadImage.js";
import { ConvertTimeZone } from "../components/ConvertTimeZone.js";

import Product from "../models/Product.js";

export const postProduct = async (req, res) =>{
   try{
      const files = req.files
      const imageUrls = UploadMultiple(files)
      const newProduct = new Product({
         TenSp: req.body.TenSp,
         SoLuong: req.body.SoLuong,
         MoTa: req.body.MoTa,
         Gia: req.body.Gia,
         GiamGia: req.body.GiamGia,
         Tag: req.body.Tag,
         HinhAnh: imageUrls,
         Color: req.body.Color
         
       });
      newProduct.save();
      newProduct.TimeReal = ConvertTimeZone(newProduct.updatedAt);
      newProduct.save();
      res.json({newProduct,success:true});

   }catch(e){
      res.status(500).json({ message: err.message });
   }

}

export const UpdateProduct = async (req, res) =>{
   try {
      const productId = req.params.id;
      const updatedProductData = req.body;
      const files = req.files;
      const imageUrls =[]
      if (files)  imageUrls = UploadMultiple(files)
  
      const existingProduct = await Product.findById(productId);
  
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product does not exist' });
      }
      for (const image of existingProduct.HinhAnh){
         if (!updatedProductData.HinhAnh.includes(image))
            deleteImage(image);
      }
      updatedProductData.HinhAnh = [...updatedProductData.HinhAnh, ...imageUrls];
      existingProduct.TenSp = updatedProductData.TenSp;
      existingProduct.LoaiSp = updatedProductData.LoaiSp;
      existingProduct.Soluong = updatedProductData.Soluong;
      existingProduct.SoSpDaBan = updatedProductData.SoSpDaBan;
      existingProduct.Mota = updatedProductData.Mota;
      existingProduct.HinhAnh = updatedProductData.HinhAnh;
      existingProduct.Gia = updatedProductData.Gia;
      existingProduct.GiamGia = updatedProductData.GiamGia;
      existingProduct.Tag = updatedProductData.Tag;
  
      const updatedProduct = await existingProduct.save();
      updatedProduct.TimeReal = ConvertTimeZone(updatedProduct.updatedAt)
      updatedProduct.save();
  
      res.json({updatedProduct, success: true});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) =>{
   try{
      const productId = req.params.id;
      const product = await Product.findById(productId);
   
      if (!product) {
         res.status(404).json({ message: "Product not found" });
       }
      for (const url of product.HinhAnh)
         deleteImage(url);
      Product.findOneAndRemove({ _id: productId })
      res.status(200).json({ success: true });
         

   }catch(e){
      res.status(500).json({ message: err.message });
   }

}



