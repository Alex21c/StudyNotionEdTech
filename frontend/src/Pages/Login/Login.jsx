import { useNavigate } from "react-router-dom";
import LoginImage from "../../Assests/Images/Login/login.png";
import apiUrls from "../../apiUrls.mjs";
import { ContextStudyNotionWebApp } from "../../Context";
import { useContext } from "react";
import validator from "validator";
import { getProjectName } from "../../utils.mjs";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import GoogleAuthButton from "../../Components/GoogleAuthButton/GoogleAuthButton";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { useRef } from "react";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";

export default function Login() {
  const button = {
    normal:
      "rounded-md px-[1rem] py-[.5rem] bg-gradient-to-br from-yellow-300 to-yellow-500  hover:scale-[.99]  text-slate-900 font-medium hover:from-yellow-500 hover:to-yellow-300",
    disabled:
      "px-[1rem] py-[.5rem] bg-gradient-to-br from-gray-300 to-gray-500 rounded-md   text-slate-900 font-medium hover:from-gray-500 hover:to-gray-300",
  };
  const buttonTitle = {
    normal: "Login",
    disabled: "Wait Logging You in...",
  };
  let [stateMakingApiCall, setStateMakingApiCall] = useState(false);
  let { setStateWhoIsCurrentPage, setStateIsUserLoggedIn } = useContext(
    ContextStudyNotionWebApp
  );
  const navigate = useNavigate();
  const refUsernameOrEmailOrMobile = useRef(null);
  const refPassword = useRef(null);
  useEffect(() => {
    document.title = "Login";
    setStateWhoIsCurrentPage("Login");
  }, []);
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });
  async function handleReqLogin(event) {
    event.preventDefault();
    if (stateMakingApiCall) {
      return;
    }
    // making sure both username or password is typed
    if (
      refUsernameOrEmailOrMobile.current.value === "" ||
      refPassword.current.value === ""
    ) {
      return;
    }

    try {
      setStateMakingApiCall(true);
      event.preventDefault();

      const apiUrl = apiUrls?.user?.login;
      if (!apiUrl) {
        console.log("failed to make api call, Missing apiUrls login");
        showErrorMsg(
          "Failed to Login, kindly try again later.",
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
          "Failed to Login, kindly try again later.",
          setSnackbarState,
          setOpen
        );
        return;
      }
      const reqUrl = process.env.REACT_APP_SERVER_ROOT_URL + apiUrl;

      const prjName = getProjectName();

      const headers = {
        "Content-Type": "application/json",
      };

      const data = {
        usernameOrEmailOrMobile: refUsernameOrEmailOrMobile.current.value,
        password: refPassword.current.value,
      };

      let response = await fetch(reqUrl, {
        method: "POST",
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
        throw new Error(
          response.message || "Failed to Login please try again later..."
        );
      }
      setStateIsUserLoggedIn(true);
      // redirect user to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      showErrorMsg(error.message, setSnackbarState, setOpen);
    } finally {
      setStateMakingApiCall(false);
    }
  }
  return (
    <div className="text-stone-100 ">
      <Header />
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <div className="flex justify-center gap-[2rem]">
        <div className="text-stone-100 flex flex-col gap-[2rem] p-[1rem] h-[100%] items-center justify-center max-w-[30rem]">
          <div>
            <h2 className="text-[2rem] font-semibold">Welcome Back</h2>
            <p className="text-[1.2rem] text-stone-200">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="bg-gradient-to-r  from-sky-400 to-sky-300 text-transparent bg-clip-text">
                Education to future-proof your career.
              </span>
            </p>
          </div>
          <div className="w-[100%]">
            <GoogleAuthButton labelRegisterOrSignIn="Login" />
          </div>
          <div className="w-[100%] relative  text-center ">
            <span className="text-semibold bg-[#3c4648] border-white border-[.1rem] p-[1rem] rounded-full z-[100] border-dashed">
              OR
            </span>
            <hr className="absolute top-[.7rem] w-[100%] border-white z-[-1] border-dashed" />
          </div>
          <div className="flex flex-col gap-[1rem] w-[100%]">
            <div className="bg-slate-700 py-[1.5rem] px-[1rem] flex flex-col gap-[1rem] rounded-xl shadow-slate-300 shadow-sm w-[100%]">
              <form
                className="flex flex-col gap-[.7rem] w-[100%]"
                onSubmit={handleReqLogin}
              >
                <label className="flex flex-col gap-[.3rem] w-[100%]">
                  <span>Username | Email | MobileNo</span>
                  <input
                    type="text"
                    ref={refUsernameOrEmailOrMobile}
                    placeholder="Username | Email | MobileNo"
                    required
                    className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                  />
                </label>
                <div className="flex gap-[0rem] flex-col ">
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>Password</span>
                    <input
                      ref={refPassword}
                      type="password"
                      placeholder="password"
                      required
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    />
                  </label>
                  <Link
                    to="/forget-password"
                    className="hover:underline text-blue-300"
                  >
                    Forget Password ?
                  </Link>
                </div>

                <button
                  className={`${
                    stateMakingApiCall ? button.disabled : button.normal
                  }`}
                >
                  {stateMakingApiCall
                    ? buttonTitle.disabled
                    : buttonTitle.normal}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img src={LoginImage} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
