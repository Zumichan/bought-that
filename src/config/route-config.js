module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const groceryRoutes = require("../routes/groceries");
    const userRoutes = require("../routes/users");
    const statusRoutes = require("../routes/statuses");
    app.use(staticRoutes);
    app.use(groceryRoutes);
    app.use(userRoutes);
    app.use(statusRoutes);
  }
}
