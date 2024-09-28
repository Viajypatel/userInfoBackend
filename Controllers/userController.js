const userModel = require("../Model/userModel"); // Ensure the path is correct
const bcrypt = require('bcrypt'); // Make sure bcrypt is required
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config();
const userRegister = async (req, res) => {
    const { name, username, password, email, message } = req.body;
    
    try {
        // Check if all fields are provided
        if (!name || !username || !password || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10); // Correct method is genSalt
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new user
        const newUser = new userModel({
            name,
            username,
            password: hashedPassword,
            email,
            message,
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({
            message: "User is created successfully",
            newUser,
        });

    } catch (err) {
        console.error("Server error occurred:", err.message); // Corrected logging
        return res.status(500).json({
            message: "Server error"
        });
    }
};


const userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Find user by username
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist in the database",
            });
        }

        // Compare provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong username or password",
            });
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.secretkey,
            { expiresIn: "1h" }
        );

        // Respond with success message, token, and user details
        return res.status(200).json({
            message: "User has logged in successfully",
            token,
            user,
        });
    } catch (err) {
        // Log the error and return an error response
        console.log("Server error:", err.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

const getAlluser=async(req,res)=>{

  
    try{
          
         const users=await userModel.find().select("-password");

         if(!users || users.length===0)
            {
              return res.status(404).json({
                message:"user is not found"
              })
            }
             
            return res.status(200).json({
                message:"Users retrieve successfully",
                users
            })
    }
    catch(err){

        console.log("Server error")
        return res.status(500).json({
            message:"Server error"
        });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { userRegister,userLogin,getAlluser,getUserProfile};
