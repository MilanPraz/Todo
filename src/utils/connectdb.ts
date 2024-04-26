import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    throw new Error("Connection Failed");
  }
};
