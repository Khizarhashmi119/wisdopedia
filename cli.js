const dotenv = require("dotenv");
const commander = require("commander");
const inquirer = require("inquirer");
const mongoose = require("mongoose");

const Admin = require("./models/Admin");

dotenv.config();

const conn = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const questions = [
  {
    type: "input",
    name: "email",
    message: "Enter your email* ?",
  },
  {
    type: "password",
    name: "password",
    message: "Enter your password* ?",
  },
  {
    type: "password",
    name: "confPassword",
    message: "Confirm your password* ?",
  },
];

const program = new commander.Command();

program.version("1.0.0").description("Create admin CLI tool.");

program
  .command("create-admin")
  .alias("c")
  .description("Create admin.")
  .action(async () => {
    const { email, password, confPassword } = await inquirer.prompt(questions);

    if (!email && !password) {
      console.info("Please enter required fields.");
      (await conn).disconnect();
    } else if (password !== confPassword) {
      console.info("Passwords don't match.");
      (await conn).disconnect();
    } else {
      try {
        const newAdmin = new Admin({
          email,
          password,
        });

        await newAdmin.save();
        console.info("Admin is successfully created.");
        (await conn).disconnect();
      } catch (err) {
        console.error(err);
        (await conn).disconnect();
      }
    }
  });

program.parse(process.argv);
