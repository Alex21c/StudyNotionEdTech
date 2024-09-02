import { Link } from "react-router-dom";
export default function Homepage() {
  return (
    <div className="text-stone-100">
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
