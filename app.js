const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbStrore = require("connect-mongodb-session")(session);

const app = express();
const store = new MongodbStrore({ uri: MONGODB_URI, collection: "sessions" });

const MONGODB_URI =
  "mongodb+srv://yann:loulou237@cluster0.lajrlny.mongodb.net/taskflow_db?retryWrites=true&w=majority&appName=Cluster0";

const errorController = require("./controllers/error-controller");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my-secret",
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);

app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("database connection");
    app.listen(4000);
  })
  .catch((err) => console.log(err));
