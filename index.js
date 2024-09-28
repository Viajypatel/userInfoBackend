const express=require("express");
const dbConnect=require("./confing/db");
const app=express();
const dotenv=require("dotenv");
const userRoute=require("./Routes/userRoute");
const cors=require("cors");

app.use(cors());
dotenv.config();
const PORT=process.env.PORT||8000;
app.use(express.json());
dbConnect();
app.get("/",(req,res)=>{

    res.send("this is server");
});

app.use("/api/user",userRoute);

app.listen(PORT,()=>{

    console.log(`server is running on port number:${PORT}`);
    
});