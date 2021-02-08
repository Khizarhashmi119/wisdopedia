import crypto from "crypto";

import mongoose from "mongoose";
import { v4 } from "uuid";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    middleName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 32,
      trim: true,
    },
    encryPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    saltRound: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

adminSchema.virtual("password").set(function (password) {
  this.salt = v4();
  this.encryPassword = this.encryptPassword(password);
});

adminSchema.methods = {
  authenticate: function (password) {
    return this.encryPassword === this.encryptPassword(password);
  },

  encryptPassword: function (password) {
    for (let i = 0; i < this.saltRound; i++) {
      password = crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    }

    return password;
  },
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
