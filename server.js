const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const authRoutes = require("./routes/api/v1/authRoutes");
const blogRoutes = require("./routes/api/v1/blogRoutes");
const commentRoutes = require("./routes/api/v1/commentRoutes");
const categoryRoutes = require("./routes/api/v1/categoryRoutes");
const newsLetterRoutes = require("./routes/api/v1/newsLetterRoutes");

const app = express();

// Set enviroment variables
dotenv.config();
// Connect database.
connectDB();

// Middlewares.
app.use(cors());
app.use(express.json());
app.use("/api/v1", express.static("uploads"));
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// API routes.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/news-letter", newsLetterRoutes);

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
