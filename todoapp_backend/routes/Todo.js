const express = require("express");
const Joi = require("joi");
const Todo = require("../models/Todo");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Get all the todos.
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let todos = await req.user.populate("savedTodos.todo");
      // const todos = await Todo.find({});
      todos = todos.savedTodos.map((todo) => todo.todo);
      res.status(200).json(todos);
    } catch (ex) {
      res.status(500).json(ex.message);
    }
  }
);

// Create / post a new todo;
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { task, completionTime } = req.body;
      // Schema for the request body
      const schema = Joi.object({
        task: Joi.string().required(),
        completionTime: Joi.date().required(),
      });

      // Validate the request body against the schema
      const { error } = schema.validate({ task, completionTime });
      if (error) {
        // Return a 400 Bad Request status with detailed validation error messages
        return res
          .status(400)
          .json({ error: error.details.map((err) => err.message) });
      }

      const todo = new Todo({ task, completionTime });

      // First Make the todo;
      const savedTodo = await todo.save();
      // Find the user;
      const user = await User.findById(req.user._id);
      await user.saveTodo(savedTodo);
      res.status(201).json(savedTodo);
    } catch (ex) {
      // Return a 500 Internal Server Error status if an unexpected error occurs
      res.status(500).json(ex.message);
    }
  }
);

// Delete a todo

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(req.user._id);
      const todo = await Todo.findByIdAndDelete(id);
      await user.removeTodo(todo);
      if (todo.deletedCount === 0) {
        res.status(404).json("Todo Not Found");
      } else {
        res.sendStatus(204);
      }
    } catch (ex) {
      console.error(ex);
      res.status(400).json(ex.message);
    }
  }
);

// Patch this will be used to update the completed status
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const idSchema = Joi.object({
    id: Joi.string().required(),
  });
  try {
    await idSchema.validateAsync({ id });
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json("Todo not found");
    }

    Object.assign(todo, updates);

    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

module.exports = router;
