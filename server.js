const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");
const authRoutes = require("./routes/api/v1/auth-routes");
const blogRoutes = require("./routes/api/v1/blog-routes");
const commentRoutes = require("./routes/api/v1/comment-routes");
const categoryRoutes = require("./routes/api/v1/category-routes");
const newsLetterRoutes = require("./routes/api/v1/news-letter-routes");

const app = express();

// Set enviroment variables
dotenv.config();
// Connect database.
connectDB();

// Middlewares.
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// API routes.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/news-letter", newsLetterRoutes);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
