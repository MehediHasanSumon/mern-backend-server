import mongoose from "mongoose";

export default async function DatabaseConnect() {
  try {
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;

    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.aiixw.mongodb.net/${dbName}`
    );

    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
