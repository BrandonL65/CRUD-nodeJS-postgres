const express = require("express");
const app = express();
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

//middleware
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(5000, () => {
  console.log("App is listening");
});
