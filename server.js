const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const todoRoutes = require("./routes/todoRoutes");

//middleware
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// //get all todos
// app.get("/todos", async (req, res, next) => {
//   console.log("Query..");

//   let apiResponse = await pool.query("SELECT * FROM todos").catch((err) => {
//     console.log(err.message);
//   });
//   if (apiResponse) {
//     res.json(apiResponse.rows);
//   }
// });

// //add a todo
// app.post("/todos", async (req, res, next) => {
//   console.log("ADDING...");

//   const { description } = req.body;

//   if (description) {
//     let apiResponse = await pool
//       .query("INSERT INTO todos (description) values ($1)", [description])
//       .catch((err) => console.log(err.message));

//     if (apiResponse) {
//       res.status(200).send(`Success at adding ${description}`);
//     }
//   } else {
//     res.status(400).send("Please add a valid body");
//   }
// });

// //update a todo
// app.put("/todos/:id", async (req, res, next) => {
//   console.log("UPDATING...");

//   const newDescription = req.body.description;
//   let id = req.params.id;

//   if (newDescription) {
//     let apiResponse = await pool
//       .query("UPDATE todos SET description=$1 WHERE todo_id=$2", [
//         newDescription,
//         id,
//       ])
//       .catch((err) => console.log(err.message));

//     console.log(apiResponse);
//     if (apiResponse.rowCount > 0) {
//       res.send(`Successful at updating Todo # ${id}`);
//     } else {
//       res.status(400).send("Please make sure that todo exists to update");
//     }
//   } else {
//     res.status(400).send("Please add a valid body");
//   }
// });

// app.delete("/todos/:id", async (req, res, next) => {
//   console.log("DELETING...");

//   let idToDelete = req.params.id;

//   let apiResponse = await pool
//     .query("DELETE FROM todos WHERE todo_id=$1", [idToDelete])
//     .catch((err) => console.log(err));

//   if (apiResponse.rowCount < 1) {
//     res.status(400).send(`Todo of ID ${idToDelete} does not exist!`);
//   } else {
//     res.send(`Successful at deleting Todo with ID of ${idToDelete}`);
//   }
// });

app.listen(5000, () => {
  console.log("App is listening");
});
