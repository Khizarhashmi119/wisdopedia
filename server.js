import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import connectDB from "./db.js";
import authRoutes from "./routes/api/v1/auth-routes.js";
import blogRoutes from "./routes/api/v1/blog-routes.js";
import commentRoutes from "./routes/api/v1/comment-routes.js";
import categoryRoutes from "./routes/api/v1/category-routes.js";
import newsLetterRoutes from "./routes/api/v1/news-letter-routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Set enviroment variables
config();
// Connect database.
connectDB();

// Middlewares.
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ msg: "API is running..." });
});

// API routes.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/news-letter", newsLetterRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
