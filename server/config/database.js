// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ DB connection error:", err.message);
        if (process.env.ALLOW_SERVER_WITHOUT_DB === 'true') {
            console.warn("⚠️ Continuing without DB connection due to ALLOW_SERVER_WITHOUT_DB=true");
        } else {
            process.exit(1);
        }
    }
};

export default connectDB;   // <-- very important