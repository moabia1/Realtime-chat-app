import mongoose from "mongoose";

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Mongo DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectToDb