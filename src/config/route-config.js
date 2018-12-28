module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const groceryRoutes = require("../routes/groceries");
    const userRoutes = require("../routes/users");
    app.use(staticRoutes);
    app.use(groceryRoutes);
    app.use(userRoutes);
  }
}
