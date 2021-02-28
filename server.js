const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res, next) => {
  console.log("Query..");

  let apiResponse = await pool.query("SELECT * FROM todos").catch((err) => {
    console.log(err.message);
  });
  if (apiResponse) {
    res.json(apiResponse.rows);
  }
});

app.post("/todos", async (req, res, next) => {
  console.log("ADDING...");
  const { description } = req.body;

  if (description) {
    let apiResponse = await pool
      .query("INSERT INTO todos (description) values ($1)", [description])
      .catch((err) => console.log(err.message));

    if (apiResponse) {
      res.status(200).send(`Success at adding ${description}`);
    }
  } else {
    res.status(400).send("Please add a valid body");
  }
});

app.put("/todos/:id", async (req, res, next) => {
  const newDescription = req.body.description;
  let id = req.params.id;

  if (newDescription) {
    let apiResponse = await pool
      .query("UPDATE todos SET description=$1 WHERE todo_id=$2", [
        newDescription,
        id,
      ])
      .catch((err) => console.log(err.message));

    console.log(apiResponse);
    if (apiResponse.rowCount > 0) {
      res.send(`Successful at updating Todo # ${id}`);
    } else {
      res.status(400).send("Please make sure that todo exists to update");
    }
  } else {
    res.status(400).send("Please add a valid body");
  }
});

app.listen(5000, () => {
  console.log("App is listening");
});
