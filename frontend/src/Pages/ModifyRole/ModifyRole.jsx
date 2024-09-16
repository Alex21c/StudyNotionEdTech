import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import apiUrls from "../../apiUrls.mjs";
import validator from "validator";
import { getProjectName } from "../../utils.mjs";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";

export default function ModifyRole() {
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  // update local storage with the authToken
  localStorage.setItem("Authorization", `Bearer ${token}`);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const apiUrl = apiUrls?.user?.modifyRole;
    if (!apiUrl) {
      console.log("failed to make api call, Missing apiUrls?.user?.modifyRole");
      showErrorMsg(
        "Failed to Modify Role, kindly try again later",
        setSnackbarState,
        setOpen
      );
      return;
    }

    //make an api call to the backend
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
    console.log(prjName);
    // try {
    //   const headers = {
    //     "Content-Type": "application/json",
    //   };
    //   if (
    //     refUsernameOrEmailOrMobile.current.value === "" ||
    //     refPassword.current.value === ""
    //   ) {
    //     showErrorMsg(
    //       "All form fileds are required, Kindly make sure form is filled properly",
    //       setSnackbarState,
    //       setOpen
    //     );
    //     return;
    //   }

    //   const data = {
    //     usernameOrEmailOrMobile: refUsernameOrEmailOrMobile.current.value,
    //     password: refPassword.current.value,
    //   };

    //   let response = await fetch(reqUrl, {
    //     method: "POST",
    //     headers,
    //     body: JSON.stringify(data),
    //   });
    //   if (!response) {
    //     throw new Error(
    //       "Failed to Make Req. with Server! please try again later..."
    //     );
    //   }
    //   response = await response.json();
    //   if (!response.success) {
    //     throw new Error(response.message);
    //   }
    //   localStorage.setItem(prjName + "-Authorization", response?.Authorization);
    //   // redirect user to homepage
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // } catch (error) {
    //   showErrorMsg(error.message, setSnackbarState, setOpen);
    // }

    // if success, save the auth token to local storage and then return user to the homepage
    // otherwise show failure message
  }

  let [stateRole, setStateRole] = useState("student");

  // show radio dialog and submit button
  return (
    <div className="text-stone-100">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Select a role for yours profile</legend>
          <div>
            <input
              type="radio"
              id="student"
              name="role"
              defaultValue="Student"
              onChange={() => setStateRole("student")}
              defaultChecked
            />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input
              type="radio"
              id="educator"
              name="role"
              defaultValue="Educator"
              onChange={() => setStateRole("educator")}
            />
            <label htmlFor="educator">Educator</label>
          </div>
        </fieldset>
        <button>Submit</button>
      </form>
    </div>
  );
}
