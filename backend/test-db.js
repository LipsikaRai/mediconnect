import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const testConnection = async () => {
  try {
    console.log("Attempting to connect...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected successfully!");
    
    // Try to write a test document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model("test", testSchema);
    const doc = await TestModel.create({ test: "hello" });
    console.log("✅ Write successful:", doc);
    
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error("Full error:", err);
  } finally {
    await mongoose.connection.close();
  }
};

testConnection();
