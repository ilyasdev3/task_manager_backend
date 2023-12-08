require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const port = process.env.PORT || 5000;
const app = express();

const cors = require("cors");

const router = require("./routes/index.routes");

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  connectDB();
  console.log(`Server listening on ${port}`);
});
