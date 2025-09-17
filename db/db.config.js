import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const initalizeDataBase = () => {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.log("Successfully connected with db");
    });
};

export default initalizeDataBase;