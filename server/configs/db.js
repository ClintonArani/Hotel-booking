import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing database connection');
    return;
  }

  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    isConnected = true;
    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw new Error('MongoDB connection failed');
  }
};

export default connectDB;