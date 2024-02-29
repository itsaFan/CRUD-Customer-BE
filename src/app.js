const express = require("express");
const dbConnection = require("./utils/dbConnection");
const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(express.json());
app.use(cors());
dbConnection();

//routes
app.use("/api", customerRoutes);

app.listen(3000, () => {
  console.log("Server start on port 3000");
});
