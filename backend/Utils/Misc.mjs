export const cookiesOptions = {
  httpOnly: true,
  signed: true,
  sameSite: process.env.BASE_URL_FRONT_END.includes("localhost")
    ? true
    : "None",
  secure: process.env.BASE_URL_FRONT_END.includes("localhost") ? false : true,
  path: "/",
};
