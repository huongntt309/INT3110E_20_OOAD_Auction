import mongoose from "mongoose";
import express from "express";
require("dotenv").config();
import apiRoutes from "./routes/apiRoutes";

const app = express();

const port = process.env.PORT || 8081;
const dbPassword = process.env.DB_PASSWORD;

// get data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//apis
app.use( "/api/v1", apiRoutes);

(async function () {
  try {
    //connect to database
    await mongoose.connect(
      `mongodb+srv://magicpost:${dbPassword}@cluster0.90ifdb2.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => console.log("Connected to MongoDB"));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();