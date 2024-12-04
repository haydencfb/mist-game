import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mistgames:H7SdGklKNYatqFtP@cluster0.7af0g.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

export default db;