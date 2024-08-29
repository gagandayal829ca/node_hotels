const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new localStrategy(async (username, password, done) => {
    // console.log("received credentials:", username, password);
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

module.exports = passport;
