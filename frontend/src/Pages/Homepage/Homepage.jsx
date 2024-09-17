import { Link } from "react-router-dom";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { getProjectName } from "../../utils.mjs";
import { useState } from "react";
import Header from "../../Components/Header/Header";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";

export default function Homepage() {
  const navigate = useNavigate();
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });

  return (
    <div className="text-stone-100">
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <Header />
      <div className="flex flex-col">
        <div>Home</div>
        <Link to="/login" className="underline text-blue-300 ">
          Login
        </Link>
        <Link to="/register-new-user" className="underline text-blue-300 ">
          Register
        </Link>
      </div>
    </div>
  );
}
