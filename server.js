const express = require("express");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const db = require("./db");

// Routes
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
const passport = require("./auth");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(passport.initialize());

// Middleware Function
const logging = (req, res, next) => {
  console.log(new Date().toLocaleString() + `requested At: ${req.originalUrl}`);
  next();
};

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.use(logging);

app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menuitem", menuRoutes);

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello from the hotel");
});

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
