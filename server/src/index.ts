import  "dotenv/config";
import { app } from "./app";
import connectDB from "./config/db";
const port = process.env.PORT || 3000;

connectDB();

app.listen(3000, ()=>{
    console.log(`server running on port ${port}`);
})