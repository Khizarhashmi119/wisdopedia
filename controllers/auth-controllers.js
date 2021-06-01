const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// @route  POST /api/auth/signin
// @desc   Admin login route.
// @access public
const signin = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { email, password } = req.body;

  try {
    // Get admin.
    const admin = await Admin.findOne({ email });

    // Check admin exist or not.
    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    // Check admin's password.
    if (!admin.authenticate(password)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    // Generate token.
    const payload = {
      admin: {
        id: admin._id,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 900000,
    });

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

module.exports = { signin };
