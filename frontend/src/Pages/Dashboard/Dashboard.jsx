import Header from "../../Components/Header/Header";
import { ContextStudyNotionWebApp } from "../../Context";
import { useContext } from "react";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const navigate = useNavigate();
  let { setStateWhoIsCurrentPage, stateIsUserLoggedIn } = useContext(
    ContextStudyNotionWebApp
  );

  useEffect(() => {
    setStateWhoIsCurrentPage("Dashboard");
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    // is user logged in?
    if (!stateIsUserLoggedIn) {
      navigate("/login");
    }
  }, [stateIsUserLoggedIn]);

  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  return (
    <div className="text-stone-100">
      <Header />
      <div>this is the dashbaord</div>
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
    </div>
  );
}
