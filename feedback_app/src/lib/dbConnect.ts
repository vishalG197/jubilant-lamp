import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: Number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connection established");
  } catch (e) {
    console.log("Database connection failed", e);
    process.exit(1);
  }
}
export default dbConnect;