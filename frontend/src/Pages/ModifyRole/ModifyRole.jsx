import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiUrls from "../../apiUrls.mjs";
import validator from "validator";
import { getProjectName } from "../../utils.mjs";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";

export default function ModifyRole() {
  const navigate = useNavigate();
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  // useEffect(() => {
  //   // update local storage with the authToken
  //   localStorage.setItem(
  //     getProjectName() + "-Authorization",
  //     `Bearer ${token}`
  //   );
  // }, []);

  async function handleFormSubmit(event) {
    try {
      event.preventDefault();
      const apiUrl = apiUrls?.user?.modifyRole;
      if (!apiUrl) {
        console.log(
          "failed to make api call, Missing apiUrls?.user?.modifyRole"
        );
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

      const headers = {
        "Content-Type": "application/json",

        // Authorization: localStorage.getItem(
        //   getProjectName() + "-Authorization"
        // ),
      };

      const data = {
        role: stateRole,
      };

      let response = await fetch(reqUrl, {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new Error(
          "Failed to Make Req. with Server! please try again later..."
        );
      }
      response = await response.json();
      if (!response?.success) {
        throw new Error("Failed to updated role! please try again later...");
      }

      showSuccessMsg(response.message, setSnackbarState, setOpen);

      // redirect user to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      showErrorMsg(error.message, setSnackbarState, setOpen);
    }
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
