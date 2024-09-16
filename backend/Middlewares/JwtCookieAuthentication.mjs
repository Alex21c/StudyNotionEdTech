import CustomError from "../Utils/CustomError.mjs";
export default function JwtCookieAuthentication(req, res, next) {
  try {
    const { jwt } = req.cookies;

    if (!jwt) {
      return next(new CustomError(401, "Unauthorized"));
    }
  } catch (error) {
    return next(new CustomError(400, error.message));
  }

  next();
}
