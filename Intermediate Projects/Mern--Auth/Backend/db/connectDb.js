import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error in mongoDb ${error}`);
        process.exit(1);
    }
}