const express = require("express");
require("dotenv").config();
const taskRoutes = require("./src/routes/taskRoutes");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.url} ${req.method} was hit`);
  next();
});
app.use("/tasks", taskRoutes);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

app.use(errorHandler);
module.exports = app;
