const express = require("express");
const session = require("express-session");
const authRoutes = require("./src/route");
const crypto = require("crypto");
const app = express();

const sessionSecret = crypto.randomBytes(32).toString("hex");
app.use(express.json());
app.use("/auth", authRoutes);
const PORT = 7890;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
