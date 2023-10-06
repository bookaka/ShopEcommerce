import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    TenSp: String,
    Soluong: [
      {
        Size: String,
        Sl: Number,

      }
    ],
    SoSpDaBan: {
      type: Number,
      defaul: 0,
    },
    Color: String,
    Mota: Array,
    HinhAnh: Array,
    Gia: Number,
    GiamGia: Number,
    Tag: Array,
    TimeReal : Date,
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);
export default Product;
