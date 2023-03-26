const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cors = require("cors");
// const connectDB = require("./config/connectDB");
// const Task = require("./models/task");
const taskRoute = require("./routes/task");

const app = express();

// ====== MIDDLEWARE=====

// access the data from body in json format
app.use(express.json());
// access the data from body in url form format [instead of body-parser]
app.use(express.urlencoded({ extended: false }));
// cors
// only accessable for particular route in F.E
app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "https://mern-taskmanager-app-dias.onrender.com",
    ],
  })
);

// accessible for any route in F.E

// app.use(cors());

// DB (WE NEED TO RUN DB 1st BEFORE SERVER CONNECT!!!)

// connectDB();

// routes
app.get("/", (req, res) => {
  res.send("hlo world");
});

app.use("/api/tasks", taskRoute);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("port running in " + PORT + " port");
// });

// ------------------METHOD 1---------------

// DB first

// const startApp = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log("port running in " + PORT + " port");
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// startApp();

// ----------------METHOD 2 FOR DB----------------

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(
    app.listen(PORT, () => {
      console.log("DB and port running in " + PORT + " port");
    })
  )
  .catch((err) => console.log(err));
