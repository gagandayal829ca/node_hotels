const express = require("express");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
const db = require("./db");

// Routes
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the hotel");
});

app.use("/person", personRoutes);
app.use("/menuitem", menuRoutes);

app.listen(PORT, () => {
  console.log(`Listening to PORT:${PORT}`);
});
