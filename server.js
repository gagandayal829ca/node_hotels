const express = require("express");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const db = require("./db");
const localStrategy = require("passport-local").Strategy;

// Routes
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
const passport = require("passport");

const app = express();
const PORT = 3000;

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

app.use("/person", personRoutes);
app.use("/menuitem", localAuthMiddleware, menuRoutes);

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello from the hotel");
});

// Authentication
passport.use(
  new localStrategy(async (username, password, done) => {
    console.log("received credentials:", username, password);
    try {
      const selectedUser = await Person.findOne({ username: username });
      console.log(selectedUser);
      if (!selectedUser)
        return done(null, false, { message: "Username or password incorrect" });

      const isPasswordMatch = selectedUser.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, selectedUser);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
