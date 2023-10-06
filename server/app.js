const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable corse
app.use(cors());

// Middleware for parsing JSON data in request bodies
app.use(bodyParser.json());

//MongoDB connection setup
const mongoURI =
  "mongodb+srv://talha:talha123@cluster0.otarznl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB is not Connected, Error: " + error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to My Banking System");
});

//Routes
const customerRoutes = require("../server/routes/customerRoutes");
const transferRoutes = require("../server/routes/transferRoutes");

app.use("/api", customerRoutes); // Prefix customer routes with '/api'
app.use("/api", transferRoutes); // Prefix transfer routes with '/api'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
