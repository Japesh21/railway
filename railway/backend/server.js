import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_DB_API_KEY); // same as your .env
let db, collection;

// connect to MongoDB once
(async () => {
  try {
    await client.connect();
    db = client.db("hospitalDB"); // your database name
    collection = db.collection("patients"); // MongoDB auto-creates collection if not exists
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
})();

// POST /submit → insert data
app.post("/submit", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.json({ message: "✅ Data uploaded successfully!", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to insert data", error: err.message });
  }
});

// GET /data → fetch all data
app.get("/data", async (req, res) => {
  try {
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch data", error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
