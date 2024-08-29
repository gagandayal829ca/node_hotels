const mongoose = require("mongoose");
const brcrypt = require("bcrypt");

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Chef", "Lead", "Manager"],
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  try {
    const person = this;

    if (!person.isModified("password")) return next();
    const salt = await brcrypt.genSalt(10);

    const hashedPassword = await brcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
