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
} from "../../Components/MUI/Snackbar/MuiSnackbar";
const styles = {
  highlightLink:
    "border-b-[.2rem] text-yellow-300 border-yellow-300 rounded-sm",
};

export default function Header() {
  let { stateWhoIsCurrentPage } = useContext(ContextStudyNotionWebApp);
  const navigate = useNavigate();
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  async function handleLogout(event) {
    try {
      const apiUrl = apiUrls?.user?.logout;
      if (!apiUrl) {
        console.log("failed to make api call, Missing apiUrls?.user?.logout");
        showErrorMsg(
          "Failed to Modify Role, kindly try again later",
          setSnackbarState,
          setOpen
        );
        return;
      }

      if (
        !validator.isURL(process.env.REACT_APP_SERVER_ROOT_URL, {
          require_tld: false,
        })
      ) {
        console.log(
          `failed to make api call, kindly make sure .env contains valid url, process.env.REACT_APP_SERVER_ROOT_URL, ${process.env.REACT_APP_SERVER_ROOT_URL}`
        );
        showErrorMsg(
          "Failed to SignUp, kindly try again later",
          setSnackbarState,
          setOpen
        );
        return;
      }
      const reqUrl = process.env.REACT_APP_SERVER_ROOT_URL + apiUrl;

      const prjName = getProjectName();

      const headers = {
        "Content-Type": "application/json",

        // Authorization: localStorage.getItem(
        //   getProjectName() + "-Authorization"
        // ),
      };

      let response = await fetch(reqUrl, {
        method: "POST",
        headers,
        credentials: "include",
      });
      if (!response) {
        throw new Error(
          "Failed to Make Req. with Server! please try again later..."
        );
      }
      response = await response.json();
      if (!response?.success) {
        throw new Error("Failed to logout ! please try again later...");
      }

      showSuccessMsg(response.message, setSnackbarState, setOpen);

      // redirect user to dashboard
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      showErrorMsg(error.message, setSnackbarState, setOpen);
    }
  }

  return (
    <header className="text-stone-100  w-[100%] bg-[#222831a1] justify-center  ">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <nav className="flex justify-between max-w-[100rem]  m-auto p-[1rem] items-center  ">
        <h2 className="displayNone">Header Primary Navigation</h2>
        <Link to="/">
          <img src={logo} className="w-[10rem]" />
        </Link>

        <ul className="flex  gap-[2rem] ">
          <li>
            <Link
              to="/"
              className={
                stateWhoIsCurrentPage === "Homepage" ? styles.highlightLink : ""
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/">
              Catalog <i className="fa-regular fa-chevron-down"></i>
            </Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </ul>

        <ul className="flex gap-[1rem]">
          <li>
            <Link to="/login" className="underline text-blue-300 ">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register-new-user" className="underline text-blue-300 ">
              Register
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="underline text-blue-300 ">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
