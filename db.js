import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const {
      connection: { host, port },
    } = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB is connected at ${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
