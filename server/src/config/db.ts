import mongoose from "mongoose"

const connectDB = async () =>{
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

export default connectDB;