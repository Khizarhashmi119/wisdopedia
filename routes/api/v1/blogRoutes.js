const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const _ = require("lodash");

const authMiddleware = require("../../../middlewares/authMiddleware");
const blogControllers = require("../../../controllers/blogControllers");

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

router.get("/", blogControllers.getBlogs);
router.get("/:blogId", blogControllers.getBlog);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  [
    body("title", "Title is required.").notEmpty().isLength({ max: 200 }),
    body("body", "Body is required.").notEmpty(),
    body("tags", "tags is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  blogControllers.addBlog
);
router.delete("/:blogId", authMiddleware, blogControllers.deleteBlog);
router.put(
  "/:blogId",
  authMiddleware,
  upload.single("image"),
  [
    body("title", "Title is required.").notEmpty().isLength({ max: 200 }),
    body("body", "Body is required.").notEmpty(),
    body("tags", "Tags is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  blogControllers.updateBlog
);

module.exports = router;
