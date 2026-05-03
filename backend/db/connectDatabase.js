const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is missing in env");
    }

    await mongoose.connect(uri);
    console.log("connected to database");
  } catch (error) {
    console.error("DB ERROR:", error.message);
    process.exit(1);
  }
};