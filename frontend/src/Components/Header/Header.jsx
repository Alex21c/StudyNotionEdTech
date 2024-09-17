import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { getProjectName } from "../../utils.mjs";
import apiUrls from "../../apiUrls.mjs";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";

export default function Header() {
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
    <div className="text-stone-100">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <button onClick={handleLogout} className="underline text-blue-300 ">
        Logout
      </button>
    </div>
  );
}
