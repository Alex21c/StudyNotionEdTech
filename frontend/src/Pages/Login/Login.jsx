import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import GoogleAuthButton from "../../Components/GoogleAuthButton/GoogleAuthButton";
export default function Login() {
  return (
    <div className="text-stone-100">
      <Header />
      <GoogleAuthButton labelRegisterOrSignIn="Login" />
    </div>
  );
}
