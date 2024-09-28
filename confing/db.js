const mongoose=require("mongoose");
require('dotenv').config();
const Mongo_Url=process.env.Mongo_Url;
const dbConnect=async()=>{

        try{
                   if(!Mongo_Url){
                   throw new Error("Mongodb url not defined in the .env")
                    return;
                   }
            
                   await mongoose.connect(Mongo_Url);
                   console.log("Mongodb connected successfully");
        }
        catch(err){
            console.log("mongodb not connected succesfully",err.message);
        }
}

module.exports=dbConnect;