const express = require("express");
const todoRoute = require("../routes/Todo");
const userRoute = require("../routes/User");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/v1/todos", todoRoute);
  app.use("/api/v1/users", userRoute);
};
