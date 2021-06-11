const crypto = require("crypto");

const mongoose = require("mongoose");
const uuid = require("uuid");

const adminSchema = new mongoose.Schema(
  {
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
  this.salt = uuid.v4();
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

module.exports = Admin;
