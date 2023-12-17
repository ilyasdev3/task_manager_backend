require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");

const cors = require("cors");

const router = require("./routes/index.routes");

app.use(express.json());

// app.get("/", async (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

app.use(cors());
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
  });
}
app.listen(port, () => {
  connectDB();
  console.log(`Server listening on ${port}`);
});
