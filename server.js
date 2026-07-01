const express = require("express");
const colors = require("colors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dot env configuration
dotenv.config();

// DB Connection
connectDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
// URL -> http://localhost:8080
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRouetes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server</h1>");
});

// Port
const Port = process.env.PORT || 8080;

// listen

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`.cyan);
});
