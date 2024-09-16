export const cookiesOptions = {
  httpOnly: true,
  sameSite: true,
  signed: false,
  secure: process.env.BASE_URL_FRONT_END.includes("localhost") ? false : true,
};
