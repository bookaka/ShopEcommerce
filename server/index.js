import express  from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouters from "./routers/auth.js";
import adminProductRouters from "./routers/adminProduct.js"
import userRouters from "./routers/user.js"
import commonProductRouters from "./routers/commonProduct.js"




/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* FILE STORAGE */



const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

 /**ROUTERS  */
 app.use(upload.array("images"));

 app.use("/auth",authRouters)
 app.use("/adminProduct",adminProductRouters)
 app.use("/user",userRouters);
 app.use("/commonProduct",commonProductRouters)



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

 


