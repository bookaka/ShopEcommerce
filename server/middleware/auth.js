import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(403).send("Access Denied");
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const verified = jwt.verify(token, process.env.JWT);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message});
//   }
// };
const middlewareAuth = {
  verifyToken: async (req, res, next) => {
      try {
        let token = req.header("Authorization");
    
        if (!token) {
          return res.status(403).send("Access Denied");
        }
    
        if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length).trimLeft();
        }
    
        const verified = jwt.verify(token, process.env.JWT);
        req.user = verified;
        next();
      } catch (err) {
        res.status(500).json({ error: err.message});
      }
    },
  verifyTokenAdmin: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
  
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
  
      
      const verified = jwt.verify(token, process.env.JWT);
      const isAdmin = verified.admin;
      if (!isAdmin) 
        { return res.status(403).send("Access Denied")}
      req.user = verified;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  },
}
export default middlewareAuth;