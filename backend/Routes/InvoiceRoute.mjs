import JwtCookieAuthentication from "../Middlewares/JwtCookieAuthentication.mjs";
import e from "express";
import passport from "../Passport/passport-config.mjs";
import CustomError from "../Utils/CustomError.mjs";
import InvoiceController from "../Controllers/InvoiceController.mjs";
import { InvoicesInputValidationMiddleware } from "../Middlewares/invoicesInputValidationMiddleware.mjs";
import "dotenv/config";
const InvoiceRoute = e.Router();
InvoiceRoute.post(
  "/generate-new-invoice",
  JwtCookieAuthentication,
  InvoicesInputValidationMiddleware,
  InvoiceController.generateNewInvoice
);
InvoiceRoute.delete(
  "/delete-invoice",
  JwtCookieAuthentication,
  InvoicesInputValidationMiddleware,
  InvoiceController.deleteInvoice
);

export default InvoiceRoute;
