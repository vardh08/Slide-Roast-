import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/slide-roast';

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000, // Timeout fast if local DB is not running
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`\n[MongoDB] Notice: Could not connect to MongoDB at ${uri}.`);
    console.warn(`[MongoDB] Tip: Set MONGODB_URI in backend/.env with your MongoDB Atlas or local MongoDB connection string.`);
    console.warn(`[MongoDB] Operating in resilient mode: In-memory fallback will preserve reports and analyses for this session.\n`);
    return false;
  }
};

export const isDbConnected = () => isConnected;
