import CustomError from "../Utils/CustomError.mjs";
import Utils from "../Utils/Utils.mjs";
import UsersModel from "../Models/User.mjs";
export default async function JwtCookieAuthentication(req, res, next) {
  try {
    const { jwt } = req?.signedCookies;

    if (!jwt) {
      return next(new CustomError(401, "Unauthorized"));
    }
    // verify jwt
    const decodedToken = Utils.verifyJwtToken(jwt);
    if (!decodedToken) {
      return next(new CustomError(401, "Unauthorized"));
    }
    // find the user based on the id provided

    const user = await UsersModel.findById(decodedToken?._id);
    // if no user then
    if (!user) {
      return next(new CustomError(401, "Unauthorized"));
    }

    // append user to the req
    req.user = user;
    next();
  } catch (error) {
    return next(new CustomError(400, error.message));
  }
}
