import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import UsersModel from "../Models/User.mjs";
import passport from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_PRIVATE_KEY,
};

const JwtStrategy = new Strategy(opts, async function (jwt_payload, done) {
  // console.log(jwt_payload)
  try {
    const user = await UsersModel.findById(jwt_payload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.log(err.message);
    return done(err, false);
  }
});

passport.use(JwtStrategy);
export default passport;
