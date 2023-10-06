import mongoose from "mongoose";

const Cart  = new mongoose.Schema(
    {
        _idSP: String,
        Soluong: Number,
        Size: String,
        Gia: Number,
        GiamGia: Number,
    }
)

const UserSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
        hoten:{
            type: String,
        },
        hinhanh:{
            type: String,
            default: "",
        },
        SDT:{
            type: String,
        },
        diachi:{
            type: String,
        },
        gioitinh:{
            type: String,
        },
        donhang:{
            type: Array,
        },
        giohang:{
            type: [Cart],
        },
        admin:{
            type: Boolean,
            default: false,
        },

        
    },{timestamps: true}
    );
const User = mongoose.model('User',UserSchema);
export default User;
