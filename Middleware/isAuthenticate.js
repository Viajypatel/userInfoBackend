const jwt=require("jsonwebtoken");
const dotenv = require('dotenv').config();

const isAuthenticate=(req,res,next)=>{

    try{
         const token=req.Header('Authorization')?.split(' ')[1];

         if(!token)
         {
            return res.status(401).json({
                message:"Unauthorize user"
            })
         }

         const decode=jwt.verify(token,process.env.secretkey);

          req.user=decode;
          next();

    }
    catch(error){
 
        res.status(400).json({ message: 'Invalid token.' });

    }

}
module.exports={isAuthenticate};