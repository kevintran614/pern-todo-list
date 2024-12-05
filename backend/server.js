const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// port
port = 5001;

// middleware
app.use(cors());
app.use(express.json());

// routes

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows);
  } catch (error) {
    console.log(`GET route: create todo error, ${error.message}`);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(`GET route: get all todos error, ${error.message}`);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.log(`GET route: get a todo error, ${error.message}`);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = ($1) WHERE todo_id = ($2)",
      [description, id]
    );

    res.json(
      `Successfully updated todo_id: ${id}, description: ${description}`
    );
  } catch (error) {
    console.log(`PUT route: update a todo error, ${error.message}`);
  }
});

// delete a todo

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
