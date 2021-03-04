const router = require("express").Router();
const pool = require("../db.js");

//The basic CRUD operations are done here
//We are able to query the pool object because there is an exposed method on it that allows us to.
//When we query the pool, we write SQL, so it is not an ORM

//get all todos
router.get("/", async (req, res, next) => {
  console.log("Query..");

  let apiResponse = await pool.query("SELECT * FROM todos").catch((err) => {
    console.log(err.message);
  });
  if (apiResponse) {
    res.json(apiResponse.rows);
  }
});

//add a todo
router.post("/", async (req, res, next) => {
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

//update a todo
router.put("/:id", async (req, res, next) => {
  console.log("UPDATING...");

  const newDescription = req.body.description;
  let id = req.params.id;

  if (newDescription) {
    let apiResponse = await pool
      .query("UPDATE todos SET description=$1 WHERE todo_id=$2", [
        newDescription,
        id,
      ])
      .catch((err) => console.log(err.message));

    if (apiResponse.rowCount > 0) {
      res.send(`Successful at updating Todo # ${id}`);
    } else {
      res.status(400).send("Please make sure that todo exists to update");
    }
  } else {
    res.status(400).send("Please add a valid body");
  }
});

//Delete a todo
router.delete("/:id", async (req, res, next) => {
  console.log("DELETING...");

  let idToDelete = req.params.id;

  let apiResponse = await pool
    .query("DELETE FROM todos WHERE todo_id=$1", [idToDelete])
    .catch((err) => console.log(err));

  if (apiResponse.rowCount < 1) {
    res.status(400).send(`Todo of ID ${idToDelete} does not exist!`);
  } else {
    res.send(`Successful at deleting Todo with ID of ${idToDelete}`);
  }
});

module.exports = router;
