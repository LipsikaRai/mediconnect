import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import userModel from "./models/userModel.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const testRegister = async () => {
  try {
    // Connect using the same function as the server
    await connectDB();
    
    const { name, email, password } = { 
      name: "Test User", 
      email: `testuser${Date.now()}@example.com`, 
      password: "Password123" 
    };

    console.log("Testing registration with userModel...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    console.log("Created user document");
    
    const user = await newUser.save();
    console.log("✅ User saved successfully:", user._id);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await mongoose.connection.close();
  }
};

testRegister();
