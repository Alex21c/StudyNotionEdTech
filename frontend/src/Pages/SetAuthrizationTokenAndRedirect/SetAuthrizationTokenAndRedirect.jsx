import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProjectName } from "../../utils.mjs";
import Cookies from "js-cookie";
export default function SetAuthrizationTokenAndRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get("redirect");
  const token = Cookies.get("token");

  useEffect(() => {
    console.log(token);
    console.log(Cookies.get());
    // localStorage.setItem(
    //   getProjectName() + "-Authorization",
    //   `Bearer ${token}`
    // );

    // redirect user to dashboard
    setTimeout(() => {
      // navigate("/dashboard");
    }, 1000);
  }, []);

  return <div className="text-stone-100">wait, logging you in...</div>;
}
