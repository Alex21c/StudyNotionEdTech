import UserModel from "../Models/User.mjs";
import CustomError from "../Utils/CustomError.mjs";
import validator from "validator";
import Utils from "../Utils/Utils.mjs";
import "dotenv/config";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { cookiesOptions } from "../Utils/Misc.mjs";
const registerNewUser = async (req, res, next) => {
  try {
    // Encrypt the password
    if (!req?.body?.itIsGoogleAuth) {
      req.body.password = await Utils.generatePasswordHash(req.body.password);
    }

    // Creating new user
    const userDoc = new UserModel(req.body);

    // // Save the doc
    await userDoc.save();

    // Generate JWT Token
    const Authorization = Utils.generateJwtToken(userDoc);

    // Instruct the client to set the JWT token inside cookie
    res.cookie("jwt", Authorization, cookiesOptions);

    // Return success message with JWT Token
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    // Check for validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error: " + error.message,
      });
    }
    return next(new CustomError(500, error.message));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { usernameOrEmailOrMobile, password } = req.body;
    if (!usernameOrEmailOrMobile || !password) {
      return next(new CustomError(400, "Credentials missing !"));
    }

    // first detect type of id
    let typeOfID = "username";
    if (validator.isEmail(usernameOrEmailOrMobile)) {
      typeOfID = "email";
    } else if (validator.isMobilePhone(usernameOrEmailOrMobile)) {
      typeOfID = "mobile";
    }

    // find the document
    const userDoc = await UserModel.findOne({
      [typeOfID]: usernameOrEmailOrMobile,
    });
    if (!userDoc) {
      return next(new CustomError(400, "No such User exist !"));
    }

    // verify the password
    if (!(await Utils.isPasswordValid(password, userDoc.password))) {
      return next(new CustomError(400, "Invalid Credentials !"));
    }
    // generate JWT
    const Authorization = Utils.generateJwtToken(userDoc);

    // response
    res.json({ success: true, Authorization });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
const forgetPassword = async (req, res, next) => {
  try {
    // generate a random token
    const passwordResetToken = nanoid();
    // save that token into db
    req.user.passwordResetToken = passwordResetToken;
    await req.user.save();

    // embeded this token into jwt
    const jwtToken = await Utils.generateJwtTokenPasswordReset(req.user);
    // const baseUrl = `${req.protocol}://${req.get("host")}`;

    const resetLink =
      process.env.BASE_URL_FRONT_END + `/user/reset-password?token=${jwtToken}`;

    // send user the email for password reset link
    try {
      const mailData = {
        email: req.user.email,
        firstName: req.user.firstName,
        passwordResetLink: resetLink,
      };
      await sendEmail(mailData);
    } catch (error) {
      return next(
        new CustomError(400, "failed to send email, " + error.message)
      );
    }

    // response back
    res.json({
      success: true,
      resetLink,
    });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
const resetPassword = async (req, res, next) => {
  try {
    console.log();
    req.user2.password = await Utils.generatePasswordHash(req.body.newPassword);
    await req.user2.save();
    res.json({
      success: true,
      message: "password updated !",
    });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

const modifyRole = async (req, res, next) => {
  try {
    console.log("hi there its modifyRule fxn");
    req.user.role = req.body.role;
    req.user.isRoleModifictionPending = false;

    await req.user.save();
    res.json({
      success: true,
      message: "Role updated Successfully !",
    });
  } catch (error) {
    console.log(error.message);
    return next(new CustomError(500, error.message));
  }
};

const handshakeHello = async (req, res) => {
  res.json({
    success: true,
    message: "hi there!",
  });
};
const logout = async (req, res) => {
  res.clearCookie("jwt", cookiesOptions);
  res.json({
    success: true,
    message: "Successfully logged out !",
  });
};

const sendEmail = async (mailData) => {
  try {
    if (!mailData) {
      throw new Error("invalid mail data !");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    async function main(mailData) {
      try {
        if (!mailData?.email) {
          throw new Error("invalid email !");
        }
        // throw new Error('testing is the thing')
        const info = await transporter.sendMail({
          from: `${process.env.GMAIL_USERNAME} <${process.env.GMAIL_EMAIL_ID}>`,
          to: mailData?.email,
          subject: `${mailData?.firstName}, StudyNotion Password Reset Link`,
          html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 5px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      a.btn {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
      }
      a.btn:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>
        We received a request to reset your password. Click the button below to
        reset your password:
      </p>
      <p>
        <a class="btn" href="${mailData?.passwordResetLink}" target="_blank">Reset Password</a>
      </p>
      <p>
        If you did not request a password reset, please ignore this email or
        contact support if you have any questions.
      </p>
      <p>With best Regards,<br /><a href="${process.env.BASE_URL_FRONT_END}">StudyNotion</a></p>
      <div class="footer">
        <p>&copy; 2024 <a href="${process.env.BASE_URL_FRONT_END}">StudyNotion</a>. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

      


            `,
        });
        return info.messageId;
      } catch (error) {
        throw error;
      }
    }

    const messageID = await main(mailData);
    return messageID;
  } catch (error) {
    throw error;
  }
};

const UserController = {
  registerNewUser,
  loginUser,
  handshakeHello,
  forgetPassword,
  resetPassword,
  modifyRole,
  logout,
};
export default UserController;
