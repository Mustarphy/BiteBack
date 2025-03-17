const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const axios = require("axios");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
const serviceAccount = require("./firebase-admin.json"); // Ensure this file exists
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  imageUrl: String,
  publishedAt: Date,
});

const News = mongoose.model("News", NewsSchema);

// ✅ Configure Nodemailer Transporter (Fixed)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

// ✅ Middleware: Verify Firebase Token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// ✅ Route: Get Latest News
app.get("/api/news", async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ Route: Fetch & Store Latest News (Manual Trigger)
app.get("/api/fetch-news", async (req, res) => {
  try {
    console.log("Fetching latest news...");
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=orphans&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No news found" });
    }

    const latestNews = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
    }));

    await News.deleteMany();
    await News.insertMany(latestNews);

    res.json({ message: "News fetched and saved successfully!" });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ Automated News Fetching (Every Hour)
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled news update...");
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=orphans&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles || response.data.articles.length === 0) {
      console.log("No new articles found.");
      return;
    }

    const latestNews = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
    }));

    await News.deleteMany();
    await News.insertMany(latestNews);

    console.log("News updated successfully!");
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
});

// ✅ Route: Post News (Requires Authentication)
app.post("/api/news", verifyToken, async (req, res) => {
  try {
    const { title, description, url, imageUrl } = req.body;
    const newNews = new News({ title, description, url, imageUrl, publishedAt: new Date() });

    await newNews.save();
    res.status(201).json({ message: "News added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add news" });
  }
});

// ✅ Volunteer Form Email Route (Fixed)
app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Receiving email (your email)
    subject: `New Volunteer Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
