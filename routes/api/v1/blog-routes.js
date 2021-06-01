const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const _ = require("lodash");

const authMiddleware = require("../../../middlewares/auth-middleware");
const blogControllers = require("../../../controllers/blog-controllers");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      let type = "";
      switch (file.mimetype) {
        case "image/png":
          type = ".png";
          break;
        case "image/jpg":
          type = ".jpg";
          break;
        case "image/jpeg":
          type = ".jpeg";
      }

      const fileName = `${_.kebabCase(req.body.title)}-${
        file.fieldname
      }-${Date.now()}${type}`;
      cb(null, fileName);
    } else {
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
const upload = multer({ storage });

// @route  GET /api/v1/blogs
// @desc   Get blogs.
// @access public
router.get("/", blogControllers.getBlogs);

// @route  GET /api/v1/blogs/:blogId
// @desc   Get blog.
// @access public
router.get("/:blogId", blogControllers.getBlog);

// @route  POST /api/v1/blogs
// @desc   Add blog.
// @access private
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  [
    body("title", "Title is required.").notEmpty(),
    body("body", "Body is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  blogControllers.addBlog
);

// @route  DELETE /api/v1/blogs/:blogId
// @desc   Delete blog.
// @access private
router.delete("/:blogId", authMiddleware, blogControllers.deleteBlog);

// @route  Put /api/v1/blogs/:blogId
// @desc   Update blog.
// @access private
router.put(
  "/:blogId",
  authMiddleware,
  upload.single("image"),
  [
    body("title", "Title is required.").notEmpty(),
    body("body", "Body is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  blogControllers.updateBlog
);

module.exports = router;
