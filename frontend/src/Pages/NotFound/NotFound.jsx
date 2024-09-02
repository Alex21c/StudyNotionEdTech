import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  return (
    <p className="text-stone-100 m-[auto] p-[1rem] text-[1.2rem]">
      <span className="text-red-300">
        Error: {error.status}, {error.statusText} !
      </span>{" "}
      <span>
        <Link to="/" className="underline text-blue-300 ">
          Click Here
        </Link>{" "}
        to go back to Homepage !
      </span>
    </p>
  );
}
