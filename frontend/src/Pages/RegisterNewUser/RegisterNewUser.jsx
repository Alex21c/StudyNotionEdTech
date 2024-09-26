import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import RegisterNewUserImage from "../../Assests/Images/Register-New-User/register-new-user.png";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import GoogleAuthButton from "../../Components/GoogleAuthButton/GoogleAuthButton";
import validator from "validator";
import { getProjectName } from "../../utils.mjs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import MuiSnackbar, {
  useSetInitialStateSnackbar,
  openTheSnackBar,
  showSuccessMsg,
  showErrorMsg,
} from "../../Components/MUI/Snackbar/MuiSnackbar";
import { useState } from "react";
import apiUrls from "../../apiUrls.mjs";
export default function RegisterNewUser() {
  const navigate = useNavigate();
  const [open, setOpen] = useSetInitialStateSnackbar();
  const [snackbarState, setSnackbarState] = useState({
    msg: "",
    successOrError: "error",
  });

  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refConfirmedPassword = useRef(null);
  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  const refGender = useRef(null);
  const refDateOfBirth = useRef(null);
  const refEmail = useRef(null);
  const refMobile = useRef(null);
  const refAbout = useRef(null);

  const [stateAccountType, setStateAccountType] = React.useState("student");
  const handleChange = (event, newAccountType) => {
    setStateAccountType(newAccountType);
  };
  async function handleCreateNewAccountReq(event) {
    event.preventDefault();
    // just check is password same
    if (refPassword.current.value !== refConfirmedPassword.current.value) {
      showErrorMsg(
        "Password doesn't match, kindly make sure the password you types matches with yours confirmed password !",
        setSnackbarState,
        setOpen
      );
      return;
    }

    try {
      event.preventDefault();
      const apiUrl = apiUrls?.user?.registerNewUser;
      if (!apiUrl) {
        console.log("failed to make api call, Missing apiUrls registerNewUser");
        showErrorMsg(
          "Failed to Register new user, kindly try again later",
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
      };

      const data = {
        role: stateAccountType,
        username: refUsername.current.value,
        firstName: refFirstName.current.value,
        lastName: refLastName.current.value,
        email: refEmail.current.value,
        mobile: refMobile.current.value,
        password: refPassword.current.value,
        gender: refGender.current.value,
        dateOfBirth: refDateOfBirth.current.value,
        about: refAbout.current.value,
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
          response.message ||
            "Failed to Create new account. please try again later..."
        );
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

  return (
    <div className="text-stone-100 ">
      <Header />
      <MuiSnackbar
        open={open}
        setOpen={setOpen}
        snackbarState={snackbarState}
      />
      <div className="flex justify-center ">
        <div className="text-stone-100 flex flex-col gap-[2rem] p-[1rem] h-[100%] items-center justify-center max-w-[30rem]">
          <div>
            <h2 className="text-[2rem] font-semibold">
              Join the millions learning to code with StudyNotion for free
            </h2>
            <p className="text-[1.2rem] text-stone-200">
              Build skills for today, tomorrow, and beyond.{" "}
              <span className="bg-gradient-to-r  from-sky-400 to-sky-300 text-transparent bg-clip-text">
                Education to future-proof your career.
              </span>
            </p>
          </div>
          <div className="w-[100%]">
            <GoogleAuthButton labelRegisterOrSignIn="Register" />
          </div>
          <div className="w-[100%] relative  text-center ">
            <span className="text-semibold bg-[#3c4648] border-white border-[.1rem] p-[1rem] rounded-full z-[100] border-dashed">
              OR
            </span>
            <hr className="absolute top-[.7rem] w-[100%] border-white z-[-1] border-dashed" />
          </div>
          <div className="flex flex-col gap-[1rem]">
            <div className="bg-slate-700 py-[1.5rem] px-[1rem] flex flex-col gap-[1rem] rounded-xl shadow-slate-300 shadow-sm">
              <ToggleButtonGroup
                value={stateAccountType}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  width: "100%",
                  height: "3rem",
                  backgroundColor: "#64748b", // Modify background color

                  padding: ".3rem",
                  "& .MuiToggleButton-root": {
                    padding: "0.5rem 1rem", // py-[.5rem] and px-[1rem]
                    width: "100%",
                    color: "lightgray",
                    background: "gray",
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(to bottom right, #fcd34d, #f59e0b)", // bg-gradient-to-br from-yellow-300 to-yellow-500
                      color: "#0f172a", // text-slate-900
                    },
                    borderRadius: "0.375rem", // rounded-md
                    fontWeight: 500, // font-medium
                    transition: "transform 0.2s ease, background 0.2s ease", // transition effect
                    "&:hover": {
                      transform: "scale(0.95)", // hover:scale-[.95]
                      color: "#0f172a", // text-slate-900
                      background:
                        "linear-gradient(to bottom right, #f59e0b, #fcd34d)", // hover:from-yellow-500 hover:to-yellow-300
                    },
                  },
                }}
              >
                <ToggleButton value="student">Student</ToggleButton>
                <ToggleButton value="educator">Educator</ToggleButton>
              </ToggleButtonGroup>
              <form
                className="flex flex-col gap-[.7rem]"
                onSubmit={handleCreateNewAccountReq}
              >
                <label className="flex flex-col gap-[.3rem] w-[100%]">
                  <span>Username</span>
                  <input
                    type="text"
                    ref={refUsername}
                    placeholder="username"
                    required
                    className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                  />
                </label>
                <div className="flex gap-[1rem] ">
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
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>Confirm Password</span>
                    <input
                      type="text"
                      ref={refConfirmedPassword}
                      placeholder="confirm password"
                      required
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    />
                  </label>
                </div>
                <div className="flex gap-[1rem] ">
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>First Name</span>
                    <input
                      type="text"
                      ref={refFirstName}
                      placeholder="first name"
                      required
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    />
                  </label>
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>Last Name</span>
                    <input
                      type="text"
                      ref={refLastName}
                      placeholder="last name"
                      required
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    />
                  </label>
                </div>
                <div className="flex gap-[1rem] ">
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>Gender</span>
                    <select
                      required
                      ref={refGender}
                      defaultValue=""
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    >
                      <option value="">yours gender?</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="other">other</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-[.3rem] w-[100%]">
                    <span>Date Of Birth</span>

                    <input
                      type="date"
                      ref={refDateOfBirth}
                      placeholder="Date Of Birth"
                      required
                      className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-[.3rem]">
                  <span>Email</span>
                  <input
                    type="email"
                    ref={refEmail}
                    placeholder="E-Mail"
                    required
                    className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                  />
                </label>
                <label className="flex flex-col gap-[.3rem]">
                  <span>Mobile No.</span>
                  <input
                    type="number"
                    ref={refMobile}
                    placeholder="mobile no."
                    required
                    className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                  />
                </label>

                <label className="flex flex-col gap-[.3rem] w-[100%]">
                  <span>About Yourself</span>
                  <textarea
                    ref={refAbout}
                    placeholder="About yourself"
                    rows={5}
                    required
                    className="bg-slate-500 p-[.5rem] rounded-md outline-none  border-[.11rem] border-transparent focus:border-stone-300"
                  />
                </label>
                <button className="px-[1rem] py-[.5rem] bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md hover:scale-[.95]  text-slate-900 font-medium hover:from-yellow-500 hover:to-yellow-300">
                  Create New Account
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img src={RegisterNewUserImage} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
