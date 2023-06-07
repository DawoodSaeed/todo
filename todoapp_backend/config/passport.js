require("dotenv").config();
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const SECRET_KEY = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload._id })
    .then((user) => {
      if (user) return done(null, user);
      else return done(null, false);
    })
    .catch((ex) => done(ex, null));
});

module.exports = (passport) => {
  passport.use(strategy);
};
