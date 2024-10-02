import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import { Listing } from "../models/listing.model";

const connectDB = async () => {
    try {
        console.log("undefined",process.env.MONGO_URI);
        // if (!process.env.MONGO_URI) {
        //     throw new Error('MONGO_URI is not defined in the environment variables');
        // }

        const connectionInstance = await mongoose.connect("mongodb+srv://hims:YFnSMhxvrMbWMOzm@cluster0.nghvgcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            dbName: DB_NAME
        });
        
        console.log(`MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MOngoDB Connection error", error);
        process.exit(1);
    }
}  

export default connectDB;