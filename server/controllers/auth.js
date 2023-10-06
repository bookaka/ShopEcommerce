import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Redis } from "ioredis";
import dotenv from "dotenv";
import User from "../models/User.js";
import { response } from "express";

dotenv.config();


const redis = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
})





function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user._id,
      admin: user.admin,
    },
    process.env.JWT, 
    { expiresIn: '1h' }
  );
};

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user._id,
      admin: user.admin,
    },
    process.env.JWT_REFRESH, 
    { expiresIn: '1d' } 
  );
};

/** REGISTER USER */

export const register = async (req, res) => {
   try {
     const { email, password, hoten, SDT  } = req.body;
   
 
     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(password, salt);
 
     const newUser = new User({
      email,
      password: passwordHash,
      hoten,
      hinhanh: null,
      SDT,
      diachi: null,
      gioitinh: null,
     });
     let saveUser = await newUser.save();
     saveUser.password = undefined;
     res.status(201).json(saveUser);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };

/*  LOGGING IN*/
export const login = async (req, res) => {
   try {
     const { email, password } = req.body;
     let user = await User.findOne({ email: email });
     if (!user) return res.status(400).json({ message: `Invalid Email or Password` });
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch)
       return res.status(400).json({ message: `"Invalid Email or Password"` });
 
     const token = generateAccessToken(user);
     const tokenRefresh = generateRefreshToken(user);
     redis.rpush(user._id,tokenRefresh)
     res.cookie("refreshToken", tokenRefresh,{
      httpOnly: true,
      secure: false,
      sameSite: "strict",
     })
     user.password = undefined;
     const newUser = {
      _id: user._id,
      email: user.email,
      hoten: user.hoten,
      hinhanh: user.hinhanh, 
      SDT: user.SDT,
      diachi: user.diachi, 
      gioitinh: user.gioitinh, 
    };
     res.status(200).json({ newUser, token,success:true });
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };

 

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: `Invalid Email or Password` });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: `"Invalid Email or Password"` });
    if (!user.admin)
      return res.status(403).json({ message: `Access denied` });

    const token = generateAccessToken(user);
    const tokenRefresh = generateRefreshToken(user);
    redis.rpush(user._id,tokenRefresh)
    res.cookie("refreshToken", tokenRefresh,{
     httpOnly: true,
     secure: false,
     sameSite: "strict",
    })
    user.password = undefined;
    user = {
      _id: user._id,
      email: user.email,
      hoten: user.hoten,
      hinhanh: user.hinhanh, 
      SDT: user.SDT,
      diachi: user.diachi, 
      gioitinh: user.gioitinh, 
    };
    res.status(200).json({ user, token,success:true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshToken = async (req, res) =>{
  try{
    let id = req.user.id;
    const refreshToken = req.cookie.refreshToken;
    if (!refreshToken) return res.status(403).json({message:"Access Denied"});
    let values = redis.lrange(id,0,-1);
    if (!(await values).includes(refreshToken)){
      return res.status(403).json({message:"Access Denied"});
    }
    jwt.verify(refreshToken,process.env.JWT_REFRESH,(err,user) =>{
      if (err) return res.status(500).json({ message: err.message});
      redis.lrem(id,0,refreshToken)
      const newToken = generateAccessToken(user);
      const newFreshToken = generateRefreshToken(user);
      redis.rpush(user._id,newFreshToken)
      res.cookie("refreshToken", newFreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
       })
      res.status(200).json({token: newToken})
    })
  }catch (err) {
    res.status(500).json({ message: err.message});
  }
}
export const logout = async (req, res) => {
  try{
    res.clearCookie("refreshToken");
    redis.del(req.user.id);
    res.status(200).json({success: true});
  }catch (err) {
    res.status(500).json({message: err.message});
  }
}
 