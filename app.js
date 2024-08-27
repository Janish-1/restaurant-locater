const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/config");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes"); // Import restaurant routes

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes); // Use restaurant routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
