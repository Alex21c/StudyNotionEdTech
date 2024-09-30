import { ContextStudyNotionWebApp } from "../../Context";
import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import logo from "../../Assests/Images/Header/logo.png";
import { useNavigate } from "react-router-dom";
import { getProjectName } from "../../utils.mjs";
import { useContext } from "react";
import apiUrls from "../../apiUrls.mjs";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../MUI/Snackbar/MuiSnackbar";
const styles = {
  highlightLink:
    "border-b-[.2rem] text-yellow-300 border-yellow-300 rounded-sm",
};

export default function Footer() {
  return (
    <footer className="text-stone-100  w-[100%] bg-[#222831a1] items-center p-[1rem] flex flex-col gap-[1rem] pb-[4rem]">
      <nav className="flex justify-between max-w-[100rem]  m-auto  items-center  ">
        <h2 className="displayNone">Footer Navigation</h2>
        <ul className="flex  gap-[2rem] ">
          <li>
            <Link to="/" className="hover:underline text-blue-300">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/register-new-user"
              className="hover:underline text-blue-300"
            >
              Become an Instructor
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline text-blue-300">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline text-blue-300">
              Privacy & Terms
            </Link>
          </li>
        </ul>
      </nav>
      <p>&copy; 2024 Study Notion Pvt. Ltd.</p>
      <p>
        Developed by{" "}
        <a
          className="hover:underline text-blue-300"
          href="https://www.linkedin.com/in/alex21c/"
        >
          Abhishek kumar
        </a>
      </p>
    </footer>
  );
}
