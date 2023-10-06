import {v2 as cloudinary} from 'cloudinary';

import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_API_KEY,
  api_secret: process.env.CLOUND_API_SECRET,
});

export async function UploadSingle(file) {
   const imageUrl = cloudinary.uploader.upload(file.path, {
      folder: "Shop Boo",
    });
    return imageUrl
}

export async function UploadMultiple(files) {
   const imageUrls = [];
   for (let i = 0; i < files.length; i++) {
      const result =  cloudinary.uploader.upload(files[i].path, {
        folder: "Shop Boo",
      });
      imageUrls.push(result.secure_url);
    }
   return imageUrls
}

export async function deleteImage(imageUrl){
  try{
    const result = await cloudinary.uploader.destroy(imageUrl);
    return result.result;

  }
  catch(e){
    return {error: e.error};
  }
}
 