import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

//* @route  POST /api/auth/signin
//* @desc   Admin login route.
//* @access public
const signin = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { email, password } = req.body;

  try {
    //* Get user.
    const user = await Admin.findOne({ email });

    //* Check user exist or not.
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    //* Check user's password.
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }

    //* Generate token.
    const payload = {
      user: {
        id: user._id,
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

export { signin };
