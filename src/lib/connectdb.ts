import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectdb = async () => {
  if (!process.env.MONGO_URL) {
    return console.log("Missing MONGO_URL");
  }

  if (isConnected) {
    return console.log("Mongodb is already connected");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("Database connected with host: ", connection.connection.host);
  } catch (error) {
    console.log(error);
    console.log("Error connecting with mongodb");
  }
};
