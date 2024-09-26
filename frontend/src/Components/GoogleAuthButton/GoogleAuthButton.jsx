import googleIcon from "../../Assests/Images/Common/googleIcon.svg";
export default function GoogleAuthButton({
  labelRegisterOrSignIn = "Register",
}) {
  function handleRegisterWithGoogle() {
    window.location.href = `${process.env.REACT_APP_SERVER_ROOT_URL}/auth/google`;
  }

  return (
    <button
      onClick={handleRegisterWithGoogle}
      className="px-[1rem] py-[.5rem] bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md hover:scale-[.95]  text-slate-900 font-medium hover:from-yellow-500 hover:to-yellow-300 flex items-center gap-[.5rem] w-[100%] justify-center"
    >
      <img src={googleIcon} className="w-[3rem]" />
      <span>{labelRegisterOrSignIn} With Google</span>
    </button>
  );
}
