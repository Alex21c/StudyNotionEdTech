import { Strategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";
import UsersModel from "../Models/User.mjs";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import JwtCookieComboStrategy from "passport-jwt-cookiecombo";

passport.use(
  new JwtCookieComboStrategy(
    {
      secretOrPublicKey: process.env.JWT_PRIVATE_KEY,
      jwtVerifyOptions: {
        audience: "http://localhost:3000",
        expiresIn: "1d",
        issuer: "example.io",
      },
      passReqToCallback: false,
    },
    (payload, done) => {
      return done(null, payload.user, {});
    }
  )
);

// const opts = {
//   jwtFromRequest: ExtractJwt.fromExtractors([
//     //ExtractJwt.fromAuthHeaderAsBearerToken(), // for any possible Authorization headers
//     ExtractJwt.fromExtractors([
//       (req) => {
//         console.log(req.cookies);
//         return req?.cookies?.Authorization;
//       },
//     ]), // for `httpOnly` cookies
//   ]),
//   secretOrKey: process.env.JWT_PRIVATE_KEY,
// };

// const JwtStrategy = new Strategy(opts, async function (jwt_payload, done) {
//   // console.log(jwt_payload)
//   try {
//     const user = await UsersModel.findById(jwt_payload._id);
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (err) {
//     console.log(err.message);
//     return done(err, false);
//   }
// });

// passport.use(JwtStrategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile);
        const profileJsonData = profile?._json;
        let user = await UsersModel.findOne({ email: profileJsonData?.email });
        if (!user) {
          user = await UsersModel.create({
            firstName: profileJsonData?.name,
            email: profileJsonData?.email,
            googleProfileImage: profileJsonData?.picture,
            itIsGoogleAuth: true,
          });
          user.isRoleModifictionPending = true;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsersModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
